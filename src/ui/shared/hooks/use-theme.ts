/**
 * Re-exports from ThemeProvider for backwards compatibility.
 * All theme state is managed by ThemeProvider; use these hooks within ThemeProvider.
 */
export {
  useTheme,
  useEffectiveThemeSync,
  getEffectiveTheme,
  type Theme,
  type EffectiveTheme,
} from "@/ui/shared/providers/theme-provider";

export type ThemePreference = import("@/ui/shared/providers/theme-provider").Theme;
