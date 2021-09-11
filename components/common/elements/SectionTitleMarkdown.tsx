import React, {FunctionComponent} from 'react';
import clsx from "clsx";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import SectionContentMarkdown from "./SectionContentMarkdown";
import {Theme} from "@material-ui/core";

const styles = (theme: Theme) => {
  const subtitle = {
    ['& em']: {
      ...theme.typography.subtitle1,
      color: theme.palette.text.secondary
    },
  };
  const titleColor = {
    color: theme.palette.text.primary
  }
  return createStyles({

    titleMarkdown: {
      paddingTop: theme.spacing(10),
      ['& h1']: {...theme.typography.h1, ...subtitle, ...titleColor},
      ['& h2']: {...theme.typography.h2, ...subtitle, ...titleColor},
      ['& h3']: {...theme.typography.h3, ...subtitle, ...titleColor},
      ['& h4']: {...theme.typography.h4, ...subtitle, ...titleColor},
      ['& h5']: {...theme.typography.h5, ...subtitle, ...titleColor},
      ['& h6']: {...theme.typography.h6, ...subtitle, ...titleColor},
      ['& p']: {...theme.typography.body1},
    }
  })
}

interface SectionContentMarkdownProps extends WithStyles<typeof styles> {
  content: string,
  className?: string,
}

const SectionTitleMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({classes, content, className}) => {
  return <SectionContentMarkdown className={clsx(classes.titleMarkdown, "title", className)} content={content}/>;
}

export default withStyles(styles)(SectionTitleMarkdown);