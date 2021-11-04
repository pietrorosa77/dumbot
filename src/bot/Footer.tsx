import { Box } from "grommet";
import { LinkPrevious, Rewind } from "grommet-icons";
import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { ActionButtonBot } from "./ActionButtonBot";
import { IBotThemableProps } from "./definitions";

export interface IBotFooterProps {
  isEnd: boolean;
  waitingForUser: boolean;
  onBack: () => void;
}

const Footer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.global.colors.botFooterBgColor};
  color: ${({ theme }) => theme.global.colors.botFooterFontColor};
  display: flex;

  height: ${({ theme }) => theme.bot.footerHeight};
  justify-content: center;
  padding: 0 10px;
  font-size: ${({ theme }) => theme.bot.footerFontSize};
`;

export const BotFooter = (props: IBotFooterProps) => {
  const theme = React.useContext(ThemeContext).bot as IBotThemableProps;
  const Icon = props.isEnd ? Rewind : LinkPrevious;

  return (
    <Footer className="rsc-header">
      <Box flex="grow">
        <Box align={theme.footerTextAlign}>{theme.footerText}</Box>
      </Box>
      {((props.isEnd && theme.allowRestartOnEnd) || props.waitingForUser) && (
        <ActionButtonBot
          icon={<Icon size="small" />}
          onClick={props.onBack}
          size="small"
          bgColor="botBackButtonBgColor"
          fontColor="botBackButtonFontColor"
          tip="Go back!"
        />
      )}
    </Footer>
  );
};
