import React from "react";
import { BUBBLE_DELIMITER, IMessage, USERANSWER } from "../definitions";
import { MessagePart } from "./MessagePart";

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

interface IMessagePartCollectionProps {
  message: IMessage;
  onProcessed?: () => void;
  active: boolean;
  onLoaded?: (ref: React.RefObject<any>) => void;
  viewSilentNodes: boolean;
}

export const Message = (props: IMessagePartCollectionProps) => {
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
  const processed = active
    ? messageParts.filter((c, i) => i < activeIndex)
    : messageParts;
  const current = active ? messageParts[activeIndex] : null;

  const onPartProcessed = () => {
    setActiveIndex(activeIndex + 1);
  };

  React.useEffect(() => {
    if (!current && onProcessed) {
      onProcessed();
    }
  }, [current, onProcessed]);

  const hasAvatar = (part: IMessage, index?: number) => {
    return messageParts.length === 1 || index === messageParts.length - 1;
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
        />
      ))}
      {current && (
        <MessagePart
          message={current}
          content={current.content}
          onLoaded={props.onLoaded || (() => null)}
          key={`${current.id}-${activeIndex}`}
          onProcessed={onPartProcessed}
          active={true}
          hasAvatar={hasAvatar(current)}
        />
      )}
    </div>
  );
};
