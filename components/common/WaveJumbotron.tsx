import React, {FunctionComponent} from "react";
import {Theme, useTheme, createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import clsx from "clsx";
import Container from "@material-ui/core/Container";
// import {NavigationAppearContext} from "./elements/NavigationAppearContext";
import ThemeProvider from "./theming/ThemeProvider";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";

export const getWaveAreaClass = (theme: any) => {
  const points = ["light", "main", "dark"].map(
    (name, i) =>
      `${theme.palette.secondary[name]} ${theme.palette.wavePoints[i]}%`
  );
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
      background: `linear-gradient(${theme.palette.waveAngle}deg, ${points.join(
        ", "
      )} )`,
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
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
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
      <ThemeProvider isDarkMode>
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
      </ThemeProvider>
      <div className={"lg-p-top"}/>
    </span>
  );
}

export default withStyles(styles, {withTheme: true})(WaveJumbotron);
