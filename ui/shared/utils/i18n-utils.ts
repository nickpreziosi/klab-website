/**
 * Utility functions for internationalization
 */

/**
 * Flattens a nested translation object into a flat key-value structure
 * Example: { common: { hello: "Hello" } } -> { "common.hello": "Hello" }
 */
export function flattenTranslations(obj: any, prefix = ""): Record<string, string> {
  const flattened: Record<string, string> = {}

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      flattened[prefix + key] = obj[key]
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flattenTranslations(obj[key], prefix + key + "."))
    }
  }

  return flattened
}

/**
 * Interpolates parameters in a translation string
 * Example: "Hello {{name}}" with { name: "John" } -> "Hello John"
 */
export function interpolateParams(text: string, params?: Record<string, any>): string {
  if (!params) return text

  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match
  })
}

/**
 * Gets a nested value from an object using dot notation
 * Example: getNestedValue({ common: { hello: "Hello" } }, "common.hello") -> "Hello"
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}
