import React, {FunctionComponent, useEffect, useRef} from 'react';
import clsx from "clsx";

interface SectionContentMarkdownProps {
  content: string,
  className?: string,
}

const SectionContentMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({content, className}) => {
  const markdownRef = useRef(null);
  useEffect(() => {

  }, [content])
  return <div ref={markdownRef} className={clsx("markdown", className)} dangerouslySetInnerHTML={{__html: content}}/>;
}

export default SectionContentMarkdown;