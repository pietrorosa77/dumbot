import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import JSONPretty from "react-json-prettify";
import {
  BotNodeOutputType,
  IBotThemableProps,
  ICustomUserComponentAnswerProps,
} from "../definitions";
// eslint-disable-next-line
import * as themes from "react-json-prettify/dist/themes";
import { MarkdownView } from "../MarkdownView";
import { FileSummary } from "./FileSummary";

export const UserAnswer = (props: {
  answer: {
    type: BotNodeOutputType;
    value: string;
  };
  variables?: any;
  getCustomUserAnswer?: (props: ICustomUserComponentAnswerProps) => JSX.Element;
}) => {
  const { type, value } = props.answer;
  const theme = React.useContext(ThemeContext).bot as IBotThemableProps;

  if (type === "object") {
    return (
      <JSONPretty
        json={value}
        padding={2}
        themes={(themes as any)[theme.jsonViewerTheme || "github"]}
      />
    );
  }

  if (type === "color") {
    return <Box background={value} width="50px" height="50px" round="medium" />;
  }

  if (type === "file") {
    return <FileSummary files={value} />;
  }

  let text = value;
  if (type === "password") {
    text = "***********";
  }

  if (type === "date") {
    const date = new Date(value);
    text = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  if (Array.isArray(value)) {
    text = value.reduce((acc, c) => {
      return `${acc}\n- ${c}`;
    }, "");
  }

  if (type && type.startsWith("Custom-") && props.getCustomUserAnswer) {
    return props.getCustomUserAnswer({
      type: type.replace("Custom-", ""),
      variables: props.variables,
      value: props.answer.value,
    });
  }

  return <MarkdownView text={text} variables={props.variables} />;
};
