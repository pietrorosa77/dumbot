import { Box, Keyboard, TextArea, ThemeContext } from "grommet";
import { PlayFill } from "grommet-icons";
import * as React from "react";
import { ChangeEvent } from "react";
import { IBotThemableColors, IBotTheme } from "../../definitions";
import { HoveredContainer, SubmitButton } from "../Question";

export const RealtimeChatInputnput = (props: {
  onSubmit?: (val: string) => void;
}) => {
  const [focus, setFocus] = React.useState(false);
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
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

  const onSubmit = () => {
    if (!props.onSubmit) {
      return;
    }
    props.onSubmit(val);
    setVal("");
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
          color={simpleColor}
          a11yTitle="Send your answer"
          focusIndicator={false}
          onClick={onSubmit}
        ></SubmitButton>
      </HoveredContainer>
    </Box>
  );
};
