import React, {FC} from "react";
import {createTheme, MuiThemeProvider, Theme, ThemeOptions, useTheme} from "@material-ui/core/styles";
import {PaletteType} from "@material-ui/core";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../store";

const mapStateToProps = connect((state: AppState) => {
  return {currentPaletteType: state.themes?.palette?.type || "light"}
})

interface IThemeProviderProps {
  isDarkMode?: boolean,
  isLightMode?: boolean,
  theme?: Partial<Theme>
}

const CustomThemeProvider: FC<IThemeProviderProps & ConnectedProps<typeof mapStateToProps>> = ({
                                                                                           isDarkMode,
                                                                                           isLightMode,
                                                                                           currentPaletteType,
                                                                                           children
                                                                                         }) => {
  const theme = useTheme();
  const paletteType: PaletteType = isDarkMode ? "dark" : isLightMode ? "light" : currentPaletteType
  const configOverride: ThemeOptions = {
    ...theme,
    palette: {
      type: paletteType
    }
  };
  return <MuiThemeProvider theme={createTheme(configOverride)}>{children}</MuiThemeProvider>;
}

export default mapStateToProps(CustomThemeProvider) as FC<IThemeProviderProps>