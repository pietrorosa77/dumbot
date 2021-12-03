import * as React from "react";
import { IMessage } from "./definitions";
import { Message } from "./Message";

export const ProcessedMessages = (props: {
  processedMessages: IMessage[];
  viewSilentNodes: boolean;
}) => {
  const processed = props.processedMessages || [];

  return (
    <>
      {processed.map((m) => {
        return (
          <Message
            message={m}
            active={false}
            viewSilentNodes={props.viewSilentNodes}
            key={m.id}
            onLoaded={() => null}
          />
        );
      })}
    </>
  );
};
