import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import React, {FunctionComponent} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Avatar, createStyles, WithStyles} from "@material-ui/core";
import {StyleRules} from "@material-ui/styles";
import smoothScrollTop from "../../../utilities/smoothScrollTop";

const styles = (): StyleRules => createStyles({
    avatar: {
        backgroundColor: "transparent"
    }
});

interface IMonogramProps extends WithStyles<typeof styles> {
    logo?: string,
}

const Monogram: FunctionComponent<IMonogramProps> = ({classes, logo}) => {

    return <Box height={1}>
        {logo &&
        <Button color="default" onClick={smoothScrollTop}>
            <Avatar variant={"square"} className={classes.avatar}>
                <img src={logo} alt={"icon"}/>
            </Avatar>
        </Button>}
    </Box>;
};

export default withStyles(styles)(Monogram);
