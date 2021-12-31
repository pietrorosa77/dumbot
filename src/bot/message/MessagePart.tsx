import { Box, ResponsiveContext } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import { MarkdownView } from "..";
import BotContext from "../BotContext";
import {
  IBotState,
  IBotThemableColors,
  IBotThemableProps,
  IMessage,
  USERANSWER,
} from "../definitions";
import { UserAnswer } from "../interactions/UserAnswerDisplay";
import { LoadingMessage } from "../LoadingMessage";
import {
  AvatarContainer,
  BotAvatar,
  Bubble,
  MessageBoubbleContent,
} from "./MessageBoubble";

interface IMessagePartProps {
  message: IMessage;
  content: string;
  onProcessed?: () => void;
  active: boolean;
  hasAvatar: boolean;
  onLoaded: (ref: React.RefObject<any>) => void;
  width?: string;
  maxWidth?: string;
}
export const MessagePart = (props: IMessagePartProps) => {
  const themeContext = React.useContext(ThemeContext);
  const theme: IBotThemableProps = themeContext.bot as IBotThemableProps;
  const themeColors = themeContext.global.colors as IBotThemableColors;
  const botContext: IBotState = React.useContext(BotContext);
  const showavatar = theme.disableAvatars ? false : true;
  const messageDelay = theme.messageDelay || 1000;
  const { onProcessed, active, hasAvatar } = props;
  const refEl = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(active);
  // 0 means the node will be processed, 2 it's been already processed, 1 processed should notify parent
  const [processed, setProcessed] = React.useState<0 | 1 | 2>(active ? 0 : 2);
  const { user, output, chatMetadata } = props.message;
  const propsOnLoaded = props.onLoaded;

  // message cosmetics
  const avatar =
    chatMetadata?.avatarSrc || (user ? theme.userAvatar : theme.botAvatar);
  const boubbleBgColor = chatMetadata?.bgColor;
  const boubbleColor = chatMetadata?.color;
  const nickName =
    chatMetadata?.nickname || (user ? theme.userNick : theme.dumbotNick);
  const nicknameColor =
    chatMetadata?.nicknameColor ||
    (user ? themeColors.botBubbleColor : themeColors.botFocusColor);

  React.useEffect(() => {
    let timer: any = 0;
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
        // processed state to 1 means notify parents
        setProcessed(1);
      }, messageDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loading, messageDelay]);

  React.useEffect(() => {
    if (processed !== 1) {
      return;
    }
    // processed state to 1 means notify parents
    if (onProcessed) {
      onProcessed();
      propsOnLoaded(refEl);
    }
  }, [processed, onProcessed, propsOnLoaded]);

  const MessageDisplay = loading ? null : props.content === USERANSWER ? (
    <UserAnswer
      answer={output || { value: "", type: "string" }}
      variables={botContext.variables}
    />
  ) : (
    <MarkdownView text={props.content} variables={botContext.variables} />
  );

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const forceHideAvatars = size === "onlyMessages";
        console.log("SIZE IS", size);
        return (
          <Box
            direction={user ? "row-reverse" : "row"}
            align="end"
            pad="xsmall"
            alignSelf="end"
            alignContent="end"
            gap="medium"
            ref={refEl}
            style={{
              justifyContent: user ? "end" : "start",
              outline: "none",
            }}
            className={`message-part ${
              user ? "message-part-user" : "message-part-bot"
            }`}
          >
            {showavatar && !forceHideAvatars && (
              <AvatarContainer>
                <BotAvatar
                  user={user}
                  active={active}
                  src={avatar}
                  size={theme.avatarSize}
                  stay={hasAvatar}
                />
              </AvatarContainer>
            )}
            <Bubble
              user={user}
              color={boubbleColor}
              bgColor={boubbleBgColor}
              className="dmbt-bubble"
              active={active}
              hasAvatar={hasAvatar && showavatar}
              width={forceHideAvatars ? "100%" : props.width}
              maxWidth={forceHideAvatars ? "100%" : props.maxWidth}
            >
              <MessageBoubbleContent
                nickname={nickName}
                nicknameColor={nicknameColor}
                showClock={theme.avatarClock}
                loading={loading}
              >
                {loading && <LoadingMessage />}
                {MessageDisplay}
              </MessageBoubbleContent>
            </Bubble>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};
