import { IMessage } from "./definitions";
import { Message } from "./message/MessagePartCollection";

export function ActiveMessage(props: {
  activeMessage?: IMessage | null;
  viewSilentNodes: boolean;
  onLoaded: () => void;
  onProcessed: (message: IMessage) => void;
  CustomAnswer?: React.FC<IMessage>;
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
      CustomAnswer={props.CustomAnswer}
      onProcessed={() => props.onProcessed(activeMessage)}
    />
  );
}
