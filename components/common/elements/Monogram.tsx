import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import React, {FunctionComponent} from "react";
import {createStyles, StyleRules, WithStyles, withStyles} from '@material-ui/core/styles';
import smoothScrollTop from "../../../utilities/smoothScrollTop";
import AssetSVG from "./AssetSVG";

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
        <AssetSVG path={logo} width={48} height={25}/>
    </Button>}
  </Box>;
};

export default withStyles(styles)(Monogram);
