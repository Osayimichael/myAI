import React from 'react';
import { DisplayMessage } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { preprocessLaTeX, renderCitations } from "@/utilities/formatting";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export function Formatting({ message }: { message: DisplayMessage }) {
  const processedContent = preprocessLaTeX(message.content);

  const components = {
    code: ({ children, className, node, ...rest }: any) => {
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
    p: ({ children }: { children: React.ReactNode }) => {
      // Process paragraph text to fix list headings with colons
      if (React.isValidElement(children)) {
        const content = children.props.children;
        if (typeof content === 'string' && content.includes('\n:')) {
          // Replace newline before colon with just the colon
          const fixedContent = content.replace(/\n\s*:/g, ':');
          return <p>{renderCitations(fixedContent, message.citations)}</p>;
        }
      }
      return <p>{renderCitations(children, message.citations)}</p>;
    },
    strong: ({ children }: { children: React.ReactNode }) => {
      return (
        <span className="font-bold inline">
          {renderCitations(children, message.citations)}
        </span>
      );
    },
    li: ({ children }: { children: React.ReactNode }) => {
      return <li>{renderCitations(children, message.citations)}</li>;
    },
    ol: ({ children }: { children: React.ReactNode }) => {
      return <ol>{renderCitations(children, message.citations)}</ol>;
    },
    ul: ({ children }: { children: React.ReactNode }) => {
      return <ul>{renderCitations(children, message.citations)}</ul>;
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={components as any}
      className="gap-3 flex flex-col"
    >
      {processedContent}
    </ReactMarkdown>
  );
}
