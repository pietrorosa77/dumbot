import { Box, ThemeContext } from "grommet";
import { debounce } from "lodash";
import React from "react";

import useResizeObserver from "use-resize-observer";
import BotContext from "../BotContext";
import {
  BotNodeType,
  IBotNode,
  IBotNodeInteractionLoaderProps,
  IBotNodeInteractionProps,
  IBotState,
  IBotTheme,
  IChatMessage,
} from "../definitions";
import { ErrorBoundary } from "../ErrorBoundaries";
import { LoadingMessage } from "../LoadingMessage";
import { MarkdownView } from "../MarkdownView";
import { MessagePartContainer } from "../Message";
import { DumbotNotification } from "../Notification";
import { getInteractionLabel } from "../utils";
import { BotButtons } from "./Buttons";
import { BotQuestion } from "./Question";

const EmptyInteraction = () => <div>Error</div>;
const InteractionsMap = new Map<
  BotNodeType,
  (
    props: IBotNodeInteractionProps & {
      onAddProcessedMessage: (message: IChatMessage) => void;
    }
  ) => JSX.Element
>([
  ["question", BotQuestion],
  ["buttons", BotButtons],
]);

export const Interaction = (
  props: IBotNodeInteractionLoaderProps & {
    onGetExternalComponent: (
      props: IBotNodeInteractionProps
    ) => (props: IBotNodeInteractionProps) => JSX.Element;
    renderErrorDetails?: (error: any) => JSX.Element;
    onAddProcessedMessage: (message: IChatMessage) => void;
  }
) => {
  const [forceLoading, setForceLoading] = React.useState(false);
  const botContext: IBotState = React.useContext(BotContext);
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const usrInputRef = React.useRef<HTMLInputElement>(null);
  const InteractionControl = props.node
    ? InteractionsMap.get(props.node.type) ||
      props.onGetExternalComponent(props as any)
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

  const BubbleInteractionContainer = (props: {
    node: IBotNode;
    children: any;
  }) => (
    <MessagePartContainer
      hasAvatar={true}
      active={true}
      ref={usrInputRef}
      user={false}
      width={
        props.node.properties.width || theme.bot?.bubbleControlWidth || "100%"
      }
      maxWidth={
        props.node.properties.maxWidth ||
        theme.bot?.bubbleControlMaxWidth ||
        "600px"
      }
    >
      {forceLoading ? (
        <LoadingMessage />
      ) : (
        <MarkdownView
          variables={botContext.variables}
          text={getInteractionLabel(props.node.content)}
        ></MarkdownView>
      )}
      {props.children}
    </MessagePartContainer>
  );

  const PlainInteractionContainer = (props: {
    node: IBotNode;
    children: any;
  }) => (
    <Box
      pad="small"
      background={
        props.node.properties.background || theme.global?.colors?.botBubbleColor
      }
      width="100%"
      round="10px"
    >
      {props.node.content && (
        <Box pad="xsmall">
          <MarkdownView
            variables={botContext.variables}
            text={getInteractionLabel(props.node.content)}
          ></MarkdownView>
        </Box>
      )}
      <Box fill>{props.children}</Box>
    </Box>
  );

  const ControlInteraction = (
    <div ref={ref} style={{ marginTop: "20px" }}>
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
        onAddProcessedMessage={props.onAddProcessedMessage}
      />
    </div>
  );

  return (
    <ErrorBoundary
      renderError={props.renderErrorDetails}
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
      {props.node.properties.disableBubble ? (
        <PlainInteractionContainer node={props.node}>
          {ControlInteraction}
        </PlainInteractionContainer>
      ) : (
        <BubbleInteractionContainer node={props.node}>
          {ControlInteraction}
        </BubbleInteractionContainer>
      )}
    </ErrorBoundary>
  );
};
