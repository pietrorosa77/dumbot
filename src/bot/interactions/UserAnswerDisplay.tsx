import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import JSONPretty from "react-json-prettify";
import { BotNodeOutputType, IBotThemableProps } from "../definitions";
// eslint-disable-next-line
import * as themes from "react-json-prettify/dist/themes";
import { StyledMarkdow } from "../MarkdownView";

export const UserAnswer = (props: {
  type: BotNodeOutputType;
  value: string;
}) => {
  const { type, value } = props;
  const theme = React.useContext(ThemeContext).bot as IBotThemableProps;
  if (type === "password") {
    return <Box>{"***********"}</Box>;
  }

  if (type === "color") {
    return <Box background={value} width="50px" height="50px" round="medium" />;
  }

  if (type === "date") {
    const date = new Date(value);
    return (
      <Box>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Box>
    );
  }

  if (type === "object") {
    const json = JSON.parse(decodeURIComponent(value));
    return (
      <JSONPretty
        json={json}
        padding={2}
        themes={(themes as any)[theme.jsonViewerTheme || "github"]}
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <Box>
        {value.map((el, i) => (
          <Box key={i}>{el}</Box>
        ))}
      </Box>
    );
  }

  return (
    <StyledMarkdow>
      {`<pre style={{ margin: "unset" }}>${value}</pre>`}
    </StyledMarkdow>
  );
};
