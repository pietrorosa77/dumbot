import { Box } from "grommet";
import styled, { css, keyframes } from "styled-components";

const showElement = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const ChatBotContainerStyled = styled.div`
  background: transparent;
  overflow: hidden;
  position: fixed;
  bottom: 0px;
  right: 0px;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  display: flex;
  ${css`
    animation: ${showElement} 0.3s ease-in;
  `}
  animation-delay:0.6s;
  animation-fill-mode: forwards;
`;

const ChatBotContentWrpper = styled.div`
  background: ${({ theme }) => theme.global.colors.botBackground};
  height: 100%;
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  .dumbot-scrollable-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scroll-behaviour: smooth;
    &:focus {
      outline: none;
    }
    .dmbt-interaction-container {
      &:focus {
        outline: 3px solid ${({ theme }) => theme.global.colors.focus};
      }
    }
    scrollbar-width: none;
    /* this will hide the scrollbar in mozilla based browsers */
    overflow: -moz-scrollbars-none;
    /* this will hide the scrollbar in internet explorers */
    -ms-overflow-style: none;
  }

  .dumbot-scrollable-container::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
`;

const BotGrid = styled.div`
  display: grid;
  margin: 0 10px;
  height: 100%;
  grid-template-columns:
    1fr minmax(
      ${(props) =>
        `${props.theme.bot.minBotColumnSize},${props.theme.bot.maxBotColumnSize}`}
    )
    1fr;
  align-items: stretch;
  justify-items: stretch;
`;

export const ChatBotOuterContainer = (props: { children: any }) => {
  return (
    <ChatBotContainerStyled>
      <Box
        className="dumbot-innerContainer"
        direction="row"
        overflow="hidden"
        width="100%"
        height="100%"
      >
        <Box direction="column" overflow="hidden" width="100%" height="100%">
          {props.children}
        </Box>
      </Box>
    </ChatBotContainerStyled>
  );
};

export const ChatbotContent = (props: { children: any; id: string }) => {
  return (
    <ChatBotContentWrpper>
      <div className="dumbot-scrollable-container" id={props.id}>
        <BotGrid>
          <div style={{ gridColumn: 1 }}></div>
          <div style={{ gridColumn: 2, position: "relative" }}>
            {props.children}
          </div>
          <div style={{ gridColumn: 3 }}></div>
        </BotGrid>
      </div>
    </ChatBotContentWrpper>
  );
};

// used to surround input controls
export const HoveredContainer = styled(Box)<{
  hoverBorderColor: string;
}>`
  &:hover {
    border-color: ${(props) => props.hoverBorderColor};
  }
`;
