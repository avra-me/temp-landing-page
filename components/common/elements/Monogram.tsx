import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {FunctionComponent} from "react";
import { StyleRules, WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
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
  return (
    <Box height={1}>
      {logo &&
      <Button onClick={smoothScrollTop}>
          <AssetSVG path={logo} width={48} height={25}/>
      </Button>}
    </Box>
  );
};

export default withStyles(styles)(Monogram);
