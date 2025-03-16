import { DisplayMessage } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { preprocessLaTeX, renderCitations } from "@/utilities/formatting";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Custom remark plugin to merge paragraphs that only contain a colon
function remarkMergeColon() {
  return (tree: any) => {
    const { children } = tree;
    // Iterate backwards over the paragraphs so we can merge safely
    for (let i = children.length - 1; i > 0; i--) {
      const node = children[i];
      if (
        node.type === "paragraph" &&
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === "text" &&
        node.children[0].value.trim() === ":"
      ) {
        // Merge with the previous paragraph
        const previous = children[i - 1];
        if (previous.type === "paragraph") {
          // Append the colon to the last text node of the previous paragraph
          previous.children.push({ type: "text", value: ":" });
          // Remove the current colon-only paragraph
          children.splice(i, 1);
        }
      }
    }
  };
}

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
      return renderCitations(children, message.citations);
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
      remarkPlugins={[remarkGfm, remarkMath, remarkMergeColon]}
      rehypePlugins={[rehypeKatex]}
      components={components as any}
      className="gap-3 flex flex-col"
    >
      {processedContent}
    </ReactMarkdown>
  );
}
