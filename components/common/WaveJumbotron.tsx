import React, {FunctionComponent} from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import clsx from "clsx";
import Container from "@mui/material/Container";
import CustomThemeProvider from "./theming/CustomThemeProvider";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";

export const getWaveAreaClass = (theme: any) => {
  return {
    "@keyframes animateGradient": {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
      "100%": {
        backgroundPosition: "0% 50%",
      }
    },
    waveArea: {
      backgroundSize: "400% 400%",
      background: `linear-gradient(${theme.palette.waveAngle}deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100% )`,
      animation: "$animateGradient 16s ease infinite"
    }
  }
};

const styles = (theme: Theme) => createStyles({
  wrapper: {
    color: theme.palette.common.white,
    position: "relative",
    background: "inherit",
    zIndex: 20,
  },
  container: {
    paddingTop: theme.spacing(6),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
    zIndex: 20,
    height: theme.spacing(20),
    minHeight: theme.spacing(20),
  },
  ...getWaveAreaClass(theme)
});

interface IWaveJumbotronProps extends WithStyles<typeof styles> {
  theme: Theme,
}

const WaveJumbotron: FunctionComponent<IWaveJumbotronProps> = (props) => {
  const {classes, children} = props;
  const theme = useTheme();
  return (
    <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
      <CustomThemeProvider isDarkMode>
          <div className={clsx(classes.wrapper)}>
          <Container className={classes.container}>
              <div className={clsx(classes.containerFix)}>
                {children}
              </div>
          </Container>
            <div id={"hide-navbar"}/>
              <div className={classes.waveBorder}>
                <WaveBorderCanvas background={theme.palette.background.default} flip/>
              </div>
        </div>
      </CustomThemeProvider>
      <div className={"lg-p-top"}/>
    </span>
  );
}

export default withStyles(styles, {withTheme: true})(WaveJumbotron);
