import { Box, Button } from "grommet";
import { DEFAULT_NODE_PORT, IDmbtInteractionProps } from "../definitions";
import { GetIcon, getPortsArray } from "../stateHelpers";
import { DirectionType } from "grommet/utils";
import { OnlyIconButton } from "../BotButtons";
import React from "react";
import { PlayFill } from "grommet-icons";

export interface IBotMultiChoiceSettings {
  direction?: DirectionType;
  size?: "small" | "medium" | "large" | undefined;
  hoverIndicator?: string;
  min?: number;
  max?: number;
}

export const BotMultiChoice = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotMultiChoiceSettings;
  const [valid, setValid] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const ports = getPortsArray(props.node.ports);
  const minallowed = controlProperties.min || 1;
  const maxAllowed = controlProperties.max || ports.length;

  const onPress = (port: string, isSelected: boolean) => {
    const newSelected = isSelected
      ? selected.filter((el) => el !== port)
      : selected.concat([port]);
    setSelected(newSelected);
    setValid(
      newSelected.length >= minallowed && newSelected.length <= maxAllowed
    );
  };

  const onSubmit = () => {
    const value = selected.map((id) => props.node.ports[id].value);
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

  return (
    <Box align="center" justify="start" pad="none" fill>
      <Box
        justify="center"
        gap="medium"
        wrap={controlProperties.direction === "row"}
        direction={controlProperties.direction}
      >
        {ports.map((p) => {
          const Icon = GetIcon(p.icon);
          const isSelected = selected.find((id) => p.id === id) ? true : false;
          return (
            <Button
              size={controlProperties.size}
              label={p.text || undefined}
              margin={{ top: "small" }}
              icon={Icon ? <Icon /> : undefined}
              key={p.id}
              primary={isSelected}
              hoverIndicator={controlProperties.hoverIndicator || "light-1"}
              onClick={() => onPress(p.id, isSelected ? true : false)}
            />
          );
        })}
      </Box>
      <Box pad="small">
        <OnlyIconButton
          disabled={!valid}
          icon={<PlayFill />}
          onClick={onSubmit}
          tip="Confirm selection"
        />
      </Box>
    </Box>
  );
};
