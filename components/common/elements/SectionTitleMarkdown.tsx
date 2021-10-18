import React, {FC} from 'react';
import clsx from "clsx";
import SectionContentMarkdown from "./SectionContentMarkdown";
import {styled} from "@mui/material/styles";
import {css} from "@emotion/react";

interface SectionContentMarkdownProps {
  content: string,
  className?: string,
}

const SectionTitleMarkdown: React.FC<SectionContentMarkdownProps> = styled(SectionContentMarkdown)(({theme}) => css`
  padding-top: ${theme.spacing(10)};

  h1 h2 h3 h4 h5 h6 {
    color: ${theme.palette.text.primary}
  }`
)

const Component: FC<SectionContentMarkdownProps> = (props) =>
  <SectionTitleMarkdown {...props} className={clsx(props.className, "title")}/>

export default Component