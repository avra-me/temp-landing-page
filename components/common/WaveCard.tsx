import Card from "@mui/material/Card";
import clsx from "clsx";
import CardMedia from "@mui/material/CardMedia";
import React, {FunctionComponent, ReactNode} from "react";
import {Grid, Theme} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Paper from "@mui/material/Paper";
import CustomThemeProvider from "./theming/CustomThemeProvider";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";
import AppearOnScroll from "./elements/AppearOnScroll";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
    zIndex: -99
  },
  dark: {
    background: theme.palette.primary.main
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
    <AppearOnScroll style={{height: "100%"}}>
      <CustomThemeProvider isDarkMode={inverse}>
        <Card {...props} className={clsx(className, "MuiPaper-root", inverse ? classes.dark : "")}>
          {before && <CustomThemeProvider isDarkMode={!inverse}>
              <Paper elevation={0} square className={clsx(className, classes.before, inverse ? "" : classes.dark)}>
                  <span className={classes.wrapBeforeContent}>
                    {before}
                  </span>
                  <span className={clsx(classes.fixScrollBug, inverse ? "" : classes.dark)}/>
              </Paper>
          </CustomThemeProvider>}
          <CardMedia className={classes.waveSection}>
            <WaveBorderCanvas flip={inverse} reverse background={theme.palette.primary.main}/>
          </CardMedia>
          {children}
        </Card>
      </CustomThemeProvider>
    </AppearOnScroll>
  </Grid>;
};


export default withStyles(styles)(WaveCard);
