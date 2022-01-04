import { Box, Button } from "grommet";
import React from "react";
import styled from "styled-components";
import { PlayFill } from "grommet-icons";
import { IBotNodeInteractionProps, IButtonsProps } from "../definitions";
import { GetIcon, substituteVars } from "../utils";
import { ActionButtonBot } from "../ActionButtonBot";

const ButtonOption = styled(Button)<{ onlyIcon: boolean; selected: boolean }>`
  background-color: ${(props) =>
    props.theme.global.colors[
      props.selected ? "botBubbleColor" : "botUserBubbleColor"
    ]};
  border: 2px solid ${(props) => props.theme.global.colors["botBubbleColor"]};
  border-radius: ${(props) =>
    props.onlyIcon
      ? props.theme.bot.onlyIconButtonsRadius || "50%"
      : props.theme.bot.buttonsRadius || "8px"};
  color: ${(props) =>
    props.theme.global.colors[
      props.selected ? "botFontColor" : "botUserFontColor"
    ]};
  box-shadow: ${(props) =>
    props.selected
      ? `0 0 2px 2px ${props.theme.global.colors["botFocusColor"]} !important`
      : "none"};
  svg {
    fill: ${(props) =>
      props.theme.global.colors[
        props.selected ? "botFontColor" : "botBubbleColor"
      ]};
    stroke: ${(props) =>
      props.theme.global.colors[
        props.selected ? "botFontColor" : "botBubbleColor"
      ]};
  }

  &:hover {
    box-shadow: 0 0 2px 2px
      ${(props) => props.theme.global.colors["botFocusColor"]};
    opacity: 0.9;
    transform: scale(1.1);
    transition: 0.3s ease-out;
    color: ${(props) => props.theme.global.colors["botFocusColor"]};
    svg {
      fill: ${(props) => props.theme.global.colors["botFocusColor"]};
      stroke: ${(props) => props.theme.global.colors["botFocusColor"]};
    }
  }
`;

export const BotButtons = (props: IBotNodeInteractionProps) => {
  const controlProperties = props.node.properties as IButtonsProps;
  const portsPropertiesBag = controlProperties.ports;
  const [selected, setSelected] = React.useState<string[]>([]);
  const [valid, setValid] = React.useState(false);

  const type = props.node.output.type;
  const [defaultPort, ...ports] = props.node.ports;
  const multiple = controlProperties.multiple;
  const minallowed = controlProperties.min || 1;
  const maxAllowed = controlProperties.max || ports.length;

  const onPress = (port: string, value: string, isSelected: boolean) => {
    if (!multiple) {
      props.onUserAction({ value, port, type, id: props.node.output.id });
    } else {
      const newSelected = isSelected
        ? selected.filter((el) => el !== port)
        : selected.concat([port]);
      setSelected(newSelected);
      setValid(
        newSelected.length >= minallowed && newSelected.length <= maxAllowed
      );
    }
  };

  const onSubmitMultiple = () => {
    const selectedValues = selected.map((id) =>
      substituteVars(portsPropertiesBag[id].value, props.variables)
    );

    // with multiple choices exit is the always present default port
    props.onUserAction({
      value: selectedValues,
      port: defaultPort,
      type: "array",
      id: props.node.id,
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
          const portProperty = portsPropertiesBag[p];
          const Icon = GetIcon(portProperty.icon);
          const onlyIcon = Icon && !portProperty.text ? true : false;
          const isSelected = selected.find((id) => p === id) ? true : false;
          const labelVal = substituteVars(portProperty.text, props.variables); // port text and vale are same for buttons
          const portval = substituteVars(
            portProperty.value,
            props.variables
          ) as string;

          return (
            <ButtonOption
              onlyIcon={onlyIcon}
              key={p}
              tabIndex={0}
              margin={{ top: "small" }}
              className={isSelected ? "selected" : ""}
              icon={Icon ? <Icon /> : undefined}
              label={labelVal}
              selected={isSelected}
              onClick={() => onPress(p, portval, isSelected ? true : false)}
            />
          );
        })}
      </Box>
      {multiple && (
        <Box pad="small">
          <ActionButtonBot
            disabled={!valid}
            icon={<PlayFill />}
            onClick={onSubmitMultiple}
            tip="Confirm selection"
          />
        </Box>
      )}
    </Box>
  );
};
