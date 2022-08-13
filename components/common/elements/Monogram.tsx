import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {FunctionComponent} from "react";
import smoothScrollTop from "../../../utilities/smoothScrollTop";
import AssetSVG from "./AssetSVG";


interface IMonogramProps {
  logo?: string,
}

const Monogram: FunctionComponent<IMonogramProps> = ({logo}) => {
  return (
    <Box height={1}>
      {
        logo &&
        <Button onClick={smoothScrollTop} color={"inherit"}>
            <AssetSVG path={logo} width={48} height={48}/>
        </Button>
      }
    </Box>
  );
};

export default Monogram;
