import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import React, {FunctionComponent, ReactNode} from "react";
import {Grid, Theme} from "@material-ui/core";
import {useTheme, createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {ThemeProvider} from "./theming/ThemeProvider";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
    zIndex: -99
  },
  dark: {
    background: theme.palette.secondary.dark
  },
  fixScrollBug: {
    position: "absolute",
    bottom: -theme.spacing(1),
    height: theme.spacing(2),
    left: 0,
    width: "100%",
    zIndex: 10
  },
  before: {
    position: "relative"
  },
  wrapBeforeContent: {
    zIndex: 20,
    position: "inherit"
  },
  waveSection: {
    height: theme.spacing(10),
    marginBottom: -theme.spacing(3),
    background: theme.palette.background.paper,
  },
});

interface IWaveCardProps extends WithStyles<typeof styles> {
  className?: string,
  inverse?: boolean,
  before?: ReactNode
}

const WaveCard: FunctionComponent<IWaveCardProps> = ({classes, inverse, className, children, before, ...props}) => {
  const theme = useTheme();
  return <Grid item xs={12} sm={6}>
    <ThemeProvider isDarkMode={inverse}>
      <Card {...props} className={clsx(className, "MuiPaper-root", inverse ? classes.dark : "")}>
        {before && <ThemeProvider isDarkMode={!inverse}>
            <Paper elevation={0} square className={clsx(className, classes.before, inverse ? "" : classes.dark)}>
          <span className={classes.wrapBeforeContent}>
            {before}
          </span>
                <span className={clsx(classes.fixScrollBug, inverse ? "" : classes.dark)}/>
            </Paper>
        </ThemeProvider>}
        <CardMedia className={classes.waveSection}>
          <WaveBorderCanvas flip={inverse} reverse background={theme.palette.secondary.dark}/>
        </CardMedia>
        {children}
      </Card>
    </ThemeProvider>
  </Grid>;
};


export default withStyles(styles)(WaveCard);
