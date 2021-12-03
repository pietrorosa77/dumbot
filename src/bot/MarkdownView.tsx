import { substituteVars } from "./utils";
import React from "react";
import { isEqual } from "lodash";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkemoji from "remark-emoji";

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
    const isText = props.text.trim ? true : false;

    const text = isText ? (props.text as string).trim() : props.text;

    const markdown =
      text && isText && props.variables
        ? substituteVars(text as string, props.variables)
        : text;

    return isText ? (
      <StyledMarkdow remarkPlugins={[remarkemoji]}>{markdown}</StyledMarkdow>
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
