import { Box, Button } from "grommet";
import { PlayFill } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import {
  BotInputType,
  IBotNodeInteractionProps,
  IBotThemableColors,
  IInputComponentProps,
  IInputControlProperties,
} from "../definitions";
import { GetIcon } from "../utils";
import { BotFileInput } from "./inputs/FileInput";
import { BotTextInput } from "./inputs/Input";
import { BotMaskedInput } from "./inputs/Masked";
import { BotTextAreaInput } from "./inputs/TextArea";

const InputMap = new Map<
  BotInputType,
  (props: IInputComponentProps) => JSX.Element
>([
  ["input", BotTextInput],
  ["masked", BotMaskedInput],
  ["textarea", BotTextAreaInput],
  ["file", BotFileInput],
]);

const NullInput = () => null;

export const HoveredContainer = styled(Box)<{
  hoverBorderColor: string;
}>`
  &:hover {
    border-color: ${(props) => props.hoverBorderColor};
  }
`;

export const SubmitButton = styled(Button)<{
  hoverColor: string;
}>`
  &:hover {
    svg {
      fill: ${(props) => (!props.disabled ? props.hoverColor : undefined)};
      stroke: ${(props) => (!props.disabled ? props.hoverColor : undefined)};
    }
  }
`;

export const BotQuestion = (props: IBotNodeInteractionProps) => {
  const properties = props.node.properties as IInputControlProperties;
  const botColors = props.theme.global?.colors as IBotThemableColors;
  const validationErrorMessage = properties.validationErrorMessage;
  const port = props.node.ports[0];
  const outputType = props.node.output.type;

  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const botFocusColor = botColors.botFocusColor;
  const simpleColor = botColors.botBubbleColor as string;
  const inputFontColor = botColors.botInputControlsFontColor;
  const botInputBoxBgColor = botColors.botInputBoxBgColor;
  const BoxIcon = GetIcon(properties.icon);
  const Icon = BoxIcon ? (
    <BoxIcon size="medium" color={focus ? botFocusColor : simpleColor} />
  ) : undefined;

  const UserBotInput = InputMap.get(properties.controlType) || NullInput;

  React.useEffect(() => {
    if (value && properties.pattern) {
      const isValid = new RegExp(properties.pattern).test(value);
      setValid(isValid);
    }
  }, [value, properties.pattern]);

  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  const onFocus = (focused: boolean) => {
    setFocus(focused);
  };

  const onSubmit = () => {
    if (!value) {
      return;
    }
    props.onUserAction({
      value,
      port,
      type: outputType,
      id: props.node.output.id,
    });
  };

  return (
    <Box justify="start" pad="none" fill>
      <HoveredContainer
        direction="row"
        margin="none"
        align="center"
        hoverBorderColor={botFocusColor}
        elevation={focus ? "medium" : "none"}
        round="small"
        fill
        background={botInputBoxBgColor}
        border={{
          size: "2px",
          color: valid ? (focus ? botFocusColor : undefined) : "red",
        }}
      >
        <UserBotInput
          focused={focus}
          value={value}
          fontColor={inputFontColor}
          inputProps={properties}
          isValid={valid}
          onChange={onChange}
          onFocus={onFocus}
          onSubmit={onSubmit}
          Icon={Icon}
          key={`nodebotinpt-${props.node.id}`}
        />
        <SubmitButton
          icon={<PlayFill size="medium" color={simpleColor} />}
          hoverColor={botFocusColor}
          size="small"
          disabled={!value || !valid}
          color={simpleColor}
          a11yTitle="Send your answer"
          focusIndicator={false}
          onClick={onSubmit}
        ></SubmitButton>
      </HoveredContainer>
      {!valid && validationErrorMessage && (
        <Box
          background="status-critical"
          direction="row"
          margin={{ top: "5px" }}
          round="small"
          align="center"
          justify="center"
        >
          {validationErrorMessage}
        </Box>
      )}
    </Box>
  );
};
