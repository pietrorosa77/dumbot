import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { Avatar, Box } from "grommet";
import { FormClose, LinkPrevious, Rewind } from "grommet-icons";
import { ActionButtonBot } from "./BotButtons";
export interface IBotHeaderProps {
  allowClose?: boolean;
  onClose: () => void;
  isEnd: boolean;
  interactive: boolean;
  onBack: () => void;
}

const Header = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.global.colors.botHeaderBgColor};
  color: ${({ theme }) => theme.global.colors.botHeaderFontColor};
  display: flex;
  height: ${({ theme }) => theme.bot.headerHeight};
  justify-content: space-between;
  padding: 0 10px;
`;

const HeaderTitle = styled.h2`
  margin-left: 10px;
  flex: 1;
`;

export const BotHeader = (props: IBotHeaderProps) => {
  const theme = React.useContext(ThemeContext);
  const Icon = props.isEnd ? Rewind : LinkPrevious;
  return (
    <Header className="rsc-header">
      <Avatar
        src={theme.bot.headerLogo}
        style={{ backgroundColor: theme.global.colors.botHeaderLogoBgColor }}
        size={theme.bot.headerLogoSize}
      />
      <HeaderTitle className="rsc-header-title">
        <Box
          align={theme.bot.headerTextAlign}
          style={{ fontSize: theme.bot.headerFontSize }}
        >
          {theme.bot.headerText}
        </Box>
      </HeaderTitle>
      {(props.interactive || props.isEnd) && (
        <ActionButtonBot
          icon={<Icon size="small" />}
          onClick={props.onBack}
          size="small"
          bgColor="botBackButtonBgColor"
          fontColor="botBackButtonFontColor"
          tip="Go back!"
        />
      )}
      {props.allowClose && (
        <ActionButtonBot
          onClick={props.onClose}
          fontColor="botCloseButtonFontColor"
          bgColor="botCloseButtonBgColor"
          icon={<FormClose size="small" />}
          size="small"
          style={{ marginLeft: "5px" }}
        />
      )}
    </Header>
  );
};
