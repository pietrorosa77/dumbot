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
  transform: ${({ opened }) => (opened ? "scale(1)" : "scale(0)")};
  transition: transform 0.3s ease;
`;

const ChatBotContentWrpper = styled.div`
  background: ${({ theme }) => theme.global.colors.botBackground};
  height: 100%;
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  .dumbot-scrollable-container {
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
    props: { children: any; opened: boolean },
    contentRef: LegacyRef<HTMLDivElement>
  ) => {
    const style: React.CSSProperties = {
      width: "100%",
      height: "100%",
      overflowY: "auto",
      scrollBehavior: "smooth",
    };

    return (
      <ChatBotContentWrpper>
        <div
          className="dumbot-scrollable-container"
          tabIndex={0}
          style={style}
          ref={contentRef}
        >
          {props.opened ? props.children : null}
        </div>
      </ChatBotContentWrpper>
    );
  }
);
ChatbotContent.displayName = "ChatbotContent";

const BotGrid = styled.div`
  display: grid;
  margin: 20px;
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
    <div style={{ height: "200px", gridColumn: 1 }}></div>
    <div style={{ gridColumn: 2 }}>{props.children}</div>
    <div style={{ gridColumn: 3 }}></div>
  </BotGrid>
);
