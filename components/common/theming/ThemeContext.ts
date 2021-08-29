import {PaletteType, useMediaQuery} from "@material-ui/core";
import React from "react";

interface IThemeContext {
    value: PaletteType,
    onToggle: () => void
}

// @ts-ignore
export const ThemeTypeContext: React.Context<IThemeContext> = React.createContext(() => ({
    value: useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light",
    onToggle: () => {
    }
}));