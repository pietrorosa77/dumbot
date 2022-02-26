import { Box, Button, Keyboard, Text, TextArea, TextInput } from "grommet";
import { PlayFill } from "grommet-icons";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IBotQuestionProperties {
  type?: string;
  [key: string]: any;
  placeholder?: string;
  pattern?: string;
  validationMessage?: string;
  asFooter?: boolean;
  long?: boolean;
  suggestions?: string[];
}

const StyledPlay = styled(PlayFill)`
  cursor: pointer;
  &:hover {
    stroke: ${({ theme }) => theme.global.colors["accent-1"]};
  }
`;

const StyledTextarea = styled(TextArea)`
  font-size: 1rem;
`;

const StyledInput = styled(TextInput)`
  font-size: 1rem;
`;

export const BotQuestion = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotQuestionProperties;
  const dangerColor = props.theme.global?.colors?.["status-error"];

  const outType = props.node.output.type;
  const [text, setText] = useState<string>();
  const [valid, setValid] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState(
    controlProperties.suggestions || []
  );

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
    if (text) {
      setValid(validate(text));
    }
  }, [text, validate, setValid]);

  const onAnswer = (value: any) => {
    dispatch({
      type: "@answer",
      payload: {
        value,
        port: DEFAULT_NODE_PORT,
        type: outType,
        id: props.node.output.id,
      },
    });
  };

  const onChangeText = (e: any) => {
    const newVal = e.target.value;
    setText(newVal);

    const allSuggestions = controlProperties.suggestions || [];
    if (!newVal) setSuggestions(allSuggestions);
    else {
      const regexp = new RegExp(`^${newVal}`);
      setSuggestions(allSuggestions.filter((s) => regexp.test(s)));
    }
  };

  const onSuggestionSelect = (event: any) => {
    setText(event.suggestion);
  };

  const onSubmit = () => {
    if (valid) {
      onAnswer(text);
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
          border={!valid ? { color: dangerColor } : true}
        >
          {!controlProperties.long && (
            <StyledInput
              plain
              value={text}
              onChange={onChangeText}
              onSuggestionSelect={onSuggestionSelect}
              suggestions={suggestions}
              type={controlProperties.type || undefined}
              placeholder={controlProperties.placeholder}
              pattern={controlProperties.pattern}
            />
          )}
          {controlProperties.long && (
            <StyledTextarea
              plain
              value={text}
              onChange={onChangeText}
              placeholder={controlProperties.placeholder}
            />
          )}
          <Button
            disabled={!valid || !text}
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
