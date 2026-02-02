"use client"

import * as React from "react"
import { flattenTranslations, interpolateParams } from "../utils/i18n-utils"

// Types
export interface ILanguage {
  code: string
  name: string
  flag?: string
}

export interface ITranslationResult {
  value: string
  exists: boolean
  key: string
}

export interface ITranslationNamespace {
  [key: string]: string | ITranslationNamespace
}

export interface ITranslationFile {
  [namespace: string]: ITranslationNamespace
}

export interface IInternationalizationConfig {
  /** Default language code used when no saved preference exists */
  defaultLanguage: string
  /** Fallback language code when translation not found */
  fallbackLanguage: string
  /** List of supported languages */
  supportedLanguages: ILanguage[]
  /** Translation namespaces */
  namespaces?: string[]
  /** Path to translation JSON files */
  translationPath?: string
  /** Key used for localStorage persistence */
  storageKey?: string
  /** Custom repository implementation for external translation sources */
  repository?: IInternationalizationRepository
  /** Initial language from database/API (takes precedence over localStorage) */
  initialLanguage?: string
  /** Callback fired when language changes - use for database persistence */
  onLanguageChange?: (language: string) => Promise<void> | void
  /** Whether to persist to localStorage (default: true) */
  persistToStorage?: boolean
}

// Repository interface - export for custom implementations
export interface IInternationalizationRepository {
  getTranslation(
    key: string,
    namespace?: string,
    params?: Record<string, any>
  ): Promise<ITranslationResult>
  getTranslations(language: string, namespace?: string): Promise<ITranslationFile>
  getCurrentTranslations(namespace?: string): Promise<ITranslationFile>
  getSupportedLanguages(): Promise<ILanguage[]>
  getCurrentLanguage(): Promise<string>
  setCurrentLanguage(language: string): Promise<void>
  getConfig(): Promise<IInternationalizationConfig>
  hasTranslation(key: string, namespace?: string): Promise<boolean>
}

// Default repository implementation - loads from JSON files
export class JsonInternationalizationRepository implements IInternationalizationRepository {
  private currentLanguage: string
  private translations: Map<string, ITranslationFile> = new Map()
  private config: IInternationalizationConfig
  private readonly LANGUAGE_STORAGE_KEY: string
  private readonly persistToStorage: boolean
  private readonly onLanguageChange?: (language: string) => Promise<void> | void
  private hasLoadedFromStorage: boolean = false

  constructor(config?: Partial<IInternationalizationConfig>) {
    this.config = {
      defaultLanguage: config?.defaultLanguage || "en",
      fallbackLanguage: config?.fallbackLanguage || "en",
      supportedLanguages: config?.supportedLanguages || [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "es", name: "Español", flag: "🇪🇸" },
        { code: "pt", name: "Português", flag: "🇵🇹" },
      ],
      namespaces: config?.namespaces,
      translationPath: config?.translationPath || "/locales",
      storageKey: config?.storageKey || "k-lab-components-language",
      initialLanguage: config?.initialLanguage,
      onLanguageChange: config?.onLanguageChange,
      persistToStorage: config?.persistToStorage,
    }

    this.LANGUAGE_STORAGE_KEY = this.config.storageKey!
    this.persistToStorage = this.config.persistToStorage ?? true
    this.onLanguageChange = this.config.onLanguageChange

