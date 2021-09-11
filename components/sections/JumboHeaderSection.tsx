import React, {Fragment, FunctionComponent} from "react";
import WaveJumbotron from "../common/WaveJumbotronHeader";
import {JumboHeaderSection as JumboHeaderSectionType} from "../../store/types/home";
import {Theme} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";

const styles = (theme: Theme) => createStyles({
  brand: {
    height: "auto",
    width: "75px",
    overflow: "inherit",
  },
  title: {
    marginBottom: theme.spacing(4)
  }
});

const JumboHeaderSection: FunctionComponent<JumboHeaderSectionType & WithStyles<typeof styles>> = (props) => {
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


export default withStyles(styles)(JumboHeaderSection);
