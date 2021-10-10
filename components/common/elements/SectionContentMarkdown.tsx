import React, {FunctionComponent, useRef} from 'react';
import clsx from "clsx";
import {useTheme} from "@mui/material/styles";

interface SectionContentMarkdownProps {
  content: string,
  className?: string,
}

const SectionContentMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({content, className}) => {
  const markdownRef = useRef(null);
  const theme = useTheme();
  return <div ref={markdownRef} style={{
    color: theme.palette.text.primary
  }} className={clsx("markdown", className)} dangerouslySetInnerHTML={{__html: content}}/>;
}

export default SectionContentMarkdown;