    // Use initialLanguage if provided (from database), otherwise use default
    // localStorage is loaded later via loadSavedLanguage() to avoid hydration mismatch
    this.currentLanguage = this.config.initialLanguage || this.config.defaultLanguage
  }

  /** Load saved language from localStorage (call after hydration) */
  loadSavedLanguage(): void {
    // If initialLanguage was provided (from database), skip localStorage
    if (this.config.initialLanguage) {
      this.hasLoadedFromStorage = true
      return
    }

    if (typeof window === "undefined" || !this.persistToStorage) {
      this.hasLoadedFromStorage = true
      return
    }

    try {
      const savedLanguage = localStorage.getItem(this.LANGUAGE_STORAGE_KEY)
      if (
        savedLanguage &&
        this.config.supportedLanguages.some((lang) => lang.code === savedLanguage)
      ) {
        this.currentLanguage = savedLanguage
      }
    } catch {
      // Ignore localStorage errors
    }
    this.hasLoadedFromStorage = true
  }

  private saveLanguage(language: string): void {
    if (typeof window === "undefined" || !this.persistToStorage) return

    try {
      localStorage.setItem(this.LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Ignore localStorage errors
    }
  }

  async getTranslation(
    key: string,
    namespace: string = "common",
    params?: Record<string, any>
  ): Promise<ITranslationResult> {
    try {
      const translations = await this.getTranslations(this.currentLanguage, namespace)
      const value = this.getNestedValue(translations, key)

      if (value && typeof value === "string") {
        const interpolatedValue = this.interpolateParams(value, params)
        return {
          value: interpolatedValue,
          exists: true,
          key,
        }
      }

      // Fallback to default language
      if (this.currentLanguage !== this.config.fallbackLanguage) {
        const fallbackTranslations = await this.getTranslations(
          this.config.fallbackLanguage,
          namespace
        )
        const fallbackValue = this.getNestedValue(fallbackTranslations, key)

        if (fallbackValue && typeof fallbackValue === "string") {
          const interpolatedValue = this.interpolateParams(fallbackValue, params)
          return {
            value: interpolatedValue,
            exists: true,
            key,
          }
        }
      }

      return {
        value: key,
        exists: false,
        key,
      }
    } catch (error) {
      return {
        value: key,
        exists: false,
        key,
      }
    }
  }

  async getTranslations(language: string, namespace?: string): Promise<ITranslationFile> {
    // Return cached translations if available
    if (this.translations.has(language)) {
      const translations = this.translations.get(language)!
      if (namespace) {
        return { [namespace]: translations[namespace] || {} }
      }
      return translations
    }

    // Load translations from JSON file
    try {
      const path = this.config.translationPath || "/locales"
      const response = await fetch(`${path}/${language}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`)
      }

      const translations = await response.json()
      this.translations.set(language, translations)

      if (namespace) {
        return { [namespace]: translations[namespace] || {} }
      }
      return translations
    } catch (error) {
      // Fallback to default language
      if (language !== this.config.fallbackLanguage) {
        return this.getTranslations(this.config.fallbackLanguage, namespace)
      }
      return {}
    }
  }

  async getCurrentTranslations(namespace?: string): Promise<ITranslationFile> {
    return this.getTranslations(this.currentLanguage, namespace)
  }

  async getSupportedLanguages(): Promise<ILanguage[]> {
    return this.config.supportedLanguages
  }

  async getCurrentLanguage(): Promise<string> {
    return this.currentLanguage
  }

  async setCurrentLanguage(language: string): Promise<void> {
    if (this.config.supportedLanguages.some((lang) => lang.code === language)) {
      this.currentLanguage = language
      this.saveLanguage(language)
      // Clear cache to force reload on next access
      this.translations.delete(language)

      // Call the database persistence callback if provided
      if (this.onLanguageChange) {
        try {
          await this.onLanguageChange(language)
        } catch (error) {
          console.error("Failed to persist language preference:", error)
        }
      }
    }
  }

  async getConfig(): Promise<IInternationalizationConfig> {
    return this.config
  }

  async hasTranslation(key: string, namespace?: string): Promise<boolean> {
    const result = await this.getTranslation(key, namespace)
    return result.exists
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }

  private interpolateParams(text: string, params?: Record<string, any>): string {
    if (!params) return text

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match
    })
  }
}

