import type {AppState} from "../../../store";
import React, {FC, PropsWithChildren, useMemo} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {connect, ConnectedProps} from "react-redux";
import {generateTheme} from "./theme";
import {useMediaQuery} from "@mui/material";


const mapStateToProps = connect((state: AppState) => {
  return {themes: state.themes || {}}
})


interface IRootThemeProviderProps extends PropsWithChildren<{}>, ConnectedProps<typeof mapStateToProps> {
  forceDarkMode?: boolean
}

const DARKMODE_COOKIE_KEY = 'app-user-dark-mode-pref'

const RootThemeProvider: FC<IRootThemeProviderProps> = ({
                                                          forceDarkMode,
                                                          themes: config,
                                                          children
                                                        }) => {
  const browserPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    const palette = config?.palette || {};

    let userSavedMode: string | null | undefined = undefined;
    if (typeof window !== "undefined") {
      userSavedMode = window.localStorage.getItem(DARKMODE_COOKIE_KEY)
    }


    if (forceDarkMode === true) {
      palette.mode = "dark"
    } else if (userSavedMode) {
      palette.mode = userSavedMode as 'dark' | 'light'
    } else if (browserPrefersDarkMode) {
      palette.mode = "dark"
    }

    config.palette = palette;
    return generateTheme(config)
  }, [browserPrefersDarkMode, config, forceDarkMode]);

  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default mapStateToProps(RootThemeProvider)