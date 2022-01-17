import { Box } from "grommet";
import { LinkPrevious, Rewind } from "grommet-icons";
import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { ActionButtonBot } from "./BotButtons";
import { IBotThemableProps } from "./definitions";

export interface IBotFooterProps {
  isEnd: boolean;
  interactive: boolean;
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
`;

export const BotFooter = (props: IBotFooterProps) => {
  const theme = React.useContext(ThemeContext).bot as IBotThemableProps;

  const Icon = props.isEnd ? Rewind : LinkPrevious;

  return (
    <Footer className="rsc-header">
      <Box flex="grow">
        <Box
          align={theme.footerTextAlign}
          style={{ fontSize: theme.footerFontSize }}
        >
          {theme.footerText}
        </Box>
      </Box>
      {((props.isEnd && theme.allowRestartOnEnd) || props.interactive) && (
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
