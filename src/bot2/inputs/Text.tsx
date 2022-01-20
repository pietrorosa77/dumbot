import { Box, Keyboard, Spinner, TextArea, ThemeContext } from "grommet";
import { PlayFill } from "grommet-icons";
import * as React from "react";
import { ChangeEvent } from "react";
import { SubmitButton } from "../BotButtons";
import { HoveredContainer } from "../BotLayout";
import { IBotThemableColors, IDmbtInteractionProps } from "../definitions";

export const DmbtTextInput = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotSingleChoiceSettings;
  const [valid, setValid] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const theme = props.theme;
  const botColors = theme.global?.colors as IBotThemableColors;
  const botFocusColor = botColors.botFocusColor;
  const botInputBoxBgColor = botColors.botInputBoxBgColor;
  const simpleColor = botColors.botBubbleColor as string;
  const inputFontColor = botColors.botInputControlsFontColor;
  const [val, setVal] = React.useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    setVal(nextValue);
  };

  const onSubmit = (event: any) => {
    if (event.shiftKey) {
      return true;
    }
    props.onSubmit(val);
    setVal("");
    (event as Event).stopPropagation();
    (event as Event).preventDefault();
  };

  return (
    <Box justify="start" pad="none">
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
          color: focus ? botFocusColor : undefined,
        }}
      >
        <Keyboard target="component" onEnter={onSubmit}>
          <TextArea
            value={val}
            resize={false}
            onChange={onChange}
            fill
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            plain
            tabIndex={0}
            focusIndicator={false}
            style={{
              fontWeight: "normal",
              color: inputFontColor,
            }}
          />
        </Keyboard>
        <SubmitButton
          icon={<PlayFill size="medium" color={simpleColor} />}
          hoverColor={botFocusColor}
          size="small"
          disabled={props.loading || props.error}
          color={simpleColor}
          a11yTitle="Send your answer"
          focusIndicator={false}
          onClick={onSubmit}
          tip={"send"}
        ></SubmitButton>
      </HoveredContainer>
    </Box>
  );
};
