import { Box, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { nanoid } from "nanoid";
import React, { useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import { ChatbotContent, ChatBotOuterContainer } from "./BotLayout";
import {
  DmbtMiddlewhare,
  IBotTheme,
  IDmbtMessage,
  IDmbtMessageOutput,
  IDmbtNode,
  IDmbtProps,
  IDmbtShape,
  IDmbtState,
  SimpleAction,
} from "./definitions";
import { BotFooter } from "./Footer";
import { BotHeader } from "./Header";
import { Messages } from "./Messages";
import { logMiddleware, thunkMiddleware } from "./middlewares";
import { useDmbtReducer, createReducer } from "./reducer";
import { getInitialState } from "./stateHelpers";
import { BotTheme } from "./Theme";
import { Trigger } from "./Trigger";
import { EventBusContext, getEventBus } from "./eventBus";

const autoscroll = (element: HTMLDivElement | null) => {
  if (element) {
    window.requestAnimationFrame(() =>
      element.scroll({ top: element.scrollHeight, behavior: "smooth" })
    );
  }
};

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
    //  initiallyClosed,
    className,
    activeTheme: theme,
    trigger,
    allowClose,
    initialState,
    middlewares,
    reducer,
    onGetInteractionNode,
  } = props;

  const DmbtEventBus = getEventBus();
  const botBodyRef = React.createRef<HTMLDivElement>();
  const [opened, setOpened] = React.useState(
    props.initiallyClosed ? false : true
  );

  const [state, dispatch] = useDmbtReducer(reducer, initialState, middlewares);
  const activeInteraction = onGetInteractionNode(state.activeInteraction);
  const interactionOnFooter =
    activeInteraction && activeInteraction.properties?.displayAs === "footer";

  React.useEffect(() => {
    if (!botBodyRef.current) {
      return;
    }
    const handler = DmbtEventBus.subscribe("syncScroll", () => {
      autoscroll(botBodyRef.current);
      if (opened && botBodyRef.current && !props.disableAutofocus) {
        botBodyRef.current.focus();
      }
    });

    return () => DmbtEventBus.unSubscribe("syncScroll", handler);
  }, [botBodyRef.current, DmbtEventBus]);

  React.useEffect(() => {
    if (props.onToggle) {
      props.onToggle(opened);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const onToggle = useCallback((opened: boolean) => {
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

  const onUserAnswer = () => {
    const usrAnswer: IDmbtMessageOutput = {
      id: nanoid(),
      port: "default",
      type: "text",
      value: "test",
    };
    dispatch({
      type: "@answer",
      payload: usrAnswer,
    });
  };

  return (
    <EventBusContext.Provider value={DmbtEventBus}>
      <Box width="100%" height="100%" className={className}>
        <Trigger
          opened={opened}
          icon={trigger?.icon || theme.bot?.botAvatar}
          size={trigger?.size}
          onToggleBot={onToggle}
        />
        {opened && (
          <ChatBotOuterContainer>
            <BotHeader
              allowClose={allowClose}
              onClose={() => onToggle(false)}
              isEnd={state.finished || false}
              interactive={state.activeInteraction ? true : false}
              onBack={onBack}
            />
            <ChatbotContent ref={botBodyRef as any}>
              <Messages
                active={state.active}
                processed={state.processed}
                onProcessed={messagesProcessed}
              />
              {activeInteraction && (
                <button onClick={onUserAnswer}>moveon</button>
              )}
              <div style={{ height: "50px" }} />
            </ChatbotContent>
            {/* <div
              style={{
                backgroundColor: theme.global?.colors
                  ?.botFooterBgColor as any,
              }}
            > */}
            {/* <FooterInteraction
                    node={botState.activeInteraction}
                    key={`footerinteractionwr-${botState.activeInteraction?.id}`}
                    onAddProcessedMessage={onAddProcessedMessage}
                    onLoaded={onLoaded}
                    onCallHost={onCallHost}
                    variables={botState.variables}
                    onSetVariable={onSetVariable}
                    onSendAttachments={onSendAttachments}
                    onUserAction={onUserAction}
                    renderErrorDetails={props.renderErrorDetails}
                    onGetExternalComponent={onGetExternalComponent}
                  /> */}
            {/* </div> */}
            <BotFooter
              display={!interactionOnFooter}
              isEnd={state.finished || false}
              interactive={activeInteraction ? true : false}
              onBack={onBack}
            />
          </ChatBotOuterContainer>
        )}
      </Box>
    </EventBusContext.Provider>
  );
};

const GlobalStyle = createGlobalStyle`
    * {
      font-family: ${(props: any) =>
        props.theme.global.font?.family || "unset"};
        font-size: ${(props: any) => props.theme.global.font?.size || "unset"};
    }

    p,
    span,
    tr,
    th,
    tbody,
    a,
    td,
    div,
    th {
      font-size: ${(props: any) => props.theme.global.font?.size || "unset"};
    }
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

  const baseMiddlewares = props.log
    ? [thunkMiddleware, logMiddleware]
    : [thunkMiddleware];
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
