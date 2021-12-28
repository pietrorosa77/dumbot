import { Box, Avatar, Clock, ResponsiveContext } from "grommet";
import * as React from "react";
import styled, { css, keyframes, ThemeContext } from "styled-components";
import BotContext from "./BotContext";
import {
  BUBBLE_DELIMITER,
  IBotState,
  IBotThemableProps,
  IMessage,
} from "./definitions";
import { UserAnswer } from "./interactions/UserAnswerDisplay";
import { LoadingMessage } from "./LoadingMessage";
import { MarkdownView } from "./MarkdownView";

type IMessageProps = {
  message: IMessage;
  onProcessed?: () => void;
  active: boolean;
};

const scale = keyframes`
  100% { transform: scale(1); }
`;

const AvatarContainer = styled.div`
  max-width: ${(props) => props.theme.bot.avatarSize};
`;

const BotAvatar = styled(Avatar)<{
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

export const Bubble = styled.div<{
  user: boolean;
  hasAvatar: boolean;
  active: boolean;
  width?: string;
  maxWidth?: string;
}>`
  display: inline-block;
  overflow: hidden;
  position: relative;
  font-size: ${(props) => props.theme.bot.bubbleFontSize};
  max-width: ${(props) => props.maxWidth || props.theme.bot.bubbleMaxWidth};
  width: ${(props) =>
    props.width ? props.width : props.theme.bot.bubbleWidth || "unset"};
  background: ${(props) =>
    props.user
      ? props.theme.global.colors.botUserBubbleColor
      : props.theme.global.colors.botBubbleColor};
  border-radius: ${(props) => {
    const rd = props.theme.bot.bubblePxRadius;
    if (props.hasAvatar) {
      return props.user ? `${rd} ${rd} 0 ${rd}` : `${rd} ${rd} ${rd} 0`;
    }

    return rd;
  }};
  box-shadow: ${(props) => props.theme.bot.bubbleBoxShadow};
  color: ${(props) =>
    props.user
      ? props.theme.global.colors.botUserFontColor
      : props.theme.global.colors.botFontColor};
  padding: ${(props) => props.theme.bot.bubblePadding};
  animation: ${(props: any) =>
    props.active
      ? css`
          ${scale} ${props.theme.bot.bubbleAnimationDuration} ease forwards
        `
      : "none"};

  transform: ${(props) => (props.active ? "scale(0)" : "none")};
`;

export const MessagePartContainer = React.forwardRef(
  (
    props: {
      user: boolean;
      active: boolean;
      hasAvatar: boolean;
      children: any;
      foceLoading?: boolean;
      width?: string;
      maxWidth?: string;
      customAvatarSrc?: string;
    },
    refEl: any
  ) => {
    const theme = React.useContext(ThemeContext);
    const botProps: IBotThemableProps = theme.bot;
    const showavatar = botProps.disableAvatars ? false : true;
    const { user, active, hasAvatar } = props;
    const avatar =
      props.customAvatarSrc || user ? botProps.userAvatar : botProps.botAvatar;
    const hasClock = botProps.avatarClock;
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
                    size={botProps.avatarSize}
                    stay={hasAvatar}
                  />
                  {hasAvatar && hasClock && (
                    <Clock
                      type="digital"
                      run={false}
                      style={{
                        color: theme.global.colors.botAvatarClockFontColor,
                      }}
                      width={botProps.avatarSize}
                      size="xsmall"
                      margin={{ top: "xsmall" }}
                    />
                  )}
                </AvatarContainer>
              )}
              <Bubble
                user={user}
                className="dmbt-bubble"
                active={active}
                hasAvatar={hasAvatar && showavatar}
                width={forceHideAvatars ? "100%" : props.width}
                maxWidth={forceHideAvatars ? "100%" : props.maxWidth}
              >
                {props.children}
              </Bubble>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  }
);
MessagePartContainer.displayName = "MessagePartContainer";

