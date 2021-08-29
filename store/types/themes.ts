import {PaletteType} from "@material-ui/core";

export const CHANGE_THEME_MODE = "setTheme" as const

export const initialThemeState = {
    palette: {
        type: "light" as PaletteType
    }
}