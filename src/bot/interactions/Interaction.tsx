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
  IChatMessage,
} from "../definitions";
import { ErrorBoundary } from "../ErrorBoundaries";
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

const Interaction = (
  props: IBotNodeInteractionLoaderProps & {
    onGetExternalComponent: (
      props: IBotNodeInteractionProps
    ) => (props: IBotNodeInteractionProps) => JSX.Element;
    renderErrorDetails?: (error: any) => JSX.Element;
    onAddProcessedMessage: (message: IChatMessage) => void;
    displayAs: "message" | "footer" | "plain";
    hideInteraction: boolean;
  }
) => {
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
    <>
      {props.displayAs === "message" && (
        <>
          <MessagePartContainer
            hasAvatar={true}
            active={true}
            ref={usrInputRef}
            user={false}
            width={
              props.node.properties.width ||
              theme.bot?.bubbleControlWidth ||
              "100%"
            }
            maxWidth={
              props.node.properties.maxWidth ||
              theme.bot?.bubbleControlMaxWidth ||
              "600px"
            }
          >
            <MarkdownView
              variables={botContext.variables}
              text={getInteractionLabel(props.node.content)}
            ></MarkdownView>
          </MessagePartContainer>
          <div style={{ height: "20px", width: "100%" }}></div>
        </>
      )}
      {!props.hideInteraction && (
        <div
          key={`botInteractionContainer-${props.node?.id}`}
          ref={ref}
          style={props.node.properties.interactionContainerStyle}
        >
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
            onAddProcessedMessage={props.onAddProcessedMessage}
          />
        </div>
      )}
    </>
  );
};

export const FooterInteraction = (
  props: IBotNodeInteractionLoaderProps & {
    onGetExternalComponent: (
      props: IBotNodeInteractionProps
    ) => (props: IBotNodeInteractionProps) => JSX.Element;
    renderErrorDetails?: (error: any) => JSX.Element;
    onAddProcessedMessage: (message: IChatMessage) => void;
  }
) => {
  if (!props.node || props.node.properties.displayAs !== "footer") {
    return null;
  }

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
      <Interaction
        key={`interactionfooter-${props.node.id}`}
        {...props}
        displayAs="footer"
        hideInteraction={false}
      />
    </ErrorBoundary>
  );
};

export const BodyInteraction = (
  props: IBotNodeInteractionLoaderProps & {
    onGetExternalComponent: (
      props: IBotNodeInteractionProps
    ) => (props: IBotNodeInteractionProps) => JSX.Element;
    renderErrorDetails?: (error: any) => JSX.Element;
    onAddProcessedMessage: (message: IChatMessage) => void;
  }
) => {
  if (!props.node) {
    return null;
  }

  if (props.node.properties.displayAs === "footer") {
    return (
      <Interaction
        key={`interactionfooter-${props.node.id}`}
        {...props}
        displayAs="message"
        hideInteraction
      />
    );
  }

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
      <Interaction
        key={`interaction-${props.node.id}`}
        {...props}
        displayAs="message"
        hideInteraction={false}
      />
    </ErrorBoundary>
  );
};
