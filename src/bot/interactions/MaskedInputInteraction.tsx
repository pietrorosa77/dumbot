import { Box, Button, Keyboard, MaskedInput } from "grommet";
import { PlayFill } from "grommet-icons";
import { useState } from "react";
import styled from "styled-components";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";
import * as masks from "./availableMasks";

export interface IBotMaskQuestionProperties {
  asFooter?: boolean;
  mask: string;
}

const StyledPlay = styled(PlayFill)`
  cursor: pointer;
  &:hover {
    stroke: ${({ theme }) => theme.global.colors["accent-1"]};
  }
`;

const StyleMaskeddInput = styled(MaskedInput)`
  font-size: 1rem;
`;

export const BotMaskedInput = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotMaskQuestionProperties;
  const outType = props.node.output.type;
  const [text, setText] = useState<string>("");
  const mask = (masks as any)[controlProperties.mask](text);
  const validator = (masks.ValidateMask as any)[controlProperties.mask];

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
  };

  const onSubmit = () => {
    if (validator(text)) {
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
          border
        >
          <StyleMaskeddInput
            plain
            onChange={onChangeText}
            value={text}
            mask={mask}
          />
          <Button
            disabled={!text || !validator(text)}
            icon={<StyledPlay />}
            onClick={onSubmit}
          />
        </Box>
      </Keyboard>
    </Box>
  );
};
