import { Box } from "grommet";
import React from "react";
import { ThemeContext } from "styled-components";
import { IBotTheme, IDmbtMessage } from "./definitions";
import { Message } from "./Message";
import { LoadingMessage } from "./TypingMesage";

interface IMessagesProps {
  processed: IDmbtMessage[];
  active: IDmbtMessage[];
  onProcessed: (last: IDmbtMessage) => void;
  viewSilentNoses?: boolean;
  customMessageDisplay?: Map<
    string,
    (props: { message: IDmbtMessage }) => JSX.Element
  >;
}

const getAdjustedProcessedMessages = (processed: IDmbtMessage[]) => {
  const orderedGroup = processed.reduce(
    (acc, curr, index) => {
      const startNew =
        !acc.last ||
        acc.last.meta?.isUser !== curr.meta?.isUser ||
        acc.last.meta?.silent !== curr.meta?.silent ||
        acc.last.meta?.nickname !== curr.meta?.nickname;

      if (startNew) {
        if (acc.group.length) {
          acc.messages.push(acc.group);
        }
        acc.group = [curr as any] as any;
      } else {
        acc.group = acc.group.concat(curr as any) as any;
      }
      acc.last = curr;
      // acc.last =
      //   curr.output.type !== "message" || curr.meta.silent
      //     ? undefined
      //     : (curr as any);
      curr;
      if (index === processed.length - 1) {
        acc.messages.push(acc.group);
      }
      return acc;
    },
    {
      last: undefined as IDmbtMessage | undefined,
      messages: [] as any,
      group: [] as any,
    }
  );

  const messagesGroup = orderedGroup.messages as Array<IDmbtMessage[]>;

  return messagesGroup.reduce((acc, el) => {
    const messages = el.map((m, i) => ({
      ...m,
      meta: {
        ...m.meta,
        hasAvatar: i === el.length - 1,
      },
    }));
    return acc.concat(messages);
  }, []);
};

export const Messages = (props: IMessagesProps) => {
  const processedStr = JSON.stringify(props.processed.map((m) => m.id));
  const activeStr = JSON.stringify(props.active.map((m) => m.id));
  const themeContext: IBotTheme = React.useContext(ThemeContext);
  const messageDelay = themeContext.bot?.messageDelay || 1500;
  const loadingColor = themeContext.global?.colors?.brand;
  const [processed, setProcessed] = React.useState<IDmbtMessage[]>([]);
  const [activeQueue, setActiveQueue] = React.useState<IDmbtMessage[]>();
  const activeQueueLength = activeQueue?.length;
  const [active, setActive] = React.useState<IDmbtMessage>();

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

    const queueCopy = [...(activeQueue as IDmbtMessage[])];
    const newActive = queueCopy.shift() as IDmbtMessage;
    setActive(newActive);
    timer = setTimeout(() => {
      setActive(undefined);
      setProcessed(processed.concat(newActive));
      setActiveQueue(queueCopy);
    }, messageDelay);
    return () => {
      clearTimeout(timer);
    };
  }, [activeQueueLength, messageDelay]);

  // React.useEffect(() => {
  //   let timer: any = 0;
  //   if (active) {
  //     //eventBus.emit("syncScroll", loading);
  //     timer = setTimeout(() => {
  //       setProcessed(processed.concat(active));
  //       setActive(undefined);
  //       const queueCopy = [...(activeQueue as IDmbtMessage[])];
  //       queueCopy.shift() as IDmbtMessage;
  //       setActiveQueue(queueCopy);
  //     }, messageDelay);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [active?.id]);

  // React.useEffect(() => {
  //   if (loading) {
  //     eventBus.emit("syncScroll", loading);
  //   }
  // }, [loading]);

  const processedList = getAdjustedProcessedMessages(processed)
    .filter((m) => props.viewSilentNoses ? m : !m.meta.silent)
    .map((m, i) => {
      return (
        <Message
          key={`${m.id}-${i}`}
          active={i === processed.length - 1}
          message={m}
          customMessageDisplay={props.customMessageDisplay || new Map()}
        ></Message>
      );
    });

  return (
    <>
      <div className="processedBlock">{processedList}</div>
      {active && (
        <LoadingMessage
          bgColor={loadingColor as string}
          justify={active.meta.isUser ? "end" : "start"}
        />
      )}
    </>
  );
};
