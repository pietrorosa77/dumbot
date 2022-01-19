import { Box } from "grommet";
import { IDmbtInteractionProps } from "../definitions";
import { GetIcon, getPortsArray } from "../stateHelpers";
import { DirectionType } from "grommet/utils";
import { BotInteractionButton } from "../BotButtons";

export interface IBotSingleChoiceSettings {
  direction?: DirectionType;
}

export const BotSingleChoice = (props: IDmbtInteractionProps) => {
  const controlProperties = props.node.properties as IBotSingleChoiceSettings;
  const outType = props.node.output.type;
  const ports = getPortsArray(props.node.ports);

  const onPress = (port: string, value: any) => {
    props.onUserAnswer({
      value,
      port,
      type: outType,
      id: props.node.output.id,
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
          const onlyIcon = Icon && !p.text ? true : false;
          return (
            <BotInteractionButton
              onlyIcon={onlyIcon}
              key={p.id}
              tabIndex={0}
              selected={false}
              margin={{ top: "small" }}
              icon={Icon ? <Icon /> : undefined}
              label={p.text}
              onClick={() => onPress(p.id, p.value)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
