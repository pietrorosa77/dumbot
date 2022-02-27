import { Box, Button, Keyboard, TextInput, Text } from "grommet";
import { FormClose, PlayFill } from "grommet-icons";
import { useRef, useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";

export interface IBotTagsQuestionProperties {
  placeholder?: string;
  displayAs: string;
  suggestions?: string[];
}

const Tag = ({ children, onRemove, ...rest }: any) => {
  const tag = (
    <Box
      direction="row"
      align="center"
      background="brand"
      pad={{ horizontal: "xsmall", vertical: "xxsmall" }}
      margin={{ vertical: "xxsmall" }}
      round="medium"
      {...rest}
    >
      <Text size="xsmall" margin={{ right: "xxsmall" }}>
        {children}
      </Text>
      {onRemove && <FormClose size="small" color="white" />}
    </Box>
  );

  if (onRemove) {
    return (
      <Button primary onClick={onRemove}>
        {tag}
      </Button>
    );
  }
  return tag;
};

const StyledPlay = styled(PlayFill)`
  cursor: pointer;
  &:hover {
    stroke: ${({ theme }) => theme.global.colors["accent-1"]};
  }
`;

const StyledInput = styled(TextInput)`
  font-size: 1rem;
`;

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }: any) => {
  const [currentTag, setCurrentTag] = useState("");
  const boxRef = useRef();

  const updateCurrentTag = (event: any) => {
    setCurrentTag(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onAddTag = (tag: string) => {
    if (onAdd) {
      onAdd(tag);
    }
  };

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag);
      setCurrentTag("");
    }
  };

  const renderValue = () =>
    value.map((v: string, index: number) => (
      <Tag
        margin="xxsmall"
        key={`${v}${index + 0}`}
        onRemove={() => onRemove(v)}
      >
        {v}
      </Tag>
    ));

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction="row"
        align="center"
        pad={{ horizontal: "small" }}
        border="all"
        ref={boxRef as any}
        wrap
      >
        {value.length > 0 && renderValue()}
        <Box flex style={{ minWidth: "120px" }}>
          <StyledInput
            type="search"
            plain
            dropTarget={boxRef.current}
            {...rest}
            onChange={updateCurrentTag}
            value={currentTag}
            onSuggestionSelect={(event) => onAddTag(event.suggestion)}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};

export const BotInteractionTags = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotTagsQuestionProperties;
  const allSuggestions = controlProperties.suggestions || [];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState(allSuggestions);
  const onRemoveTag = (tag: string) => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedTags(newTags);
  };

  const onAddTag = (tag: string) => setSelectedTags([...selectedTags, tag]);

  const onFilterSuggestion = (value: string) =>
    setSuggestions(
      allSuggestions.filter(
        (suggestion: string) =>
          suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );
  const onAnswer = (value: any) => {
    dispatch({
      type: "@answer",
      payload: {
        value,
        port: DEFAULT_NODE_PORT,
        type: "array",
        id: props.node.output.id,
      },
    });
  };

  const onSubmit = () => {
    if (selectedTags.length) {
      onAnswer(selectedTags);
    }
  };

  return (
    <Box
      width="100%"
      direction="row"
      align="center"
      round="small"
      pad={{ horizontal: "small", vertical: "xsmall" }}
      border
    >
      <TagInput
        placeholder={controlProperties.placeholder}
        suggestions={suggestions}
        value={selectedTags}
        onRemove={onRemoveTag}
        onAdd={onAddTag}
        onChange={(e: any) => onFilterSuggestion(e.target.value)}
      />
      <Button
        disabled={!selectedTags.length}
        icon={<StyledPlay />}
        onClick={onSubmit}
      />
    </Box>
  );
};
