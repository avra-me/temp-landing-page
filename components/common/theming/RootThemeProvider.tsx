import type {AppState} from "../../../store";
import React, {FC, PropsWithChildren, useMemo} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {connect, ConnectedProps} from "react-redux";
import {generateTheme} from "./theme";
import {cloneDeep} from "lodash-es";


const mapStateToProps = connect((state: AppState) => {
  return {
    themes: state.themes || {},
    currentMode: state.themes.palette?.mode,
  }
})


interface IRootThemeProviderProps extends PropsWithChildren<{}>, ConnectedProps<typeof mapStateToProps> {
  forceDarkMode?: boolean
  forceLightMode?: boolean
}


const RootThemeProvider: FC<IRootThemeProviderProps> = (
  {
    forceDarkMode,
    forceLightMode,
    themes: config,
    currentMode,
    children
  }) => {


  const theme = useMemo(() => {
    const configCopy = cloneDeep(config)
    const palette = configCopy?.palette || {mode: currentMode};

    if (forceDarkMode) {
      palette.mode = "dark"
    } else if (forceLightMode) {
      palette.mode = "light"
    }

    configCopy.palette = palette;
    return generateTheme(configCopy)
  }, [config, currentMode, forceDarkMode, forceLightMode])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default mapStateToProps(RootThemeProvider)