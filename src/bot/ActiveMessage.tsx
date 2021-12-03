import * as React from "react";
import { IMessage } from "./definitions";
import { Message } from "./Message";

export const ActiveMessage = (props: {
  activeMessage?: IMessage | null;
  viewSilentNodes: boolean;
  onLoaded: () => void;
  onProcessed: (message: IMessage) => void;
}) => {
  const activeMessage = props.activeMessage;
  if (!activeMessage) {
    return null;
  }

  return (
    <Message
      message={activeMessage}
      active={true}
      key={activeMessage.id}
      viewSilentNodes={props.viewSilentNodes}
      onLoaded={props.onLoaded}
      onProcessed={() => props.onProcessed(activeMessage)}
    />
  );
};
