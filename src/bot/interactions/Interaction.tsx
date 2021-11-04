import { Box, ThemeContext } from "grommet";
import { debounce } from "lodash";
import React from "react";

import useResizeObserver from "use-resize-observer";
import BotContext from "../BotContext";
import {
  BotNodeType,
  IBotNodeInteractionLoaderProps,
  IBotNodeInteractionProps,
  IBotState,
  IBotTheme,
} from "../definitions";
import { ErrorBoundary } from "../ErrorBoundaries";
import { LoadingMessage } from "../LoadingMessage";
import { MarkdownView } from "../MarkdownView";
import { MessagePartContainer } from "../Message";
import { DumbotNotification } from "../Notification";
import { getInteractionLabel } from "../utils";
import { BotButtons } from "./Buttons";
import { BotCustomNode } from "./Custom";
//import { BotCustomNode } from "./CustomDynComponent";
import { BotQuestion } from "./Question";
import { BotSnippet } from "./Snippet";

const EmptyInteraction = () => <div>Error</div>;
const InteractionsMap = new Map<
  BotNodeType,
  (props: IBotNodeInteractionProps) => JSX.Element
>([
  ["question", BotQuestion],
  ["buttons", BotButtons],
  ["snippet", BotSnippet],
  ["custom", BotCustomNode],
]);

export const Interaction = (props: IBotNodeInteractionLoaderProps) => {
  const [forceLoading, setForceLoading] = React.useState(false);
  const botContext: IBotState = React.useContext(BotContext);
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const usrInputRef = React.useRef<HTMLInputElement>(null);
  const InteractionControl = props.node
    ? InteractionsMap.get(props.node.type) || EmptyInteraction
    : EmptyInteraction;
  const propsOnSizeChanged = props.onSizeChanged;
  const propsOnLoaded = props.onLoaded;

  const onResize = React.useMemo(
    () =>
      debounce(
        (size: { width: any; height: any }) => {
          propsOnSizeChanged(size.width, size.height);
        },
        1000,
        { leading: true }
      ),
    [propsOnSizeChanged]
  );
  const { ref } = useResizeObserver({ onResize });

  const setInteractionLoading = (loading: boolean) => {
    setForceLoading(loading);
  };

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      propsOnLoaded(usrInputRef);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [propsOnLoaded]);

  if (!props.node) {
    return null;
  }

  return (
    <ErrorBoundary
      message={
        <Box align="center" justify="start" pad="medium">
          <Box width="medium">
            <DumbotNotification
              toast={false}
              message="error rendering the message"
              status="critical"
              title="Dumbot error"
            />
          </Box>
        </Box>
      }
    >
      <MessagePartContainer
        hasAvatar={true}
        active={true}
        ref={usrInputRef}
        user={false}
      >
        {forceLoading ? (
          <LoadingMessage />
        ) : (
          <MarkdownView
            variables={botContext.variables}
            text={getInteractionLabel(props.node.content)}
          ></MarkdownView>
        )}
        <div ref={ref}>
          <InteractionControl
            key={`botInteraction-${props.node?.id}`}
            onUserAction={props.onUserAction}
            node={props.node}
            theme={theme}
            onLoaded={props.onLoaded}
            onSetVariable={props.onSetVariable}
            onCallHost={props.onCallHost}
            onSizeChanged={props.onSizeChanged}
            variables={props.variables}
            onSendAttachments={props.onSendAttachments}
            onComponentError={props.onComponentError}
            preview={props.preview}
            customProps={props.customProps}
            setInteractionLoading={setInteractionLoading}
            onTranspileCode={props.onTranspileCode}
          />
        </div>
      </MessagePartContainer>
    </ErrorBoundary>
  );
};
