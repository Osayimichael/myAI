import { DisplayMessage } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { preprocessLaTeX, renderCitations } from "@/utilities/formatting";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Custom remark plugin to recursively merge colon-only paragraphs
function remarkMergeColon() {
  return (tree: any) => {
    function mergeColonInChildren(nodes: any[]) {
      // Loop backwards to safely splice out nodes as needed
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (
          node.type === "paragraph" &&
          node.children &&
          node.children.length === 1 &&
          node.children[0].type === "text" &&
          node.children[0].value.trim() === ":"
        ) {
          if (i > 0 && nodes[i - 1].type === "paragraph") {
            // Append the colon to the previous paragraph
            nodes[i - 1].children.push({ type: "text", value: ":" });
            // Remove the colon-only paragraph
            nodes.splice(i, 1);
            // Continue without further processing of this index
            continue;
          }
        }
        // If the current node has children, recursively process them
        if (node.children && Array.isArray(node.children)) {
          mergeColonInChildren(node.children);
        }
      }
    }
    mergeColonInChildren(tree.children);
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
