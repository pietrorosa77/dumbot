import { Box, Button, DateInput, Grommet, Keyboard } from "grommet";
import { PlayFill } from "grommet-icons";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IDateIntervalProperties {
  displayAs: string;
  format?: string;
}

const StyledPlay = styled(PlayFill)`
  cursor: pointer;
  &:hover {
    stroke: ${({ theme }) => theme.global.colors["accent-1"]};
  }
`;

const StyledDate = styled(DateInput)`
  font-size: 1rem;
  width: 100%;
  border: none;
`;

const StyledContainer = styled(Box)`
  div {
    border: none !important;
  }
`;

export const BotDatePicker = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const [text, setText] = useState<string>("");
  const [valid, setValid] = useState(false);
  const controlProperties = props.node.properties as IDateIntervalProperties;
  const [focus, setFocus] = useState(true);
  const asFooter = controlProperties.displayAs === "footer";
  const dateFormat = controlProperties.format || "dd/mm/yyyy";
  const dateInputRef = useRef<HTMLInputElement>();

  const onAnswer = (value: any) => {
    dispatch({
      type: "@answer",
      payload: {
        value,
        port: DEFAULT_NODE_PORT,
        type: "date",
        id: props.node.output.id,
      },
    });
  };

  const onChangeText = (e: any) => {
    setText(e.value);
    setValid(isValid(e.value));
  };

  const isValid = (date: string | string[]) => {
    if (!date) {
      return false;
    }

    if (Array.isArray(date)) {
      return date.length === 2;
    }

    return true;
  };

  const onSubmit = () => {
    if (valid && dateInputRef.current) {
      onAnswer(dateInputRef.current.value);
    }
  };

  return (
    <Box align="center" justify="start" pad={asFooter ? "none" : "medium"} fill>
      <Keyboard target="component" onEnter={onSubmit}>
        <StyledContainer
          direction="row"
          margin="none"
          align="center"
          round="small"
          fill
          border={{
            size: "2px",
            color: focus ? "active" : undefined,
          }}
        >
          <Grommet theme={props.theme} style={{ width: "100%" }}>
            <StyledDate
              dropProps={{
                stretch: false,
                overflow: "scroll",
                responsive: true,
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              style={{ border: "none" }}
              ref={dateInputRef as any}
              format={dateFormat}
              value={text}
              inputProps={{ focusIndicator: false }}
              onChange={onChangeText}
            />
          </Grommet>
          <Button icon={<StyledPlay />} disabled={!valid} onClick={onSubmit} />
        </StyledContainer>
      </Keyboard>
    </Box>
  );
};
