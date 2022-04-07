import { Box, ThemeContext, Notification } from "grommet";
import { MarginType, PadType } from "grommet/utils";
import React, { useContext } from "react";
import {
  DEFAULT_NODE_PORT,
  IBotTheme,
  IDmbtInteractionProps,
  IDmbtMessage,
} from "./definitions";
import { BotQuestion } from "./interactions/QuestionInteraction";
import { BotDatePicker } from "./interactions/DatePickerInteraction";
import { BotMultiChoice } from "./interactions/MultiChoiceInteraction";
import { BotSingleChoice } from "./interactions/SingleChoiceInteraction";
import { prepareInteractionNode } from "./stateHelpers";
import { BotMaskedInput } from "./interactions/MaskedInputInteraction";
import { BotInteractionTags } from "./interactions/TagsInteraction";
import { BotPasswordInteraction } from "./interactions/PasswordInteraction";
import styled, { css, keyframes } from "styled-components";

const spinning = (color: string, size?: number) => (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width={`${size || 36}px`}
    height={`${size || 36}px`}
    fill={color}
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const CenteredDiv = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50pt;
`;

export const BotSpinner = (props: { themeColor: string; size?: number }) => {
  const theme: any = useContext(ThemeContext);
  return (
    <Box align="center" justify="center">
      {spinning(theme.global.colors[props.themeColor], props.size)}
    </Box>
  );
};

export const CenteredBotSpinner = (props: {
  themeColor?: string;
  size?: number;
}) => (
  <CenteredDiv>
    <BotSpinner themeColor={props.themeColor || "brand"} size={props.size} />
  </CenteredDiv>
);

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

const StyledBox = styled(Box)`
  animation: ${(props: any) => css`
    ${keyframes`
100% { opacity: 1; }
`} ${props.theme.bot.bubbleAnimationDuration} ease-in forwards
  `};

  opacity: 0;
`;

export const Interaction = (
  props: IDmbtInteractionProps & {
    customInteractions?: Map<
      string,
      (props: IDmbtInteractionProps) => JSX.Element
    >;
    bgColor?: string;
    margin?: MarginType;
    round?: string;
    height?: string;
    pad?: PadType;
    processedMessages?: IDmbtMessage[];
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

  const moveNextOnError = () => {
    props.dispatcher({
      type: "@answer",
      payload: {
        value: `Error running the bot`,
        port: DEFAULT_NODE_PORT,
        type: "error",
        id: `erroron-${props.node.output.id}-node${props.node.id}`,
      },
    });
  };

  if (!InteractionControl) {
    throw new Error(`Component of type ${props.node.type} is not supported`);
  }

  return (
    <StyledBox
      ref={containerRef as any}
      tabIndex={0}
      margin={props.margin || "none"}
      pad={props.pad || "small"}
      className="dmbt-interaction-container"
      focusIndicator={true}
      hoverIndicator="accent-1"
      background={props.bgColor}
      round={props.round}
      height={props.height}
      style={{
        boxShadow: theme.bot?.bubbleBoxShadow,
      }}
    >
      {props.botLoading && <BotSpinner themeColor="accent-1" size={50} />}
      {props.botError && (
        <Notification
          status="critical"
          title="Error executing the bot"
          message="The bot will try to recover from next step in few seconds"
          onClose={moveNextOnError}
        />
      )}
      {!props.botError && !props.botLoading && (
        <InteractionControl
          {...props}
          theme={theme}
          node={nodeSub}
          processedMessages={props.processedMessages}
        />
      )}
    </StyledBox>
  );
};
