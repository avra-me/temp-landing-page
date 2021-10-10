import type {FC} from "react";
import dynamic from "next/dynamic";
import {PropsFor} from "@mui/system";

const IconCardList = dynamic(() => import("../common/containers/IconCardList"))

const IconCardSection: FC<PropsFor<typeof IconCardList>> = (props) => {
  if (props.disabled) {
    return null;
  }

  return <IconCardList {...props}/>
}

export default IconCardSection;