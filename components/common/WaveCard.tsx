import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "./elements/WaveBorder";
import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {ThemeProvider} from "./theming/ThemeProvider";

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
        background: theme.palette.background.paper,
    },
    waveSvg: {
        "& *": {
            fill: theme.palette.secondary.dark
        }
    }
});

interface IWaveCardProps extends WithStyles<typeof styles> {
    className?: string,
    inverse?: boolean,
    before?: ReactNode
}

const WaveCard: FunctionComponent<IWaveCardProps> = ({classes, inverse, className, children, before, ...props}) => {
    return <ThemeProvider isDarkMode={inverse}>
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
                <WaveBorder flip={!inverse} className={classes.waveSvg}/>
            </CardMedia>
            {children}
        </Card>
    </ThemeProvider>;
};


export default withStyles(styles)(WaveCard);
