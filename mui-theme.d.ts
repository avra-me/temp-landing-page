import '@mui/system/createTheme'
import {TypographyVariants} from "@mui/material";

declare module '@mui/system/createTheme' {
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    typography: TypographyVariants
  }
  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions {
    typography: TypographyVariants
  }
}