import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import JSONPretty from "react-json-prettify";
import { IBotThemableProps, IMessage } from "../definitions";
// eslint-disable-next-line
import * as themes from "react-json-prettify/dist/themes";
import { MarkdownView } from "../MarkdownView";
import { FileSummary } from "./FileSummary";
import { isEqual } from "lodash";

interface IDisplayAnswerProps {
  message: IMessage;
  CustomAnswer?: React.FC<IMessage>;
}

const getDisplayString = (value: any, type: string) => {
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
    return dateStr;
  }

  if (type === "password") {
    return "***********";
  }

  if (Array.isArray(value)) {
    const text = value.reduce((acc, c) => {
      return `${acc}\n- ${c}`;
    }, "");
    return text;
  }

  return value;
};

export const UserAnswer = React.memo(
  function InnerAnswer(props: IDisplayAnswerProps) {
    const answer = props.message.output || { value: "", type: "string" };
    const { type, value } = answer;
    const theme = React.useContext(ThemeContext).bot as IBotThemableProps;

    if (type && type.startsWith("Custom-") && props.CustomAnswer) {
      return (
        <props.CustomAnswer key={props.message.id} {...props.message} />
      ) as any;
    }

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
      return (
        <Box background={value} width="50px" height="50px" round="medium" />
      );
    }

    if (type === "file") {
      return <FileSummary files={value} />;
    }

    const valToPass = getDisplayString(value, type);
    return <MarkdownView text={valToPass} />;
  } as any,
  function arePropsEqual(
    prevProps: IDisplayAnswerProps,
    nextProps: IDisplayAnswerProps
  ) {
    const equalMessage = isEqual(prevProps.message, nextProps.message);
    console.log("SAME NODE ", prevProps.message.id, equalMessage);
    return equalMessage;
  }
);
