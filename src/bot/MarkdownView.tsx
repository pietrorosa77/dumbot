import React from "react";

interface IMarkdownViewProps {
  text: any;
}

export const MarkdownView = React.memo(
  function MarkdownView(props: IMarkdownViewProps) {
    const isText = props.text.trim ? true : false;

    const text = isText ? (props.text as string).trim() : props.text;

    return text;
  },
  function arePropsEqual(
    prevProps: IMarkdownViewProps,
    nextProps: IMarkdownViewProps
  ) {
    const equalContent = prevProps.text === nextProps.text;
    return equalContent;
  }
);
