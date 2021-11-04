import * as React from "react";
import { IMessage } from "./definitions";
import { Message } from "./Message";
import { getContentForMessage } from "./utils";

export const ProcessedMessages = (props: {
  processedMessages: IMessage[];
  viewSilentNodes: boolean;
}) => {
  const processed = props.processedMessages || [];

  return (
    <>
      {processed.map((m) => {
        const nodeContent = getContentForMessage(m, props.viewSilentNodes);
        return (
          <Message
            message={m}
            active={false}
            content={nodeContent}
            key={m.id}
            onLoaded={() => null}
          />
        );
      })}
    </>
  );
};
