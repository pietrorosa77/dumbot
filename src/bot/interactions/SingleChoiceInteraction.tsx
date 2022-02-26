import { Box, Button } from "grommet";
import { IDmbtInteractionProps } from "../definitions";
import { GetIcon, getPortsArray } from "../stateHelpers";
import { DirectionType } from "grommet/utils";

export interface IBotSingleChoiceSettings {
  direction?: DirectionType;
  size?: "small" | "medium" | "large" | undefined;
  hoverIndicator?: string;
}

export const BotSingleChoice = (props: IDmbtInteractionProps) => {
  const dispatch = props.dispatcher;
  const controlProperties = props.node.properties as IBotSingleChoiceSettings;
  const outType = props.node.output.type;
  const ports = getPortsArray(props.node.ports);

  const onPress = (port: string, value: any) => {
    dispatch({
      type: "@answer",
      payload: {
        value,
        port,
        type: outType,
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
          return (
            <Button
              key={p.id}
              hoverIndicator={controlProperties.hoverIndicator || "light-1"}
              size={controlProperties.size}
              label={p.text || undefined}
              margin={{ top: "small" }}
              icon={Icon ? <Icon /> : undefined}
              onClick={() => onPress(p.id, p.value || p.text)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
