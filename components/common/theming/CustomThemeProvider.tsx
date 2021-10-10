import React, {FC} from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  Theme,
  DeprecatedThemeOptions,
  useTheme,
  adaptV4Theme,
} from "@mui/material/styles";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../store";

const mapStateToProps = connect((state: AppState) => {
  return {currentPaletteType: state.themes?.palette?.mode || "light"}
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
  const paletteType: 'dark' | 'light' = isDarkMode ? "dark" : isLightMode ? "light" : currentPaletteType
  const configOverride: DeprecatedThemeOptions = {
    ...theme,
    palette: {
      mode: paletteType
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(adaptV4Theme(configOverride))}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}

export default mapStateToProps(CustomThemeProvider) as FC<IThemeProviderProps>