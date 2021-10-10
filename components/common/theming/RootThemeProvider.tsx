import type {AppState} from "../../../store";
import React, {useCallback, useEffect} from "react";
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import {connect, ConnectedProps} from "react-redux";
import {generateTheme, ThemeGlobals} from "./theme";
import {NoSsr, useMediaQuery} from "@mui/material";


const mapStateToProps = connect((state: AppState) => {
  return {themes: state.themes || {}}
})


interface IRootThemeProviderProps extends ConnectedProps<typeof mapStateToProps> {
}

const DARKMODE_COOKIE_KEY = 'app-user-dark-mode-pref'

const RootThemeProvider: React.FunctionComponent<IRootThemeProviderProps> = ({themes: config, children}) => {
  // Cookie > System Theme > Site Theme
  const palette = config?.palette || {};

  const updateIsDarkMode = useCallback((v: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DARKMODE_COOKIE_KEY, v);
    }
  }, [])

  let userSavedMode = undefined;
  if (typeof window !== "undefined") {
    userSavedMode = window.localStorage.getItem(DARKMODE_COOKIE_KEY)
  }

  const browserPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  if (userSavedMode) {
    palette.mode = userSavedMode as 'dark' | 'light'
  } else if (browserPrefersDarkMode) {
    palette.mode = "dark"
  }

  config.palette = palette;
  useEffect(() => config?.palette?.mode && updateIsDarkMode(config.palette.mode), [config?.palette?.mode, updateIsDarkMode])
  const theme = generateTheme(config);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NoSsr>
          <ThemeGlobals/>
        </NoSsr>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default mapStateToProps(RootThemeProvider)