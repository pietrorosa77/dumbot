import * as React from "react";
import { BUBBLE_DELIMITER } from ".";
import { ICustomUserComponentAnswerProps, IMessage } from "./definitions";
import { Message } from "./message/MessagePartCollection";

export const ProcessedMessages = (props: {
  processedMessages: IMessage[];
  viewSilentNodes: boolean;
  getCustomUserAnswer: (props: ICustomUserComponentAnswerProps) => JSX.Element;
}) => {
  const processed = props.processedMessages || [];

  const orderedGroup = props.processedMessages.reduce(
    (acc, curr, index) => {
      const startNew =
        !acc.last ||
        acc.last.user !== curr.user ||
        acc.last.chatMetadata?.label !== curr.chatMetadata?.label ||
        acc.last.chatMetadata?.nickname !== curr.chatMetadata?.nickname;

      if (startNew) {
        if (acc.group.length) {
          acc.messages.push(acc.group);
        }
        acc.group = [curr as any] as any;
      } else {
        acc.group = acc.group.concat(curr as any) as any;
      }
      acc.last = curr.output || curr.silent ? undefined : (curr as any);
      if (index === processed.length - 1) {
        acc.messages.push(acc.group);
      }
      return acc;
    },
    {
      last: undefined as any,
      messages: [] as any,
      group: [],
    }
  );

  const messagesGroup = orderedGroup.messages as Array<IMessage[]>;

  const messagesGrouped = messagesGroup.reduce((acc, el) => {
    const content = el.map((m) => m.nodeContent).join(BUBBLE_DELIMITER);
    const lead = el[0];
    return acc.concat({
      ...lead,
      nodeContent: content,
    });
  }, []);

  return (
    <>
      {messagesGrouped.map((m) => {
        return (
          <Message
            message={m}
            active={false}
            viewSilentNodes={props.viewSilentNodes}
            key={m.id}
            getCustomUserAnswer={props.getCustomUserAnswer}
            onLoaded={() => null}
          />
        );
      })}
    </>
  );
};
