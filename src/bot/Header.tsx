import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { Avatar, Box } from "grommet";
import { ActionButtonBot } from "./ActionButtonBot";
import { FormClose } from "grommet-icons";
export interface IBotHeaderProps {
  allowClose?: boolean;
  onClose: () => void;
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
  font-size: ${({ theme }) => theme.bot.headerFontSize};
`;

export const BotHeader = (props: IBotHeaderProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <Header className="rsc-header">
      <Avatar
        src={theme.bot.headerLogo}
        style={{ backgroundColor: theme.global.colors.botHeaderLogoBgColor }}
        size={theme.bot.headerLogoSize}
      />
      <HeaderTitle className="rsc-header-title">
        <Box align={theme.bot.headerTextAlign}>{theme.bot.headerText}</Box>
      </HeaderTitle>
      {props.allowClose && (
        <ActionButtonBot
          onClick={props.onClose}
          fontColor="botCloseButtonFontColor"
          bgColor="botCloseButtonBgColor"
          icon={<FormClose size="small" />}
          size="small"
        />
      )}
    </Header>
  );
};
