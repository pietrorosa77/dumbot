import React from "react";
import { IDmbtMessage } from "./definitions";

interface IMessagesProps {
  processed: IDmbtMessage[];
  active: IDmbtMessage[];
}

export const Messages = (props: IMessagesProps) => {
  const processedStr = JSON.stringify(props.processed.map((m) => m.id));
  const activeStr = JSON.stringify(props.active.map((m) => m.id));
  const [processed, setProcessed] = React.useState<IDmbtMessage[]>([]);
  const [activeQueue, setActiveQueue] = React.useState<IDmbtMessage[]>([]);
  const [active, setActive] = React.useState<IDmbtMessage>();
  const activeQueueLength = activeQueue.length;

  React.useEffect(() => {
    setProcessed(props.processed);
  }, [processedStr]);

  React.useEffect(() => {
    setActiveQueue(props.active);
  }, [activeStr]);

  React.useEffect(() => {
    if (activeQueueLength > 0) {
    }
  }, [activeQueueLength]);

  //   React.useEffect(() => {
  //     setProcessed(props.processed)
  //   },[propsActiveLength]);

  //   const activeIndex =
  //   const processed = props.processed.map((m,i) => {
  //     const fromUser = m.meta.isUser;
  //     return (
  //         <div key={`${m.id}-${i}`}>{fromUser ? JSON.stringify(m.output): m.content}</div>
  //     )
  //   });
};
