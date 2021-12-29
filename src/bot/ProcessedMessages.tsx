import * as React from "react";
import { BUBBLE_DELIMITER } from ".";
import { IMessage } from "./definitions";
import { Message } from "./Message";

export const ProcessedMessages = (props: {
  processedMessages: IMessage[];
  viewSilentNodes: boolean;
}) => {
  const processed = props.processedMessages || [];

  const orderedGroup = props.processedMessages.reduce(
    (acc, curr, index) => {
      const startNew = !acc.group || acc.last !== curr.user;

      if (startNew) {
        if (acc.group.length) {
          acc.messages.push(acc.group);
        }
        acc.group = [curr as any] as any;
      } else {
        acc.group = acc.group.concat(curr as any) as any;
      }
      acc.last = curr.user as any;
      if (index === processed.length - 1) {
        acc.messages.push(acc.group);
      }
      return acc;
    },
    {
      last: undefined,
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
            onLoaded={() => null}
            customAvatarSrc={m.customAvatarSrc}
          />
        );
      })}
    </>
  );
};
