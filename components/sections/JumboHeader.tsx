import type {JumboHeaderSection as JumboHeaderSectionType} from "../../store/types/home";

import React, {Fragment, FunctionComponent} from "react";
import dynamic from "next/dynamic";

const WaveJumbotron = dynamic(() => import("../common/WaveJumbotronHeader"));
const SectionContentMarkdown = dynamic(() => import("../common/elements/SectionContentMarkdown"));


const JumboHeader: FunctionComponent<JumboHeaderSectionType> = (props) => {
  const {disabled, content} = props;

  const jumboProps = {
    ...props,
  };

  if (disabled) {
    return <Fragment/>;
  }

  return <WaveJumbotron {...jumboProps}>
    <SectionContentMarkdown className={'header'} content={content}/>
  </WaveJumbotron>;
};


export default JumboHeader;
