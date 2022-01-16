import { Avatar, Box, Clock } from "grommet";
import styled, { css, keyframes } from "styled-components";

export const scale = keyframes`
  100% { transform: scale(1); }
`;

export const Bubble = styled(Box)<{
  user: boolean;
  hasAvatar: boolean;
  active: boolean;
  width?: string;
  maxWidth?: string;
  color?: string;
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
  color: ${(props) =>
    props.color ||
    (props.user
      ? props.theme.global.colors.botUserFontColor
      : props.theme.global.colors.botFontColor)};
  padding: ${(props) => props.theme.bot.bubblePadding};
  animation: ${(props: any) =>
    props.active
      ? css`
          ${scale} ${props.theme.bot.bubbleAnimationDuration} ease forwards
        `
      : "none"};

  transform: ${(props) => (props.active ? "scale(0)" : "none")};
`;

export const AvatarContainer = styled.div`
  max-width: ${(props) => props.theme.bot.avatarSize};
`;

export const BotAvatar = styled(Avatar)<{
  user: boolean;
  active: boolean;
  stay: boolean;
}>`
  background-color: ${(props) =>
    props.user
      ? props.theme.global.colors.botUserAvatarBg
      : props.theme.global.colors.botAvatarBg};
  border-radius: ${(props) => (props.user ? "50% 50% 50% 0" : "50% 50% 0 50%")};
  box-shadow: ${(props) => props.theme.bot.bubbleBoxShadow};
  padding: 3px;
  animation: ${(props: any) =>
    props.active
      ? css`
          ${scale} ${props.theme.bot.bubbleAnimationDuration} ease forwards
        `
      : "none"};

  transform: ${(props) => (!props.stay ? "scale(0)" : "none")};
`;

export const MessageBoubbleContent = (props: {
  nickname?: string;
  nicknameColor?: string;
  children: any;
  showClock?: boolean;
  time: string;
}) => {
  return (
    <Box direction="column">
      {props.nickname && (
        <Box direction="row" style={{ color: props.nicknameColor }}>
          {props.nickname}
        </Box>
      )}
      <Box direction="row">
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            overflowWrap: "break-word",
          }}
        >
          {props.children}
        </div>
        {props.showClock && (
          <Box pad="none" justify="end">
            <Clock
              type="digital"
              precision="minutes"
              run={false}
              time={props.time}
              alignSelf="end"
              size="xsmall"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
