import type {FC} from "react";
import dynamic from "next/dynamic";
import {PropsFor} from "@mui/system";

const HorizontalCardList = dynamic(() => import("../common/containers/HorizontalCardList"))

const HorizontalCardSection: FC<PropsFor<typeof HorizontalCardList>> = (props) => {
  if (props.disabled) {
    return null;
  }

  return <HorizontalCardList {...props}/>
}

export default HorizontalCardSection;