import React, {FunctionComponent} from "react";
import {GlobalStyles, NoSsr} from "@mui/material";
import {css} from "@emotion/react";
import {Theme} from "@mui/system";

const fadeTime = "0.6s";
const fadeTimingFunction = "ease";

const StaticNonServerStyling = css`
  body {
    transition-property: background;
    transition-duration: ${fadeTime};
    transition-timing-function: ${fadeTimingFunction};
  }

  * {
    transition-property: color, background;
    transition-duration: ${fadeTime};
    transition-timing-function: ${fadeTimingFunction};
  }

  svg * {
    transition-property: fill;
    transition-duration: ${fadeTime};
    transition-timing-function: ${fadeTimingFunction};
  }
`

const StaticGlobalStyling = css`
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;

    &:focus {
      outline: 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-white {
    color: white;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }
`;

const CustomStyles: FunctionComponent = () => {
  return <>
    <GlobalStyles styles={StaticGlobalStyling}/>
    <NoSsr>
      <GlobalStyles styles={StaticNonServerStyling}/>
    </NoSsr>
    {// @ts-ignore
      <GlobalStyles styles={(theme: Theme) => ({
        "body": {
          background: theme.palette.background.default,
        },
        ".MuiContainer-root": {
          marginBottom: theme.spacing(6),
          paddingRight: theme.spacing(4),
          paddingLeft: theme.spacing(4),
          [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(8),
          },
          [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(10),
          },
          [theme.breakpoints.up('lg')]: {
            marginBottom: theme.spacing(12),
            paddingRight: theme.spacing(8),
            paddingLeft: theme.spacing(8),
          }
        },
      })}/>
    }
  </>;
}

export default CustomStyles;
