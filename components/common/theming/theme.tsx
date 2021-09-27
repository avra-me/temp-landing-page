import {createTheme, makeStyles, responsiveFontSizes, StyleRules, Theme, ThemeOptions} from "@material-ui/core/styles";
import {cloneDeep, merge} from "lodash-es";
import {grey} from "@material-ui/core/colors";
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
  };
  const resultingTheme = merge(config, theme);
  return responsiveFontSizes(createTheme(resultingTheme));
};
export const ThemeGlobals: FC = () => {
  if (typeof window !== "undefined") {
    fadeThemeChange();
  }
  return null
}