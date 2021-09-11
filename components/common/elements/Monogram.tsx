import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import React, {FunctionComponent} from "react";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import {StyleRules} from "@material-ui/core/styles";
import smoothScrollTop from "../../../utilities/smoothScrollTop";

const styles = (): StyleRules => createStyles({
    avatar: {
        backgroundColor: "transparent"
    }
});

interface IMonogramProps extends WithStyles<typeof styles> {
    logo?: string,
}

const Monogram: FunctionComponent<IMonogramProps> = ({logo}) => {

    return <Box height={1}>
        {logo &&
        <Button color="default" onClick={smoothScrollTop}>
            <img src={logo} alt={"icon"}/>
        </Button>}
    </Box>;
};

export default withStyles(styles)(Monogram);
