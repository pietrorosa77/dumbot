import { IBotThemableProps, IDisplayResponseProps } from "../definitions";
import JSONPretty from "react-json-prettify";
import * as themes from "react-json-prettify/dist/themes";

export const JsonObjectDisplay = (props: IDisplayResponseProps) => {
  const answer = props.message.output.value;
  const themeProps = props.theme.bot as IBotThemableProps;
  const theme = (themes as any)[themeProps.jsonViewerTheme as any];

  return (
    <JSONPretty
      id="json-pretty"
      json={answer}
      padding={2}
      theme={theme}
    ></JSONPretty>
  );
};
