import { Box, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import React, { useCallback, useEffect, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import {
  ChatbotContent,
  ChatBotContentWrpper,
  ChatBotOuterContainer,
} from "./BotLayout";
import {
  DEFAULT_NODE_PORT,
  DmbtMiddlewhare,
  IBotTheme,
  IDmbtMessage,
  IDmbtNode,
  IDmbtProps,
  IDmbtShape,
  IDmbtState,
  SimpleAction,
} from "./definitions";
import { BotFooter } from "./Footer";
import { BotHeader } from "./Header";
import { Messages } from "./Messages";
import {
  eventBusMiddleware,
  logMiddleware,
  thunkMiddleware,
} from "./middlewares";
import { useDmbtReducer, createReducer, DispatcherContext } from "./reducer";
import { getInitialState } from "./stateHelpers";
import { BotTheme } from "./Theme";
import { Trigger } from "./Trigger";
import { useEventBus } from "./eventBus";

import { Interaction } from "./Interaction";
import { getBotCss } from "./botMessagesCss";
import "rehype-katex/node_modules/katex/dist/katex.css";
import { ErrorBoundary } from "./ErrorBoundary";

const DumbotInner = (
  props: IDmbtProps & {
    activeTheme: IBotTheme;
    reducer: (state: IDmbtState, action: SimpleAction) => IDmbtState;
    middlewares: DmbtMiddlewhare[];
    initialState: IDmbtState;
    onGetInteractionNode: (id?: string) => IDmbtNode | undefined;
  }
) => {
  const {
    initiallyClosed,
    className,
    activeTheme: theme,
    trigger,
    allowClose,
    initialState,
    middlewares,
    reducer,
    onGetInteractionNode,
    viewSilentNodes,
    hideFooter,
    hideHeader,
  } = props;

  const scrollAnchor = React.useRef<HTMLDivElement>();
  const botRef = React.useRef<HTMLDivElement>();
  const resizeableRef = React.useRef<HTMLDivElement>();
  const [opened, setOpened] = React.useState(initiallyClosed ? false : true);
  const scrollerID = `${props.botUUID}scroll`;
  const scrollElement = React.useRef<HTMLElement | null>(null);
  const DmbtEventBus = useEventBus();
  const [state, dispatch] = useDmbtReducer(
    reducer,
    initialState,
    middlewares,
    DmbtEventBus
  );
  const activeInteraction = onGetInteractionNode(state.activeInteraction);
  const interactionTakesAll =
    activeInteraction && activeInteraction.properties?.displayAs === "full";
  const interactionOnFooter =
    activeInteraction && activeInteraction.properties?.displayAs === "footer";
  const { onSendDataToHost, onStateChanged, onToggle, onCallHost } = props;

  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver(() => autoscroll())
  );

  useEffect(() => {
    if (interactionTakesAll) {
      return;
    }
    const observed = resizeableRef.current;
    const observer = resizeObserver.current;
    if (opened && observed) {
      observer.observe(observed);
    }
    return () => {
      if (observed) {
        observer.unobserve(observed);
      }
    };
  }, [opened, scrollerID, interactionTakesAll]);

  const autoscroll = () => {
    if (interactionTakesAll) {
      return;
    }
    requestAnimationFrame(() => {
      if (!scrollElement.current || !scrollElement.current.isConnected) {
        scrollElement.current = document.getElementById(scrollerID);
      }

      if (scrollElement.current) {
        scrollElement.current.scrollTo({
          top: scrollElement.current.scrollHeight,
          behavior: "smooth",
        });
      }

      // lets also delay the scroll to view of the bottom anchor: give timeto images and video to take
      // additional space
      setTimeout(() => {
        if (scrollAnchor.current) {
          scrollAnchor.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    });
  };

  // useMutationObservable(botRef.current as any, autoscroll);
  // useResizeListener(autoscroll);

  React.useEffect(() => {
    const sendDataToHostHandler = DmbtEventBus.subscribe(
      "evt-SendDataToHost",
      (data) => {
        if (onSendDataToHost) {
          onSendDataToHost(data);
        }
      }
    );

    const stateChangedHandler = DmbtEventBus.subscribe(
      "dmbt-StateChanged",
      (data) => {
        if (onStateChanged) {
          onStateChanged(data);
        }
      }
    );

    const restartdHandler = DmbtEventBus.subscribe("evt-restart", () => {
      dispatch({
        type: "@restart",
        payload: undefined,
      });
    });

    return () => {
      DmbtEventBus.unSubscribe("evt-SendDataToHost", sendDataToHostHandler);
      DmbtEventBus.unSubscribe("dmbt-StateChanged", stateChangedHandler);
      DmbtEventBus.unSubscribe("evt-restart", restartdHandler);
    };
  }, [DmbtEventBus, dispatch, onSendDataToHost, onStateChanged]);

  React.useEffect(() => {
    if (onToggle) {
      onToggle(opened);
    }
  }, [opened, onToggle]);

  const onToggleCb = useCallback((opened: boolean) => {
    setOpened(opened);
  }, []);

  const onBack = () => {
    dispatch({
      type: state.finished ? "@restart" : "@prev",
      payload: state.activeInteraction,
    });
  };

  const messagesProcessed = (last: IDmbtMessage) => {
    dispatch({
      type: "@next",
      payload: last,
    });
  };

  const onCallHostCb = async (hostFunctionName: string, parameters: any) => {
    if (!onCallHost) {
      console.error("on call host isn't defined as Bot property");
      return null;
    }

    return await onCallHost(hostFunctionName, parameters);
  };

  const onErrorAction = () => {
    dispatch({
      type: "@answer",
      payload: {
        value: "Sorry, an error happened",
        port: DEFAULT_NODE_PORT,
        type: "error",
        id: activeInteraction?.id,
      },
    });
  };

  return (
    <DispatcherContext.Provider value={dispatch}>
      <Box width="100%" height="100%" className={className} ref={botRef as any}>
        <Trigger
          opened={opened}
          icon={trigger?.icon || theme.bot?.botAvatar}
          size={trigger?.size}
          onToggleBot={onToggleCb}
        />
        {opened && (
          <ChatBotOuterContainer>
            {interactionTakesAll ? (
              <>
                {!hideHeader && (
                  <BotHeader
                    allowClose={allowClose}
                    onClose={() => onToggleCb(false)}
                    isEnd={state.finished || false}
                    interactive={true}
                    onBack={onBack}
                    loading={!!state.loading}
                  />
                )}
                <ChatBotContentWrpper>
                  <Interaction
                    customInteractions={props.customInteractions}
                    node={activeInteraction}
                    theme={theme}
                    dispatcher={dispatch}
                    pad={activeInteraction.properties?.containerPad || "none"}
                    round="small"
                    height={
                      activeInteraction.properties?.containerHeight || "100%"
                    }
                    bgColor={activeInteraction.properties?.bgColor || "brand"}
                    margin="none"
                    onCallHost={onCallHostCb}
                    state={state}
                  />
                </ChatBotContentWrpper>
              </>
            ) : (
              <>
                {!hideHeader && (
                  <BotHeader
                    allowClose={allowClose}
                    onClose={() => onToggleCb(false)}
                    isEnd={state.finished || false}
                    interactive={state.activeInteraction ? true : false}
                    onBack={onBack}
                    loading={!!state.loading}
                  />
                )}
                <ChatbotContent id={scrollerID}>
                  <div ref={resizeableRef as any}>
                    <Messages
                      active={state.active}
                      processed={state.processed}
                      onProcessed={messagesProcessed}
                      viewSilentNoses={viewSilentNodes}
                      customMessageDisplay={props.customMessageDisplay}
                    />
                    {activeInteraction && !interactionOnFooter && (
                      <ErrorBoundary onDismiss={onErrorAction}>
                        <Interaction
                          customInteractions={props.customInteractions}
                          node={activeInteraction}
                          theme={theme}
                          dispatcher={dispatch}
                          round="small"
                          bgColor="brand"
                          margin={{ top: "20px" }}
                          onCallHost={onCallHostCb}
                          state={state}
                        />
                      </ErrorBoundary>
                    )}
                    <Box
                      ref={scrollAnchor as any}
                      height="100px"
                      background="transparent"
                      id="dumbotBottomAnchor"
                    />
                  </div>
                </ChatbotContent>
                {activeInteraction && interactionOnFooter && (
                  <div style={{ maxHeight: "100%" }}>
                    <ErrorBoundary onDismiss={onErrorAction}>
                      <Interaction
                        customInteractions={props.customInteractions}
                        node={activeInteraction}
                        theme={theme}
                        dispatcher={dispatch}
                        bgColor="brand"
                        onCallHost={onCallHostCb}
                        state={state}
                      />
                    </ErrorBoundary>
                  </div>
                )}
                {!interactionOnFooter && !hideFooter && (
                  <BotFooter
                    isEnd={state.finished || false}
                    interactive={activeInteraction ? true : false}
                    onBack={onBack}
                    loading={!!state.loading}
                  />
                )}
              </>
            )}
          </ChatBotOuterContainer>
        )}
      </Box>
    </DispatcherContext.Provider>
  );
};

const GlobalStyle = createGlobalStyle`
    ${(props) => getBotCss(props.theme)}
`;

export const Dumbot = (
  props: IDmbtProps & {
    styleOverrides?: any;
    savedState?: IDmbtState;
    shape: IDmbtShape;
    log?: boolean;
    middlewares?: DmbtMiddlewhare[];
  }
) => {
  const theme = deepMerge(BotTheme, props.theme || {});
  const style: React.CSSProperties = {
    boxSizing: "border-box",
    ...(props.styleOverrides || {}),
  };
  const reducer = createReducer(props.shape, props.externalVariables);
  const initialState = getInitialState(
    props.shape,
    props.savedState,
    props.externalVariables
  );
  const baseMiddlewares = [thunkMiddleware, eventBusMiddleware];
  if (props.log) {
    baseMiddlewares.push(logMiddleware);
  }
  const middlewares = (props.middlewares || []).concat(baseMiddlewares);

  const onGetInteractionNode = (id?: string) => {
    if (!id) {
      return undefined;
    }
    return props.shape.nodes[id];
  };

  return (
    <Grommet theme={theme} full style={style} cssVars plain>
      <GlobalStyle />
      <DumbotInner
        {...props}
        activeTheme={theme}
        reducer={reducer}
        initialState={initialState}
        middlewares={middlewares}
        onGetInteractionNode={onGetInteractionNode}
      />
    </Grommet>
  );
};
