import { substituteVars } from "./utils";
import React from "react";
import styled, { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkemoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeVideo from "rehype-video";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as HGT from "react-syntax-highlighter/dist/esm/styles/prism";
import { IBotState, IBotTheme } from "./definitions";
import {
  Anchor,
  Box,
  Heading,
  Image,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import BotContext from "./BotContext";

interface IMarkdownViewProps {
  text: any;
}
const TableContainer = styled(Box)`
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: none;
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
`;
const StyledMarkdow = styled(ReactMarkdown)`
  font-size: inherit !important;
  p,
  span,
  tr,
  th,
  tbody,
  a,
  td,
  div,
  th {
    font-size: inherit !important;
  }

  .math-inline,
  .math-display {
    * {
      font-family: KaTeX_Math !important;
      font-size: inherit !important;
    }
  }

  video {
    max-width: 100%;
  }

  ol,
  ul {
    padding-inline-start: 10px;
    list-style-position: inside;
  }

  span.linenumber {
    min-width: unset !important;
  }
`;

export const MarkdownView = React.memo(
  function MarkdownView(props: IMarkdownViewProps) {
    const bottheme: IBotTheme = React.useContext(ThemeContext);
    const botContext: IBotState = React.useContext(BotContext);
    const isText = props.text.trim ? true : false;

    const text = isText ? (props.text as string).trim() : props.text;

    const markdown =
      text && isText && botContext.variables
        ? substituteVars(text as string, botContext.variables)
        : text;

    return isText ? (
      <StyledMarkdow
        remarkPlugins={[remarkMath, remarkemoji, remarkGfm]}
        rehypePlugins={[
          rehypeKatex,
          [rehypeVideo, { test: /\/(.*)(.mp4|.mov|webm)$/ }],
        ]}
        components={{
          a(props: any) {
            return <Anchor {...props} target="_blank" />;
          },
          h1(props: any) {
            return <Heading {...props} level={1} size="medium" />;
          },
          h2(props: any) {
            return <Heading {...props} level={2} size="medium" />;
          },
          h3(props: any) {
            return <Heading {...props} level={3} size="medium" />;
          },
          h4(props: any) {
            return <Heading {...props} level={4} size="medium" />;
          },
          h5(props: any) {
            return <Heading {...props} level={5} size="medium" />;
          },
          h6(props: any) {
            return <Heading {...props} level={6} size="medium" />;
          },
          span(props: any) {
            return <Text {...props} />;
          },
          p(props: any) {
            return (
              <Paragraph
                {...props}
                style={{ width: "100%", maxWidth: "100%" }}
              />
            );
          },
          table(props: any) {
            return (
              <TableContainer>
                <Table {...props} style={{ width: "100%", maxWidth: "100%" }} />
              </TableContainer>
            );
          },
          thead(props: any) {
            return <TableHeader {...props} />;
          },
          th(props: any) {
            return <TableCell {...props} />;
          },
          td(props: any) {
            return <TableCell {...props} style={{ display: "table-cell" }} />;
          },
          tr(props: any) {
            return <TableRow {...props} />;
          },
          tbody(props: any) {
            return <TableBody {...props} />;
          },
          img(props: any) {
            return <Image {...props} style={{ maxWidth: "100%" }} />;
          },
          code(props: any) {
            const { className, inline, children, ...others } = props;
            const match = /language-(\w+)/.exec(className || "");
            return (
              <SyntaxHighlighter
                style={
                  (HGT as any)[bottheme.bot?.botCodeHighLightTheme || "xonokai"]
                }
                showLineNumbers={!inline}
                wrapLongLines={!inline}
                wrapLines
                language={match ? match[1] : ""}
                PreTag={inline ? "span" : "div"}
                {...others}
                customStyle={inline ? { padding: "5px" } : undefined}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {markdown}
      </StyledMarkdow>
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
