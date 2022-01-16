import React from "react";
import { ThemeContext } from "styled-components";
import { IBotTheme, IDmbtMessage } from "./definitions";

interface IMessagesProps {
  processed: IDmbtMessage[];
  active: IDmbtMessage[];
  onProcessed: (last: IDmbtMessage) => void;
  onUxStateChanged: () => void;
}

export const Messages = (props: IMessagesProps) => {
  const processedStr = JSON.stringify(props.processed.map((m) => m.id));
  const activeStr = JSON.stringify(props.active.map((m) => m.id));
  const themeContext: IBotTheme = React.useContext(ThemeContext);
  const messageDelay = themeContext.bot?.messageDelay || 1500;
  const [processed, setProcessed] = React.useState<IDmbtMessage[]>([]);
  const [activeQueue, setActiveQueue] = React.useState<IDmbtMessage[]>();
  const activeQueueLength = activeQueue?.length;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setProcessed(props.processed);
  }, [processedStr]);

  React.useEffect(() => {
    setActiveQueue(props.active);
  }, [activeStr]);

  React.useEffect(() => {
    if (activeQueueLength === undefined) {
      return;
    }

    if (activeQueueLength === 0) {
      props.onProcessed(processed[processed.length - 1]);
      return;
    }

    let timer: any = 0;
    setLoading(true);
    timer = setTimeout(() => {
      const queueCopy = [...(activeQueue as IDmbtMessage[])];
      const newActive = queueCopy.shift() as IDmbtMessage;
      setLoading(false);
      setProcessed(processed.concat(newActive));
      setActiveQueue(queueCopy);
    }, messageDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [activeQueueLength, messageDelay]);

  React.useEffect(() => {
    props.onUxStateChanged();
  }, [loading]);

  const processedList = processed.map((m, i) => {
    const fromUser = m.meta.isUser;
    return (
      <div key={`${m.id}-${i}`}>
        {fromUser ? JSON.stringify(m.output) : m.content}
      </div>
    );
  });

  return (
    <>
      <div className="processedBlock">{processedList}</div>
      {loading && "loading....."}
    </>
  );
};
