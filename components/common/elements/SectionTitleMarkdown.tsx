import React, {FunctionComponent} from 'react';
import clsx from "clsx";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import SectionContentMarkdown from "./SectionContentMarkdown";
import {Theme} from "@material-ui/core";

const titleStyle = (theme: Theme) => ({
  color: theme.palette.text.primary,
  ['& em']: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary
  },
})

const styles = (theme: Theme) => createStyles({

  titleMarkdown: {
    paddingTop: theme.spacing(10),
    ['& h1']: {...theme.typography.h1, ...titleStyle(theme)},
    ['& h2']: {...theme.typography.h2, ...titleStyle(theme)},
    ['& h3']: {...theme.typography.h3, ...titleStyle(theme)},
    ['& h4']: {...theme.typography.h4, ...titleStyle(theme)},
    ['& h5']: {...theme.typography.h5, ...titleStyle(theme)},
    ['& h6']: {...theme.typography.h6, ...titleStyle(theme)},
    ['& p']: {...theme.typography.body1},
  }
})

interface SectionContentMarkdownProps extends WithStyles<typeof styles> {
  content: string,
  className?: string,
}

const SectionTitleMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({classes, content, className}) => {
  return <SectionContentMarkdown className={clsx(classes.titleMarkdown, "title", className)} content={content}/>;
}

export default withStyles(styles)(SectionTitleMarkdown);