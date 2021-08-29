import React, {FunctionComponent} from "react";
import {createTheme, MuiThemeProvider, PaletteType, Theme, ThemeOptions, useTheme} from "@material-ui/core";
import {ThemeTypeContext} from "./ThemeContext";


interface IThemeProviderProps {
    isDarkMode?: boolean,
    isLightMode?: boolean,
    theme?: Partial<Theme>
    children: React.ReactElement,
}

export const ThemeProvider: FunctionComponent<IThemeProviderProps> = ({isDarkMode, isLightMode, children, theme}) => {
    const currentTheme = useTheme();
    return <ThemeTypeContext.Consumer>
        {(context) => {
            const paletteType: PaletteType = isDarkMode ? "dark" : isLightMode ? "light" : context.value
            const configOverride: ThemeOptions = {
                ...theme,
                palette: {
                    ...currentTheme.palette,
                    ...theme?.palette || {},
                    type: paletteType
                }
            };
            return <MuiThemeProvider theme={createTheme(configOverride)}>{children}</MuiThemeProvider>;
        }}
    </ThemeTypeContext.Consumer>
}