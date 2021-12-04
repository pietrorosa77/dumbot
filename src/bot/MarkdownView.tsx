import { substituteVars } from "./utils";
import React from "react";
import { isEqual } from "lodash";
import styled, { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkemoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as HGT from "react-syntax-highlighter/dist/esm/styles/prism";
import { IBotTheme } from "./definitions";
import {
  Anchor,
  Image,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import { Link } from "grommet-icons";

interface IMarkdownViewProps {
  text: any;
  variables: { [key: string]: any };
}

const StyledMarkdow = styled(ReactMarkdown)`
  font-size: inherit !important;
  * {
    font-size: inherit !important;
  }
`;

export const MarkdownView = React.memo(
  function MarkdownView(props: IMarkdownViewProps) {
    const bottheme: IBotTheme = React.useContext(ThemeContext);
    const isText = props.text.trim ? true : false;

    const text = isText ? (props.text as string).trim() : props.text;

    const markdown =
      text && isText && props.variables
        ? substituteVars(text as string, props.variables)
        : text;

    return isText ? (
      <StyledMarkdow
        remarkPlugins={[remarkemoji, remarkGfm]}
        components={{
          a(props: any) {
            const titleNode = props.node.children.find(
              (el: any) => el.type === "text"
            );

            const title = titleNode ? titleNode.value : props.href;
            return (
              <Anchor href={props.href} title={props.title} label={title} />
            );
          },
          img(props: any) {
            return (
              <Image
                src={props.src}
                style={{ maxWidth: "100%" }}
                alt={props.alt || props.src}
                title={props.title}
              />
            );
          },
          table(props: any) {
            const { className, inline, node, ...others } = props;
            const head = node.children.find(
              (el: any) => el.tagName === "thead"
            );
            const body = node.children.find(
              (el: any) => el.tagName === "tbody"
            );
            const headerRow = head.children.find(
              (el: any) => el.tagName === "tr"
            );
            return (
              <Table width="100%">
                <TableHeader>
                  <TableRow>
                    {headerRow.children
                      .filter((el: any) => el.tagName === "th")
                      .map((el: any, i: number) => (
                        <TableCell key={i} {...el.properties}>
                          {el.children
                            .filter((el: any) => el.type === "text")
                            .map((el: any) => el.value)
                            .join()}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {body.children
                    .filter((el: any) => el.tagName === "tr")
                    .map((row: any, i: number) => (
                      <TableRow key={i}>
                        {row.children
                          .filter((r: any) => r.tagName === "td")
                          .map((el: any, i: number) => (
                            <TableCell key={i} {...el.properties}>
                              {el.children
                                .filter((el: any) => el.type === "text")
                                .map((el: any) => el.value)
                                .join()}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            );
          },
          code(props: any) {
            const { className, inline, children, ...others } = props;
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={
                  (HGT as any)[bottheme.bot?.botCodeHighLightTheme || "xonokai"]
                }
                showLineNumbers
                wrapLongLines
                language={match[1]}
                PreTag="div"
                {...others}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...others}>
                {children}
              </code>
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
    const equalVars = isEqual(prevProps.variables, nextProps.variables);
    return equalContent && equalVars;
  }
);
