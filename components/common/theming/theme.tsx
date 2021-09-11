import React, {FunctionComponent} from "react";
import {createTheme, makeStyles, responsiveFontSizes, StyleRules, Theme, ThemeOptions} from "@material-ui/core/styles";
import {cloneDeep, merge} from "lodash";
import {grey} from "@material-ui/core/colors";
import userTheme from '../../../content/theme/theme.json'

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
    overrides: {
      MuiPaper: {
        root: {
          transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color ${fadeTime} ${fadeTimingFunction}, background ${fadeTime} ${fadeTimingFunction} !important`
        }
      },
      MuiContainer: {
        root: {}
      }
    }
  };
  const resultingTheme = merge(config, theme);
  return responsiveFontSizes(createTheme(resultingTheme));
};
export const ThemeGlobals: FunctionComponent = ({children}) => {
  if (typeof window !== "undefined") {
    fadeThemeChange();
  }
  return <>{children}</>
}

// @ts-ignore
const theme = generateTheme(userTheme);
export default theme