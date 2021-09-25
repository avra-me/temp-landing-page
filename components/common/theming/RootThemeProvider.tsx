import React, {useEffect} from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import useCookie from "react-use-cookie"
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../store";
import {generateTheme, ThemeGlobals} from "./theme";
import {NoSsr, PaletteType, useMediaQuery} from "@material-ui/core";


const mapStateToProps = connect((state: AppState) => {
  return {themes: state.themes || {}}
})


interface IRootThemeProviderProps extends ConnectedProps<typeof mapStateToProps> {
}

const RootThemeProvider: React.FunctionComponent<IRootThemeProviderProps> = ({themes: config, children}) => {
  // Cookie > System Theme > Site Theme
  const palette = config?.palette || {};

  const [userSavedMode, updateIsDarkMode] = useCookie("isDarkMode");
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