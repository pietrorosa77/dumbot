import * as React from "react";
import { IMessage } from "./definitions";
import { Message } from "./Message";

export const FinalNotes = (props: {
  activeMessage?: IMessage | null;
  finalMessageContent?: string;
  onLoaded: () => void;
  finished?: boolean;
}) => {
  if (!props.finished || !props.finalMessageContent) {
    return null;
  }

  return (
    <Message
      message={{
        exitPort: "",
        id: "FINALNODE",
        nodeId: "FINALNODE",
        user: false,
        nodeContent: props.finalMessageContent,
      }}
      active={true}
      key="FINALNODE"
      viewSilentNodes={false}
      onLoaded={props.onLoaded}
    />
  );
};
