import type {AppState} from "../../../store";
import React, {useCallback, useEffect} from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import {connect, ConnectedProps} from "react-redux";
import {generateTheme, ThemeGlobals} from "./theme";
import {NoSsr, PaletteType, useMediaQuery} from "@material-ui/core";


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
    palette.type = userSavedMode as PaletteType
  } else if (browserPrefersDarkMode) {
    palette.type = "dark"
  }

  config.palette = palette;
  useEffect(() => config?.palette?.type && updateIsDarkMode(config.palette.type), [config?.palette?.type, updateIsDarkMode])
  const theme = generateTheme(config);
  return <ThemeProvider theme={theme}>
    <NoSsr>
      <ThemeGlobals/>
    </NoSsr>
    {children}
  </ThemeProvider>
};

export default mapStateToProps(RootThemeProvider)