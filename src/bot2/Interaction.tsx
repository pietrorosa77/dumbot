import { Box, ThemeContext } from "grommet";
import React from "react";
import { IBotTheme, IDmbtInteractionProps } from "./definitions";

const EmptyInteraction = () => <div>Error</div>;
const InteractionsMap = new Map<
  string,
  (props: IDmbtInteractionProps) => JSX.Element
>([
  ["question", BotQuestion],
  ["buttons", BotButtons],
]);

const Interaction = (props: IDmbtInteractionProps) => {
  const theme: IBotTheme = React.useContext(ThemeContext) as IBotTheme;
  const InteractionControl =
    InteractionsMap.get(props.node.type) ||
    props.customInteractions.get(props.node.type) ||
    EmptyInteraction;

  return (
    <>
      {props.displayAs === "message" &&
        !props.node.properties.hideInteractionLabel && (
          <>
            <Message
              message={{
                user: false,
                exitPort: "interactionLabel",
                id: `int-label-${props.node.id}`,
                nodeContent: props.node.content,
                nodeId: props.node.id,
              }}
              active={false}
              viewSilentNodes={false}
              onLoaded={() => null}
            />
            <div style={{ height: "20px", width: "100%" }}></div>
          </>
        )}
      {!props.hideInteraction && (
        <div
          key={`botInteractionContainer-${props.node?.id}`}
          // ref={ref}
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
            // onSizeChanged={props.onSizeChanged}
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
    onAddProcessedMessage: (message: IMessage) => void;
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
    onAddProcessedMessage: (message: IMessage) => void;
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
