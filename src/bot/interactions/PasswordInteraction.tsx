import { Hide, PlayFill, View } from "grommet-icons";
import { Box, Button, Keyboard, TextInput, Text } from "grommet";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IBotQuestionProperties {
  pattern?: string;
  validationMessage?: string;
  displayAs: string;
}

const StyledPlay = styled(PlayFill)`
  cursor: pointer;
  &:hover {
    stroke: ${({ theme }) => theme.global.colors["accent-1"]};
  }
`;

export const BotPasswordInteraction = (props: IDmbtInteractionProps) => {
  const [value, setValue] = useState("");
  const [reveal, setReveal] = useState(false);
  const [valid, setValid] = useState<boolean>(true);
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotQuestionProperties;
  const asFooter = controlProperties.displayAs === "footer";
  const dangerColor = props.theme.global?.colors?.["status-error"];

  const validate = useCallback(
    (val: string) => {
      if (!controlProperties.pattern) {
        return true;
      }

      const regex = new RegExp(controlProperties.pattern);
      return regex.test(val);
    },
    [controlProperties.pattern]
  );

  useEffect(() => {
    if (value) {
      setValid(validate(value));
    }
  }, [value, validate, setValid]);

  const onAnswer = (value: any) => {
    dispatch({
      type: "@answer",
      payload: {
        value,
        port: DEFAULT_NODE_PORT,
        type: "password",
        id: props.node.output.id,
      },
    });
  };

  const onSubmit = () => {
    if (valid) {
      onAnswer(value);
    }
  };

  return (
    <Box align="center" justify="start" pad={asFooter ? "none" : "medium"} fill>
      <Keyboard target="component" onEnter={onSubmit}>
        <Box
          width="100%"
          direction="row"
          align="center"
          round="small"
          pad={{ horizontal: "small", vertical: "xsmall" }}
          border={!valid ? { color: dangerColor } : true}
        >
          <TextInput
            plain
            type={reveal ? "text" : "password"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button
            icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
            onClick={() => setReveal(!reveal)}
          />
          <Button
            disabled={!valid || !value}
            icon={<StyledPlay />}
            onClick={onSubmit}
          />
        </Box>
      </Keyboard>
      {!valid && (
        <Text color={dangerColor} size="xsmall">
          {controlProperties.validationMessage || "invalid answer"}
        </Text>
      )}
    </Box>
  );
};
