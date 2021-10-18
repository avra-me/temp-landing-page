import {createTheme, responsiveFontSizes, SimplePaletteColorOptions, Theme, ThemeOptions} from "@mui/material/styles";
import {cloneDeep, merge} from "lodash-es";
import {grey} from "@mui/material/colors";
import {darken} from "@mui/system";


export const generateTheme = (config: Partial<ThemeOptions>): Theme => {
  config = cloneDeep(config);
  const mode = config?.palette?.mode || 'light';
  const baseTheme = createTheme({
    palette: {
      mode
    }
  })
  const primary = config?.palette?.primary as SimplePaletteColorOptions || undefined;
  const secondary = config?.palette?.secondary as SimplePaletteColorOptions || undefined;

  const bgSourceColour = primary?.main ? primary?.main : grey["100"]
  const background = mode === "dark" ? darken(bgSourceColour, .85) : grey["100"];

  const theme = {
    palette: {
      ...baseTheme.palette,
      ...config.palette,
      wavePoints: [0, 47, 93],
      waveAngle: "45",
      mode,
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
  };
  const resultingTheme = merge(baseTheme, config, theme);
  return responsiveFontSizes(createTheme(baseTheme, resultingTheme));
};