import React, { useEffect, useState } from "react";
import remarkemoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeVideo from "rehype-video";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { defaultSchema } from "./MarkdownSchema";
import rehypePrism from "rehype-prism-plus";

interface IMarkdownViewProps {
  text: any;
}

export const markdownToHtml = async (md: string) => {
  const data = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkemoji)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism, { showLineNumbers: true })
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        div: [
          ...(defaultSchema.attributes?.div || []),
          ["className", "math", "math-display"],
        ],
        span: [
          ...(defaultSchema.attributes?.span || []),
          [
            "className",
            "math",
            "math-inline",
            "token",
            "keyword",
            "module",
            "imports",
            "string",
            "tag",
            "style",
            "script",
            "attr-value",
            "attr-name",
            "italic",
            "entity",
            "punctuation",
            "bold",
            "statement",
            "important",
            "variable",
            "placeholder",
            "regex",
            "deleted",
            "atrule",
            "inserted",
            "selector",
            "url",
            "number",
            "boolean",
            "operator",
            "cdata",
            "doctype",
            "prolog",
            "comment",
            "namespace",
          ],
        ],
        pre: [
          "className",
          "language-js",
          "language-css",
          "language-md",
          "language-markup",
        ],
        code: [
          ...(defaultSchema.attributes.code || []),
          // List of all allowed languages:
          [
            "className",
            "language-js",
            "language-css",
            "language-md",
            "language-markup",
          ],
        ],
      },
    })
    .use(rehypeKatex)
    .use(rehypeVideo, { test: /\/(.*)(.mp4|.mov|webm)$/ })
    .use(rehypeStringify)
    .process(md);

  return data.value;
};

export const MarkdownView = React.memo(
  function MarkdownView(props: IMarkdownViewProps) {
    const [html, setHtml] = useState<string>();
    const isText = props.text.trim ? true : false;
    const text = isText ? (props.text as string).trim() : props.text;

    useEffect(() => {
      if (isText) {
        markdownToHtml(text).then((res) => setHtml(res as string));
      }
    }, [text, isText]);

    return isText ? (
      <div
        style={{ width: "100%", cursor: "unset" }}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      ></div>
    ) : (
      text
    );
  },
  function arePropsEqual(
    prevProps: IMarkdownViewProps,
    nextProps: IMarkdownViewProps
  ) {
    const equalContent = prevProps.text === nextProps.text;
    return equalContent;
  }
);
