import React, {FunctionComponent} from "react";
import { Grid, Theme } from "@mui/material";
import { StyleRules } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
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
