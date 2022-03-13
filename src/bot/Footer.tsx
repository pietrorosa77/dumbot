import { Box, Button } from "grommet";
import { LinkPrevious, Cycle } from "grommet-icons";
import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { IBotThemableProps } from "./definitions";

export interface IBotFooterProps {
  isEnd: boolean;
  interactive: boolean;
  onBack: () => void;
}

const Footer = styled(Box)`
  align-items: center;
  display: flex;
  min-height: ${({ theme }) => theme.bot.footerHeight};
  justify-content: center;
  padding: 10px;
`;

export const BotFooter = (props: IBotFooterProps) => {
  const theme = React.useContext(ThemeContext).bot as IBotThemableProps;

  const Icon = props.isEnd ? Cycle : LinkPrevious;

  return (
    <Footer className="rsc-header" direction="row" background="brand">
      <Box flex="grow">
        <Box align={theme.footerTextAlign} style={{ fontSize: "0.7em" }}>
          {theme.footerText}
        </Box>
      </Box>
      {((props.isEnd && theme.allowRestartOnEnd) || props.interactive) && (
        <Button
          icon={<Icon />}
          plain
          onClick={props.onBack}
          size="small"
          primary
          tip="Go back"
          hoverIndicator
          style={{
            padding: "0.8rem",
          }}
        />
      )}
    </Footer>
  );
};
