import { Box, ThemeContext } from "grommet";
import { MarginType } from "grommet/utils";
import React from "react";
import { IBotTheme, IDmbtInteractionProps } from "./definitions";
import { BotSingleChoice } from "./interactions/SingleChoiceInteraction";
import { prepareInteractionNode } from "./stateHelpers";

const InteractionsMap = new Map<
  string,
  (props: IDmbtInteractionProps) => JSX.Element
>([
  // ["question", BotQuestion],
  ["buttons", BotSingleChoice],
]);

export const Interaction = (
  props: IDmbtInteractionProps & {
    customInteractions?: Map<
      string,
      (props: IDmbtInteractionProps) => JSX.Element
    >;
    bgColor?: string;
    margin?: MarginType;
    round?: string;
  }
) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const customInteractions = props.customInteractions || new Map();
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const nodeSub = prepareInteractionNode(props.node, props.variables);
  const InteractionControl =
    customInteractions.get(props.node.type) ||
    InteractionsMap.get(props.node.type);

  React.useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      window.requestAnimationFrame(() => element.focus());
    }
  }, []);

  if (!InteractionControl) {
    throw new Error(`Component of type ${props.node.type} is not supported`);
  }

  return (
    <Box
      ref={containerRef as any}
      tabIndex={0}
      margin={props.margin || "none"}
      pad="small"
      className="dmbt-interaction-container"
      focusIndicator={true}
      hoverIndicator="accent-1"
      background={props.bgColor || "botInteractionBgColor"}
      round={props.round}
    >
      <InteractionControl {...props} theme={theme} node={nodeSub} />
    </Box>
  );
};
