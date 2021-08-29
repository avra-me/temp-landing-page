import React from "react";
import {ThemeOptions, ThemeProvider, useMediaQuery} from "@material-ui/core";
import useCookie from "react-use-cookie"
import {connect} from "react-redux";
import {AppState} from "../../../store";
import {ThemeTypeContext} from "./ThemeContext";
import {generateTheme, ThemeGlobals} from "./theme";


const mapStateToProps = (state: AppState) => {
    return {themes: state.themes || {}}
}


interface IRootThemeProviderProps {
    themes: ThemeOptions
}

const RootThemeProvider: React.FunctionComponent<IRootThemeProviderProps> = ({themes: themeOverride, children}) => {
    if (!themeOverride.palette) {
        themeOverride.palette = {};
    }
    let initialDarkModeState = useMediaQuery("(prefers-color-scheme: dark)");
    if (themeOverride.palette.type && !initialDarkModeState) {
        initialDarkModeState = themeOverride.palette.type === "dark";
    }
    const [isDarkMode, updateIsDarkMode] = useCookie("isDarkMode", initialDarkModeState ? '1' : '');
    themeOverride.palette.type = isDarkMode ? "light" : "light";
    const theme = generateTheme(themeOverride);
    return <ThemeTypeContext.Provider
        value={{
            value: isDarkMode ? "light" : "light",
            onToggle: () => {
                // @ts-ignore
                updateIsDarkMode(!isDarkMode ? '1' : '', {SameSite: 'Secure'});
            }
        }}
    >
        <ThemeProvider theme={theme}>
            <ThemeGlobals>{children}</ThemeGlobals>
        </ThemeProvider>
    </ThemeTypeContext.Provider>;
};

export default connect(mapStateToProps)(RootThemeProvider)