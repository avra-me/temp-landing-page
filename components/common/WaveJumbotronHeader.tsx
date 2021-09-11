import React, {FunctionComponent} from "react";
import {Grid, StyleRules, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import WaveJumbotron, {getWaveAreaClass} from "./WaveJumbotron";

const styles = (theme: Theme): StyleRules => ({
    brand: {
        height: "auto",
        width: "75px",
        overflow: "inherit",
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    ...getWaveAreaClass(theme),
});

interface IWaveJumbotronHeaderProps {
    classes: Record<string, string>,
    theme?: Theme,
    monogram?: string,
}

const WaveJumbotronHeader: FunctionComponent<IWaveJumbotronHeaderProps> = (props) => {
    const {classes, children} = props;

    return <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
     <WaveJumbotron>
        <Grid
            item
            xs={12}
            container
            alignItems={"center"}
            justifyContent={"center"}
            classes={{root: "lg-p-top"}}
        >
            {children}
        </Grid>
       </WaveJumbotron>
    </span>;
}

export default withStyles(styles, {withTheme: true})(WaveJumbotronHeader);
