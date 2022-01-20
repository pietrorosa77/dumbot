import { Button } from "grommet";
import styled from "styled-components";
import { ThemeContext } from "grommet";
import { Attachment } from "grommet-icons";
import * as React from "react";
import { ChangeEvent } from "react";
import { IBotThemableColors, IBotTheme } from "./definitions";

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

export const BotInteractionButton = styled(Button)<{
  onlyIcon: boolean;
  selected: boolean;
}>`
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

export const SubmitButton = styled(Button)<{
  hoverColor: string;
}>`
  &:hover {
    svg {
      fill: ${(props) => (!props.disabled ? props.hoverColor : undefined)};
      stroke: ${(props) => (!props.disabled ? props.hoverColor : undefined)};
    }
  }
`;

export const UploadFileButton = (props: {
  onSelectFiles: (files: FileList | null) => void;
  loading?: boolean;
  multiple?: boolean;
  accept?: string;
}) => {
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const botColors = theme.global?.colors as IBotThemableColors;
  const botFocusColor = botColors.botFocusColor;
  const simpleColor = botColors.botBubbleColor as string;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    props.onSelectFiles(files);
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        accept={props.accept}
        onChange={onChange}
        multiple={props.multiple}
        style={{ display: "none" }}
      />
      <SubmitButton
        icon={<Attachment />}
        hoverColor={botFocusColor}
        size="small"
        disabled={props.loading}
        color={simpleColor}
        a11yTitle="attach file"
        tip={"upload file"}
        focusIndicator={false}
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
      ></SubmitButton>
    </>
  );
};