const USERANSWER = "<USERANSWER/>";
export const getContentForMessage = (
  message: IMessage,
  viewSilentNodes: boolean
) => {
  if (message.silent && !viewSilentNodes) {
    return "";
  }

  if (message.user && message.output) {
    return USERANSWER;
  }

  return message.nodeContent;
};

const MessagePart = (
  props: IMessageProps & {
    hasAvatar: boolean;
    onLoaded: (ref: React.RefObject<any>) => void;
    forceLoading?: boolean;
    content: string;
    customAvatarSrc?: string;
  }
) => {
  const theme: IBotThemableProps = React.useContext(ThemeContext)
    .bot as IBotThemableProps;
  const botContext: IBotState = React.useContext(BotContext);
  const showavatar = theme.disableAvatars ? false : true;
  const messageDelay = theme.messageDelay || 1000;
  const { onProcessed, active, hasAvatar } = props;
  const refEl = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(active);
  // 0 means the node will be processed, 2 it's been already processed, 1 processed should notify parent
  const [processed, setProcessed] = React.useState<0 | 1 | 2>(active ? 0 : 2);
  const { user, output } = props.message;
  const propsOnLoaded = props.onLoaded;

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

  const Loading = loading || props.forceLoading ? <LoadingMessage /> : null;
  const MessageDisplay = loading ? null : props.content === USERANSWER ? (
    <UserAnswer
      answer={output || { value: "", type: "string" }}
      variables={botContext.variables}
    />
  ) : (
    <MarkdownView text={props.content} variables={botContext.variables} />
  );

  return (
    <MessagePartContainer
      active={active}
      hasAvatar={hasAvatar && showavatar}
      ref={refEl}
      user={user}
      customAvatarSrc={props.customAvatarSrc}
    >
      {Loading}
      {MessageDisplay}
    </MessagePartContainer>
  );
};

export const Message = (
  props: IMessageProps & {
    onLoaded?: (ref: React.RefObject<any>) => void;
    viewSilentNodes: boolean;
    customAvatarSrc?: string;
  }
) => {
  const { message, onProcessed, active } = props;
  const msgContent = getContentForMessage(message, props.viewSilentNodes);
  const messageParts: (IMessage & { content: string })[] = (msgContent || "")
    .split(BUBBLE_DELIMITER)
    .filter((el: string) => el)
    .map((mesagePart) => ({
      ...message,
      content: mesagePart,
    }));

  const [activeIndex, setActiveIndex] = React.useState(
    active ? 0 : messageParts.length
  );
  const processed = messageParts.filter((c, i) => i < activeIndex);
  const current = messageParts[activeIndex];

  const onPartProcessed = () => {
    setActiveIndex(activeIndex + 1);
  };

  React.useEffect(() => {
    if (!current && onProcessed) {
      onProcessed();
    }
  }, [current, onProcessed]);

  const hasAvatar = (part: IMessage, index?: number) => {
    return (
      part.user ||
      messageParts.length === 1 ||
      (part.user && index === messageParts.length - 1)
    );
  };

  const style = message.user
    ? { marginTop: "10px", marginBottom: "10px" }
    : undefined;

  return (
    <div className="message-group" data-nodeid={message.nodeId} style={style}>
      {processed.map((part, i) => (
        <MessagePart
          key={`${part.id}-${i}`}
          message={part}
          content={part.content}
          active={false}
          onLoaded={props.onLoaded || (() => null)}
          hasAvatar={hasAvatar(part, i)}
          customAvatarSrc={props.customAvatarSrc}
        />
      ))}
      {current && (
        <MessagePart
          message={current}
          onLoaded={props.onLoaded || (() => null)}
          key={`${current.id}-${activeIndex}`}
          onProcessed={onPartProcessed}
          active={true}
          content={(current as any).content}
          hasAvatar={hasAvatar(current)}
          customAvatarSrc={props.customAvatarSrc}
        />
      )}
    </div>
  );
};
