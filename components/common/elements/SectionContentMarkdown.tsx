import React, {FunctionComponent} from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
interface SectionContentMarkdownProps {
    children: string
}

const SectionContentMarkdown: FunctionComponent<SectionContentMarkdownProps> = ({children}) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{}}>
            {children}
        </ReactMarkdown>
    );
}

export default SectionContentMarkdown;