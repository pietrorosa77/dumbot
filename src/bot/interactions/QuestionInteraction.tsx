import { Box, Button, Keyboard, Text, TextArea, TextInput } from "grommet";
import { PlayFill } from "grommet-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IBotQuestionProperties {
  type?: string;
  [key: string]: any;
  placeholder?: string;
  pattern?: string;
  validationMessage?: string;
  displayAs: string;
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
  overflow: auto;
  max-height: 300px;
`;

const StyledInput = styled(TextInput)`
  font-size: 1rem;
`;

export const BotQuestion = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotQuestionProperties;
  const [focus, setFocus] = useState(true);
  const tbRef = useRef<HTMLTextAreaElement>();
  const dangerColor = props.theme.global?.colors?.["status-error"];

  const outType = props.node.output.type;
  const [text, setText] = useState<string>("");
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
    if (tbRef.current) {
      tbRef.current.style.height = "0px";
      const scrollHeight = tbRef.current.scrollHeight;
      tbRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  useEffect(() => {
    if (text) {
      setValid(validate(text));
    }
  }, [text, validate, setValid]);

  useEffect(() => {
    if (tbRef.current) {
      tbRef.current.focus();
    }
  });

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

  const onSubmit = (event: any) => {
    if (event.shiftKey) {
      return true;
    }
    if (valid) {
      onAnswer(text);
    }
  };

  return (
    <Box justify="start" pad="none">
      <Keyboard target="component" onEnter={onSubmit}>
        <Box
          direction="row"
          margin="none"
          align="center"
          round="small"
          fill
          border={{
            size: "2px",
            color: !valid ? dangerColor : focus ? "active" : undefined,
          }}
        >
          {!controlProperties.long && (
            <StyledInput
              plain
              ref={tbRef as any}
              value={text}
              onChange={onChangeText}
              onSuggestionSelect={onSuggestionSelect}
              suggestions={suggestions}
              type={controlProperties.type || undefined}
              placeholder={controlProperties.placeholder}
              pattern={controlProperties.pattern}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              focusIndicator={false}
            />
          )}
          {controlProperties.long && (
            <StyledTextarea
              plain
              ref={tbRef as any}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={text}
              resize={false}
              fill
              onChange={onChangeText}
              focusIndicator={false}
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
        <Text color={dangerColor} size="small">
          {controlProperties.validationMessage || "invalid answer"}
        </Text>
      )}
    </Box>
  );
};
