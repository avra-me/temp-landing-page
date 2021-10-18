export const CHANGE_THEME_MODE = "setTheme" as const
export const TOGGLE_THEME_MODE = "toggleTheme" as const

export type PaletteMode = 'light' | 'dark'

export const initialThemeState = {
  palette: {
    mode: "light" as PaletteMode
  }
}