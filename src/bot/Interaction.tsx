import { Box, ThemeContext } from "grommet";
import { MarginType } from "grommet/utils";
import React from "react";
import { IBotTheme, IDmbtInteractionProps } from "./definitions";
import { BotQuestion } from "./interactions/QuestionInteraction";
import { BotDatePicker } from "./interactions/DatePickerInteraction";
import { BotMultiChoice } from "./interactions/MultiChoiceInteraction";
import { BotSingleChoice } from "./interactions/SingleChoiceInteraction";
import { prepareInteractionNode } from "./stateHelpers";
import { BotMaskedInput } from "./interactions/MaskedInputInteraction";
import { BotInteractionTags } from "./interactions/TagsInteraction";
import { BotPasswordInteraction } from "./interactions/PasswordInteraction";

const InteractionsMap = new Map<
  string,
  (props: IDmbtInteractionProps) => JSX.Element
>([
  ["question", BotQuestion],
  ["mask", BotMaskedInput],
  ["buttons", BotSingleChoice],
  ["multiButtons", BotMultiChoice],
  ["datePicker", BotDatePicker],
  ["tags", BotInteractionTags],
  ["password", BotPasswordInteraction],
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
      background={props.bgColor}
      round={props.round}
      style={{
        boxShadow: "0 3px 5px 0 rgb(0 0 0 / 90%)",
      }}
    >
      <InteractionControl {...props} theme={theme} node={nodeSub} />
    </Box>
  );
};
