import { Button, Box, Avatar } from "grommet";
import * as React from "react";
import styled, { css, keyframes, ThemeContext } from "styled-components";
import { IBotThemableProps } from "./definitions";

const TriggerButton = styled(Button)<{
  bgColor?: string;
  fontColor?: string;
  plain?: boolean;
  active?: boolean;
}>`
  background-color: ${(props) =>
    props.theme.global.colors["botTriggerButtonBackgroundColor"] ||
    props.theme.global.colors["botHeaderBgColor"]};
  border: ${(props) =>
    `2px solid ${
      props.theme.global.colors["botTriggerButtonColor"] ||
      props.theme.global.colors["botHeaderFontColor"]
    }`};
  border-radius: 50%;
  color: ${(props) =>
    props.theme.global.colors["botTriggerButtonColor"] ||
    props.theme.global.colors["botHeaderFontColor"]};
  box-shadow: 0 0 5px 4px rgb(0 0 0 / 40%);
  svg {
    fill: ${(props) =>
      props.theme.global.colors["botTriggerButtonColor"] ||
      props.theme.global.colors["botHeaderFontColor"]};
    stroke: ${(props) =>
      props.theme.global.colors["botTriggerButtonColor"] ||
      props.theme.global.colors["botHeaderFontColor"]};
  }

  &: hover
    ${(props) => `
  {
    box-shadow: 0 0 5px 5px ${
      props.theme.global.colors["botTriggerButtonHoverColor"] ||
      props.theme.global.colors["botFocusColor"]
    };
    transform: scale(1.2);
    transition: 0.5s ease-out;
    color: ${
      props.theme.global.colors["botTriggerButtonHoverColor"] ||
      props.theme.global.colors["botFocusColor"]
    };
    opacity: 0.9;
    svg {
      fill: ${
        props.theme.global.colors["botTriggerButtonHoverColor"] ||
        props.theme.global.colors["botFocusColor"]
      };
      stroke: ${
        props.theme.global.colors["botTriggerButtonHoverColor"] ||
        props.theme.global.colors["botFocusColor"]
      };
    }
  }
  `};
`;

const showElement = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const StyledTriggerButton = styled(TriggerButton)<{
  opened: boolean;
  padding: string;
}>`
  position: relative;
  padding: ${(props) => props.padding};
  z-index: 999;
  display: flex;
  align-self: center;
  opacity: 0;
  ${({ opened }) =>
    !opened
      ? css`
          animation: ${showElement} 0.3s ease-in;
        `
      : ""}
  animation-delay:0.6s;
  animation-fill-mode: forwards;
`;

const paddingMap = {
  medium: "20px",
  small: "30px",
  large: "14px",
};

export const FloatingTrigger = (props: {
  icon?: string;
  opened: boolean;
  size?: "large" | "medium" | "small";
  onToggleBot: (toggled: boolean) => void;
}) => {
  const size = props.size || "medium";
  const padding = paddingMap[size] || "15px";
  const theme: IBotThemableProps = React.useContext(ThemeContext)
    .bot as IBotThemableProps;

  if (props.opened) {
    return null;
  }

  return (
    <Box fill justify="center">
      <StyledTriggerButton
        icon={
          <Avatar
            size={size}
            src={props.icon || theme.botAvatar}
            round="large"
          />
        }
        opened={props.opened}
        padding={padding}
        onClick={() => props.onToggleBot(!props.opened)}
      ></StyledTriggerButton>
    </Box>
  );
};