// Hook
export function useInternationalization(config?: Partial<IInternationalizationConfig>) {
  const [repository] = React.useState(() => {
    // Use custom repository if provided, otherwise use default JSON repository
    if (config?.repository) {
      return config.repository
    }
    return new JsonInternationalizationRepository(config)
  })

  const [currentLanguage, setCurrentLanguage] = React.useState<string>("en")
  const [supportedLanguages, setSupportedLanguages] = React.useState<ILanguage[]>([])
  const [configState, setConfigState] = React.useState<IInternationalizationConfig | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const initializeInternationalization = async () => {
      try {
        // Load saved language from localStorage after hydration (if applicable)
        if (repository instanceof JsonInternationalizationRepository) {
          repository.loadSavedLanguage()
        }

        const [lang, langs, cfg] = await Promise.all([
          repository.getCurrentLanguage(),
          repository.getSupportedLanguages(),
          repository.getConfig(),
        ])

        setCurrentLanguage(lang)
        setSupportedLanguages(langs)
        setConfigState(cfg)
        setError(null)
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to initialize internationalization")
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (mounted) {
      initializeInternationalization()
    }
  }, [repository, mounted])

  const [translations, setTranslations] = React.useState<Record<string, string>>({})
  const [translationsReady, setTranslationsReady] = React.useState(false)
  const hasLoadedTranslationsRef = React.useRef(false)

  // Load translations when language changes
  React.useEffect(() => {
    const loadTranslations = async () => {
      if (!mounted || isLoading) {
        // Only set to false on initial load, not during language changes
        if (!hasLoadedTranslationsRef.current) {
          setTranslationsReady(false)
        }
        return
      }

      try {
        // Only set to false on initial load - keep old translations visible during language changes
        if (!hasLoadedTranslationsRef.current) {
          setTranslationsReady(false)
        }
        
        const translationFile = await repository.getCurrentTranslations()

        // Flatten the nested translation object
        const flattened = flattenTranslations(translationFile)
        setTranslations(flattened)
        setTranslationsReady(Object.keys(flattened).length > 0)
        hasLoadedTranslationsRef.current = true
        setError(null)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to load translations")
        setError(error)
        // Only set to false if we have never loaded translations - keep old translations visible
        if (!hasLoadedTranslationsRef.current) {
          setTranslationsReady(false)
        }
      }
    }

    loadTranslations()
  }, [repository, currentLanguage, isLoading, mounted])

  const t = React.useCallback(
    (key: string, namespace?: string, params?: Record<string, any>): string => {
      const lookupKey = namespace ? `${namespace}.${key}` : key
      const translation = translations[lookupKey]

      if (!translation) return key

      // Parameter interpolation
      if (params) {
        return interpolateParams(translation, params)
      }

      return translation
    },
    [translations]
  )

  const translate = React.useCallback(
    async (key: string, namespace?: string, params?: Record<string, any>): Promise<string> => {
      const result = await repository.getTranslation(key, namespace, params)
      return result.value
    },
    [repository]
  )

  const translateWithFallback = React.useCallback(
    async (
      key: string,
      fallback: string,
      namespace?: string,
      params?: Record<string, any>
    ): Promise<string> => {
      const result = await repository.getTranslation(key, namespace, params)
      return result.exists ? result.value : fallback
    },
    [repository]
  )

  const changeLanguage = React.useCallback(
    async (language: string): Promise<void> => {
      try {
        // Don't set translationsReady to false during language change
        // Keep old translations visible until new ones load to prevent flashing
        await repository.setCurrentLanguage(language)
        setCurrentLanguage(language)

        // Reload translations
        const translationFile = await repository.getCurrentTranslations()
        const flattened = flattenTranslations(translationFile)
        setTranslations(flattened)
        setTranslationsReady(Object.keys(flattened).length > 0)
        hasLoadedTranslationsRef.current = true
        setError(null)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to change language")
        setError(error)
        // Only set to false on error if we have never loaded translations - keep old translations visible
        if (!hasLoadedTranslationsRef.current) {
          setTranslationsReady(false)
        }
      }
    },
    [repository]
  )

  const hasTranslation = React.useCallback(
    async (key: string, namespace?: string): Promise<boolean> => {
      return repository.hasTranslation(key, namespace)
    },
    [repository]
  )

  const getTranslationResult = React.useCallback(
    async (
      key: string,
      namespace?: string,
      params?: Record<string, any>
    ): Promise<ITranslationResult> => {
      return repository.getTranslation(key, namespace, params)
    },
    [repository]
  )

  const batchTranslate = React.useCallback(
    async (
      keys: string[],
      namespace?: string,
      params?: Record<string, any>
    ): Promise<Record<string, string>> => {
      const results: Record<string, string> = {}

      await Promise.all(
        keys.map(async (key) => {
          const result = await repository.getTranslation(key, namespace, params)
          results[key] = result.value
        })
      )

      return results
    },
    [repository]
  )

  // Computed: translations are ready when mounted, not loading, and translations object has keys
  const isTranslationsReady = React.useMemo(
    () => mounted && !isLoading && translationsReady && Object.keys(translations).length > 0,
    [mounted, isLoading, translationsReady, translations]
  )

  return {
    // State
    currentLanguage,
    supportedLanguages,
    config: configState,
    isLoading,
    error,
    mounted,
    translations,
    translationsReady: isTranslationsReady,

    // Methods
    t,
    translate,
    translateWithFallback,
    changeLanguage,
    hasTranslation,
    getTranslationResult,
    batchTranslate,

    // Service instance (for advanced usage)
    repository,
  }
}

// Context
interface InternationalizationContextType {
  currentLanguage: string
  supportedLanguages: ILanguage[]
  config: IInternationalizationConfig | null
  isLoading: boolean
  error: Error | null
  mounted: boolean
  translations: Record<string, string>
  translationsReady: boolean
  t: (key: string, namespace?: string, params?: Record<string, any>) => string
  translate: (key: string, namespace?: string, params?: Record<string, any>) => Promise<string>
  translateWithFallback: (
    key: string,
    fallback: string,
    namespace?: string,
    params?: Record<string, any>
  ) => Promise<string>
  changeLanguage: (language: string) => Promise<void>
  hasTranslation: (key: string, namespace?: string) => Promise<boolean>
  getTranslationResult: (
    key: string,
    namespace?: string,
    params?: Record<string, any>
  ) => Promise<ITranslationResult>
  batchTranslate: (
    keys: string[],
    namespace?: string,
    params?: Record<string, any>
  ) => Promise<Record<string, string>>
  repository: IInternationalizationRepository
}

const InternationalizationContext = React.createContext<
  InternationalizationContextType | undefined
>(undefined)

// Provider
export interface InternationalizationProviderProps {
  children: React.ReactNode
  config?: Partial<IInternationalizationConfig>
}

export function InternationalizationProvider({
  children,
  config,
}: InternationalizationProviderProps) {
  const value = useInternationalization(config)

  return (
    <InternationalizationContext.Provider value={value}>
      {children}
    </InternationalizationContext.Provider>
  )
}

// Context hook
export function useInternationalizationContext(): InternationalizationContextType {
  const context = React.useContext(InternationalizationContext)
  if (context === undefined) {
    throw new Error(
      "useInternationalizationContext must be used within an InternationalizationProvider"
    )
  }
  return context
}
