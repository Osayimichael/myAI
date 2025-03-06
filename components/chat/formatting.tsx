import { DisplayMessage } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { preprocessLaTeX } from "@/utilities/formatting";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CitationCircle } from "./citation";
import { NormalComponents, SpecialComponents } from "react-markdown/lib/ast-to-react";

export function Formatting({ message }: { message: DisplayMessage }) {
  const processedContent = preprocessLaTeX(message.content);

  const components: Partial<NormalComponents & SpecialComponents> = {
    code: ({ children, className, node, ...rest }) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          className="rounded-xl"
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
        />
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
    p: ({ children }) => (
      <p className="mb-2">
        {children}
        {message.citations?.map((citation, index) => (
          <CitationCircle key={index} number={index + 1} citation={citation} />
        ))}
      </p>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    li: ({ children }) => (
      <li className="list-disc ml-5">
        {children}
        {message.citations?.map((citation, index) => (
          <CitationCircle key={index} number={index + 1} citation={citation} />
        ))}
      </li>
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={components}
      className="gap-3 flex flex-col"
    >
      {processedContent}
    </ReactMarkdown>
  );
}
