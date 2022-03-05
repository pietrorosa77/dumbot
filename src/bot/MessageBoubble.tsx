import { Avatar, Box, Clock } from "grommet";
import styled, { css, keyframes } from "styled-components";

export const Bubble = styled(Box)<{
  user: boolean;
  hasAvatar: boolean;
  active: boolean;
  width?: string;
  maxWidth?: string;
}>`
  display: inline-block;
  overflow: hidden;
  overflow-wrap: break-word;
  position: relative;
  font-size: ${(props) => props.theme.bot.bubbleFontSize};
  min-width: 150px;
  max-width: ${(props) => props.maxWidth || props.theme.bot.bubbleMaxWidth};
  width: ${(props) =>
    props.width ? props.width : props.theme.bot.bubbleWidth || "unset"};

  border-radius: ${(props) => {
    const rd = props.theme.bot.bubblePxRadius;
    if (props.hasAvatar) {
      return props.user ? `${rd} ${rd} 0 ${rd}` : `${rd} ${rd} ${rd} 0`;
    }

    return rd;
  }};
  box-shadow: ${(props) => props.theme.bot.bubbleBoxShadow};
  color: ${(props) => props.color};
  padding: ${(props) => props.theme.bot.bubblePadding};
  animation: ${(props: any) =>
    props.active
      ? css`
          ${keyframes`
          100% { opacity: 1; }
        `} ${props.theme.bot.bubbleAnimationDuration} ease-in forwards
        `
      : "none"};

  opacity: ${(props) => (props.active ? "0" : "1")};
`;

export const AvatarContainer = styled.div`
  width: ${(props) => props.theme.bot.avatarSize}px;
  max-width: ${(props) => props.theme.bot.avatarSize}px;
  min-width: ${(props) => props.theme.bot.avatarSize}px;
  align-self: stretch;
  position: relative;
`;

export const BotAvatar = styled(Avatar)<{
  user: boolean;
  active: boolean;
  stay: boolean;
  leading: boolean;
  bgColor: string;
}>`
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => (props.user ? "50% 50% 50% 0" : "50% 50% 0 50%")};
  box-shadow: ${(props) => props.theme.bot.bubbleBoxShadow};
  padding: 3px;
  width: ${(props) => props.theme.bot.avatarSize}px;
  height: ${(props) => props.theme.bot.avatarSize}px;
  display: ${(props) => (props.stay ? "flex" : "none")};
  top: ${(props) =>
    props.leading ? `calc( 100% - ${props.theme.bot.avatarSize}px )` : "0"};
  position: absolute;
  animation: ${(props: any) =>
    props.stay && !props.leading
      ? css`
          ${keyframes`
          from {
            top: 0px;
          }
          to {
            opacity: 1;
            top: calc( 100% - ${props.theme.bot.avatarSize}px );
          }
      `} ${props.theme.bot.bubbleAnimationDuration} ease-in forwards
        `
      : "none"};
`;

export const MessageBoubbleContent = (props: {
  nickname?: string;
  // nicknameColor?: string;
  children: any;
  showClock?: boolean;
  time: string;
  clockSide: "start" | "end";
}) => {
  return (
    <Box direction="column" className="dumbot-content-body">
      {props.nickname && <Box direction="row">{props.nickname}</Box>}
      <Box gap="xsmall">
        <div
          style={{
            flex: 1,
            overflowX: "auto",
            overflowWrap: "break-word",
          }}
        >
          {props.children}
        </div>
        {props.showClock && (
          <Box pad="none">
            <Clock
              type="digital"
              precision="minutes"
              run={false}
              time={props.time}
              alignSelf={props.clockSide}
              size="xsmall"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
