import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { Avatar, Box, Button } from "grommet";
import { FormClose, LinkPrevious, Rewind } from "grommet-icons";
export interface IBotHeaderProps {
  allowClose?: boolean;
  onClose: () => void;
  isEnd: boolean;
  interactive: boolean;
  onBack: () => void;
}

const Header = styled(Box)`
  align-items: center;
  display: flex;
  gap: 0.3em;
  min-height: ${({ theme }) => theme.bot.headerHeight};
  padding: 10px;
`;

const HeaderTitle = styled.div`
  flex: 1;
`;

export const BotHeader = (props: IBotHeaderProps) => {
  const theme = React.useContext(ThemeContext);
  const Icon = props.isEnd ? Rewind : LinkPrevious;
  const [hideLogo, setHideLogo] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${theme.global.breakpoints.onlyMessages.value}px)`
    );
    setHideLogo(mq.matches);
    function checkSmallScreen(e: MediaQueryListEvent) {
      if (e.matches) {
        /* the viewport is onlyMessages pixels wide or less */
        setHideLogo(true);
      } else {
        /* the viewport is more than onlyMessages pixels wide */
        setHideLogo(false);
      }
    }

    mq.addEventListener("change", checkSmallScreen);

    return () => {
      mq.removeEventListener("change", checkSmallScreen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);
  return (
    <Header className="rsc-header" direction="row" background="brand">
      {!hideLogo && (
        <Avatar
          src={theme.bot.headerLogo}
          size={theme.bot.headerLogoSize}
          style={{
            minWidth: theme.bot.headerLogoSize,
            maxWidth: theme.bot.headerLogoSize,
          }}
        />
      )}
      <HeaderTitle className="rsc-header-title">
        <Box align={theme.bot.headerTextAlign}>
          <h2>{theme.bot.headerText}</h2>
        </Box>
      </HeaderTitle>
      {(props.interactive || props.isEnd) && (
        <Button
          icon={<Icon />}
          plain
          onClick={props.onBack}
          size="small"
          primary
          hoverIndicator
          tip="Go back"
          style={{
            padding: "0.8rem",
          }}
        />
      )}
      {props.allowClose && (
        <Button
          icon={<FormClose />}
          plain
          onClick={props.onClose}
          size="small"
          primary
          hoverIndicator
          tip="Close"
          style={{
            padding: "0.8rem",
          }}
        />
      )}
    </Header>
  );
};
