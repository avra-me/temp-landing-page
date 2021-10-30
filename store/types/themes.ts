export const CHANGE_THEME_MODE = "setTheme" as const
export const DARKMODE_COOKIE_KEY = 'app-user-dark-mode-pref'

export type PaletteMode = 'light' | 'dark'

export const initialThemeState = {
  palette: {
    mode: "light" as PaletteMode
  }
}