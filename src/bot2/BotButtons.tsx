import { Button } from "grommet";
import styled from "styled-components";

export const ActionButtonBot = styled(Button)<{
  bgColor?: string;
  fontColor?: string;
  plain?: boolean;
  noOutline?: boolean;
  active?: boolean;
}>`
  background-color: ${(props) =>
    props.theme.global.colors[props.bgColor || "botBubbleColor"]};
  border: ${(props) =>
    !props.plain
      ? `2px solid ${
          props.theme.global.colors[props.fontColor || "botFontColor"]
        }`
      : "none"};
  border-radius: 50%;
  color: ${(props) =>
    props.theme.global.colors[props.fontColor || "botFontColor"]};
  svg {
    fill: ${(props) =>
      props.theme.global.colors[
        props.active ? "botFocusColor" : props.fontColor || "botFontColor"
      ]};
    stroke: ${(props) =>
      props.theme.global.colors[
        props.active ? "botFocusColor" : props.fontColor || "botFontColor"
      ]};
  }

  &: hover
    ${(props) =>
      props.disabled
        ? undefined
        : `
  {
    transform: scale(1.1);
    transition: 0.3s ease-out;
    box-shadow: ${
      props.noOutline
        ? "none"
        : `0 0 2px 2px ${props.theme.global.colors["botFocusColor"]}`
    };
    color: ${props.theme.global.colors["botFocusColor"]};
    opacity: 0.9;
    svg {
      fill: ${props.theme.global.colors["botFocusColor"]};
      stroke: ${props.theme.global.colors["botFocusColor"]};
    }
  }
  `};
`;

export const ActionButtonUser = styled(Button)`
  background-color: ${(props) =>
    props.theme.global.colors["botUserBubbleColor"]};
  border: 2px solid ${(props) => props.theme.global.colors["botUserFontColor"]};
  border-radius: 50%;
  border-radius: 50%;
  color: ${(props) => props.theme.global.colors["botUserFontColor"]};
  svg {
    fill: ${(props) => props.theme.global.colors["botUserFontColor"]};
    stroke: ${(props) => props.theme.global.colors["botUserFontColor"]};
  }

  &: hover
    ${(props) =>
      props.disabled
        ? undefined
        : `
  {
    transform: scale(1.1);
    transition: 0.3s ease-out;
    box-shadow: 0 0 2px 2px ${props.theme.global.colors["botFocusColor"]};
    color: ${props.theme.global.colors["botFocusColor"]};
    opacity: 0.9;
    svg {
      fill: ${props.theme.global.colors["botFocusColor"]};
      stroke: ${props.theme.global.colors["botFocusColor"]};
    }
  }
  `};
`;
