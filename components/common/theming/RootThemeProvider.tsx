import React, {FunctionComponent} from "react";
import {
    createTheme,
    makeStyles,
    responsiveFontSizes,
    StyleRules,
    ThemeOptions,
    ThemeProvider,
    useMediaQuery
} from "@material-ui/core";
import {cloneDeep, merge} from "lodash";
import {grey} from "@material-ui/core/colors";
import useCookie from "react-use-cookie"
import {connect} from "react-redux";
import {AppState} from "../../../store";
import {ThemeTypeContext} from "./ThemeContext";


const fadeTime = "0.6s";
const fadeTimingFunction = "ease";


const fadeThemeChange = makeStyles((): StyleRules => ({
    "@global": {
        "body": {
            transitionProperty: "background",
            transitionDuration: fadeTime,
            transitionTimingFunction: fadeTimingFunction
        },
        "*": {
            transitionProperty: "color, background",
            transitionDuration: fadeTime,
            transitionTimingFunction: fadeTimingFunction
        },
        "svg *": {
            transitionProperty: "fill",
            transitionDuration: fadeTime,
            transitionTimingFunction: fadeTimingFunction
        },
    }
}));

const generateTheme = (config: ThemeOptions): ThemeOptions => {
    config = cloneDeep(config);
    const type = config?.palette?.type || 'light';
    const primary = config?.palette?.primary || undefined;
    const secondary = config?.palette?.secondary || undefined;
    const background = type === "dark" ? grey["A400"] : grey["100"];

    const theme = {
        palette: {
            ...config.palette,
            wavePoints: [0, 47, 93],
            waveAngle: "45",
            type,
            primary,
            secondary,
            // Used to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
            background: {
                default: background,
            },
        },
        overrides: {
            MuiPaper: {
                root: {
                    transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color ${fadeTime} ${fadeTimingFunction}, background ${fadeTime} ${fadeTimingFunction} !important`
                }
            },
            MuiContainer: {
                root: {}
            }
        }
    };
    const resultingTheme = merge(config, theme);
    return responsiveFontSizes(createTheme(resultingTheme));
};

const mapStateToProps = (state: AppState) => {
    return {themes: state.themes || {}}
}


interface IRootThemeProviderProps {
    themes: ThemeOptions
}

const ThemeGlobals: FunctionComponent = ({children}) => {
    if (typeof window !== "undefined") {
        fadeThemeChange();
    }
    return <>{children}</>
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
    themeOverride.palette.type = isDarkMode ? "dark" : "light";
    const theme = generateTheme(themeOverride);
    return <ThemeTypeContext.Provider
        value={{
            value: isDarkMode ? "dark" : "light",
            onToggle: () => {
                updateIsDarkMode(!isDarkMode ? '1' : '');
            }
        }}
    >
        <ThemeProvider theme={theme}>
            <ThemeGlobals>{children}</ThemeGlobals>
        </ThemeProvider>
    </ThemeTypeContext.Provider>;
};

export default connect(mapStateToProps)(RootThemeProvider)