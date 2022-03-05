import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import {
  IBotThemableColors,
  IBotThemableProps,
  IDisplayResponseProps,
  IDmbtMessage,
} from "./definitions";
import { ArrayAnswerDisplay } from "./display/ArrayDisplay";
import { ColorAnswerDisplay } from "./display/ColorDisplay";
import { JsonObjectDisplay } from "./display/JsonDisplay";
import { ObjectAnswerDisplay } from "./display/ObjectDisplay";
import { PasswordAnswerDisplay } from "./display/PasswordDisplay";
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
  customMessageDisplay: Map<
    string,
    (props: { message: IDmbtMessage }) => JSX.Element
  >;
}

const DisplayMessageMap = new Map<
  string,
  (props: IDisplayResponseProps) => JSX.Element
>([
  ["array", ArrayAnswerDisplay],
  ["object", ObjectAnswerDisplay],
  ["json", JsonObjectDisplay],
  ["color", ColorAnswerDisplay],
  ["password", PasswordAnswerDisplay],
]);

export const Message = (props: IMessageProps) => {
  const themeContext = React.useContext(ThemeContext);
  const theme: IBotThemableProps = themeContext.bot as IBotThemableProps;
  const [forceHideAvatars, setForceHideAvatars] = React.useState(false);
  const showavatar = theme.disableAvatars ? false : true;
  const metadata = props.message.meta;
  const isUser = metadata.isUser;

  const avatar =
    metadata.avatarSrc || (isUser ? theme.userAvatar : theme.botAvatar);
  const boubbleBgColor =
    metadata?.bgColor || (isUser ? "botUserBubbleColor" : "brand");

  const nickName =
    metadata?.nickname || (isUser ? theme.userNick : theme.dumbotNick);
  const messageWidth = metadata?.width;
  const direction = isUser ? "row-reverse" : "row";
  const justifyContent = isUser ? "end" : "start";
  const className = isUser ? "message-part-user" : "message-part-bot";

  React.useEffect(() => {
    console.log("Mounting", props.message.id);
  }, [props.message.id]);

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

  const Display =
    props.customMessageDisplay.get(props.message.output.type) ||
    DisplayMessageMap.get(props.message.output.type);

  return (
    <Box
      direction={direction}
      align="start"
      pad="xsmall"
      alignSelf="end"
      alignContent="end"
      gap="medium"
      style={{
        justifyContent,
        outline: "none",
      }}
      margin={{ top: "5px" }}
      className={`message-part ${className}`}
    >
      {showavatar && !forceHideAvatars && (
        <AvatarContainer className="dmbt-avatar-container">
          <BotAvatar
            className="dmbt-avatar"
            user={!!isUser}
            active={!!props.active}
            src={avatar}
            leading={!!metadata.leaingGroup}
            stay={!!metadata.hasAvatar}
            bgColor={
              isUser
                ? themeContext.global.colors["brand"]
                : themeContext.global.colors["botUserBubbleColor"]
            }
          />
        </AvatarContainer>
      )}
      <Bubble
        user={!!isUser}
        background={boubbleBgColor}
        className="dmbt-bubble "
        active={!!props.active}
        hasAvatar={!!metadata.hasAvatar && showavatar}
        width={forceHideAvatars ? "100%" : messageWidth}
        maxWidth={forceHideAvatars ? "100%" : messageWidth}
      >
        <MessageBoubbleContent
          nickname={nickName}
          time={metadata.time as string}
          // nicknameColor={nicknameColor}
          showClock={theme.avatarClock}
          clockSide={isUser ? "start" : "end"}
        >
          {Display && <Display message={props.message} theme={themeContext} />}
          {!Display && (
            <MarkdownView
              text={props.message.content || props.message.output.value}
            />
          )}
        </MessageBoubbleContent>
      </Bubble>
    </Box>
  );
};
