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
    value: any;
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

  if (type === "password") {
    return <MarkdownView text="***********" variables={props.variables} />;
  }

  if (type === "date") {
    let dateStr;
    if (Array.isArray(value)) {
      const [from, to] = value;
      dateStr = `${new Date(from).toLocaleDateString()} - ${new Date(
        to
      ).toLocaleDateString()}`;
    } else {
      const date = new Date(value);
      dateStr = `${date.toLocaleDateString()}`;
    }
    return <MarkdownView text={dateStr} variables={props.variables} />;
  }

  if (type && type.startsWith("Custom-") && props.getCustomUserAnswer) {
    return props.getCustomUserAnswer({
      type: type.replace("Custom-", ""),
      variables: props.variables,
      value: props.answer.value,
    });
  }

  if (Array.isArray(value)) {
    const text = value.reduce((acc, c) => {
      return `${acc}\n- ${c}`;
    }, "");
    return <MarkdownView text={text} variables={props.variables} />;
  }

  return <MarkdownView text={value} variables={props.variables} />;
};
