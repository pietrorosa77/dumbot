import React, { LegacyRef } from "react";
import styled from "styled-components";

export interface IBotContainer {
  opened: boolean;
}

export const ChatBotContainer = styled.div<IBotContainer>`
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
  display: ${({ opened }) => (opened ? "flex" : "none")};
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

export const ChatbotContent = React.forwardRef(
  (
    props: { children: any; },
    contentRef: LegacyRef<HTMLDivElement>
  ) => {
    return (
      <ChatBotContentWrpper>
        <div
          ref={contentRef}
          tabIndex={0}
          className="dumbot-scrollable-container"
        >
          {props.children}
        </div>
      </ChatBotContentWrpper>
    );
  }
);
ChatbotContent.displayName = "ChatbotContent";

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
export const BotLayout = (props: any) => (
  <BotGrid>
    <div style={{ gridColumn: 1 }}></div>
    <div style={{ gridColumn: 2, position: "relative" }}>{props.children}</div>
    <div style={{ gridColumn: 3 }}></div>
  </BotGrid>
);
