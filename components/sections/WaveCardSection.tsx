import type {FC} from "react";
import dynamic from "next/dynamic";
import {PropsFor} from "@mui/system";

const WaveCardList = dynamic(() => import("../common/containers/WaveCardList"))

const WaveCardSection: FC<PropsFor<typeof WaveCardList>> = (props) => {
  if (props.disabled) {
    return null;
  }

  return <WaveCardList {...props}/>
}

export default WaveCardSection;