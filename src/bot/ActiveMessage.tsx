import { ICustomUserComponentAnswerProps, IMessage } from "./definitions";
import { Message } from "./message/MessagePartCollection";

export function ActiveMessage(props: {
  activeMessage?: IMessage | null;
  viewSilentNodes: boolean;
  onLoaded: () => void;
  onProcessed: (message: IMessage) => void;
  getCustomUserAnswer: (props: ICustomUserComponentAnswerProps) => JSX.Element;
}) {
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
      getCustomUserAnswer={props.getCustomUserAnswer}
      onProcessed={() => props.onProcessed(activeMessage)} />
  );
}
