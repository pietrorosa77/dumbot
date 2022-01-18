import { ThemeContext } from "grommet";
import React from "react";
import { IBotTheme, IDmbtInteractionProps, IDmbtNode } from "./definitions";

const InteractionsMap = new Map<
  string,
  (props: IDmbtInteractionProps) => JSX.Element
>([
  ["question", BotQuestion],
  ["buttons", BotButtons],
]);

export const Interaction = (props: IDmbtInteractionProps) => {
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const InteractionControl =
    InteractionsMap.get(props.node.type) ||
    props.customInteractions.get(props.node.type);

  if (!InteractionControl) {
    throw new Error(`Component of type ${props.node.type} is not supported`);
  }

  return (
    <>
      <div style={{ height: "10px", width: "100%" }}></div>
      <InteractionControl {...props} />
    </>
  );
};
