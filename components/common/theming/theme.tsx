import {adaptV4Theme, createTheme, responsiveFontSizes, Theme, ThemeOptions} from "@mui/material/styles";
import {StyleRules} from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import {cloneDeep, merge} from "lodash-es";
import {grey} from "@mui/material/colors";
import {FC} from "react";

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
export const generateTheme = (config: Partial<ThemeOptions>): Theme => {
  config = cloneDeep(config);
  const mode = config?.palette?.mode || 'light';
  const primary = config?.palette?.primary || undefined;
  const secondary = config?.palette?.secondary || undefined;
  const background = mode === "dark" ? grey["A400"] : grey["100"];

  const theme = {
    palette: {
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
  const resultingTheme = merge(config, theme);
  return responsiveFontSizes(createTheme(adaptV4Theme(resultingTheme)));
};
export const ThemeGlobals: FC = () => {
  if (typeof window !== "undefined") {
    fadeThemeChange();
  }
  return null
}