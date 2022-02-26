import { Box, Button, DateInput, Grommet, Keyboard } from "grommet";
import { PlayFill } from "grommet-icons";
import { useRef, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IDateIntervalProperties {
  asFooter?: boolean;
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
`;

export const BotDatePicker = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const [text, setText] = useState<string>("");
  const controlProperties = props.node.properties as IDateIntervalProperties;
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
  };

  const isValid = () => {
    if (!dateInputRef.current) {
      return false;
    }

    const textValue = dateInputRef.current.value;
    return textValue && textValue.length === dateFormat.length;
  };

  const onSubmit = () => {
    if (isValid() && dateInputRef.current) {
      onAnswer(dateInputRef.current.value);
    }
  };

  return (
    <Box
      align="center"
      justify="start"
      pad={controlProperties.asFooter ? "none" : "medium"}
      fill
    >
      <Keyboard target="component" onEnter={onSubmit}>
        <Box
          width="100%"
          direction="row"
          align="center"
          round="small"
          pad={{ horizontal: "small", vertical: "xsmall" }}
          border
        >
          <Grommet theme={props.theme} style={{ width: "100%" }}>
            <StyledDate
              dropProps={{
                stretch: false,
                overflow: "scroll",
                responsive: true,
              }}
              ref={dateInputRef as any}
              format={dateFormat}
              value={text}
              onChange={onChangeText}
            />
          </Grommet>
          <Button
            icon={<StyledPlay />}
            disabled={!isValid()}
            onClick={onSubmit}
          />
        </Box>
      </Keyboard>
    </Box>
  );
};
