import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import {
  IBotThemableColors,
  IBotThemableProps,
  IDmbtMessage,
} from "./definitions";
import { MarkdownView } from "./MarkdownView";
import {
  AvatarContainer,
  BotAvatar,
  Bubble,
  MessageBoubbleContent,
} from "./MessageBoubble";

export interface IMessageProps {
  message: IDmbtMessage;
  active?: boolean;
}

export const Message = (props: IMessageProps) => {
  const themeContext = React.useContext(ThemeContext);
  const theme: IBotThemableProps = themeContext.bot as IBotThemableProps;
  const themeColors = themeContext.global.colors as IBotThemableColors;
  const [forceHideAvatars, setForceHideAvatars] = React.useState(false);
  const showavatar = theme.disableAvatars ? false : true;
  const metadata = props.message.meta;
  const isUser = metadata.isUser;

  const avatar =
    metadata.avatarSrc || (isUser ? theme.userAvatar : theme.botAvatar);
  const boubbleBgColor =
    metadata?.bgColor ||
    (isUser ? themeColors.botUserBubbleColor : themeColors.botBubbleColor);
  const boubbleColor = metadata?.color;
  const nickName =
    metadata?.nickname || (isUser ? theme.userNick : theme.dumbotNick);
  const nicknameColor =
    metadata?.nicknameColor ||
    (isUser ? themeColors.botBubbleColor : themeColors.botFocusColor);
  const messageWidth = metadata?.width;
  const direction = isUser ? "row-reverse" : "row";
  const justifyContent = isUser ? "end" : "start";
  const className = isUser ? "message-part-user" : "message-part-bot";

  React.useEffect(() => {
    console.log("rerendering", props.message.id);
  }, [true]);

  React.useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${themeContext.global.breakpoints.onlyMessages.value}px)`
    );
    setForceHideAvatars(mq.matches);
    function checkSmallScreen(e: MediaQueryListEvent) {
      if (e.matches) {
        /* the viewport is onlyMessages pixels wide or less */
        setForceHideAvatars(true);
      } else {
        /* the viewport is more than onlyMessages pixels wide */
        setForceHideAvatars(false);
      }
    }

    mq.addEventListener("change", checkSmallScreen);

    return () => {
      mq.removeEventListener("change", checkSmallScreen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  return (
    <Box
      direction={direction}
      align="end"
      pad="xsmall"
      alignSelf="end"
      alignContent="end"
      gap="medium"
      style={{
        justifyContent,
        outline: "none",
      }}
      className={`message-part ${className}`}
    >
      {showavatar && !forceHideAvatars && (
        <AvatarContainer>
          <BotAvatar
            user={!!isUser}
            active={!!props.active}
            src={avatar}
            size={theme.avatarSize}
            stay={!!metadata.hasAvatar}
          />
        </AvatarContainer>
      )}
      <Bubble
        user={!!isUser}
        color={boubbleColor}
        background={boubbleBgColor}
        className="dmbt-bubble"
        active={!!props.active}
        hasAvatar={!!metadata.hasAvatar && showavatar}
        width={forceHideAvatars ? "100%" : messageWidth}
        maxWidth={forceHideAvatars ? "100%" : messageWidth}
      >
        <MessageBoubbleContent
          nickname={nickName}
          time={metadata.time as string}
          nicknameColor={nicknameColor}
          showClock={theme.avatarClock}
        >
          <MarkdownView
            text={props.message.content || props.message.output.value}
          />
        </MessageBoubbleContent>
      </Bubble>
    </Box>
  );
};
