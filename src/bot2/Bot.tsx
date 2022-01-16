import { Box, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import React, { useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import { ChatbotContent, ChatBotOuterContainer } from "./BotLayout";
import {
  DmbtMiddlewhare,
  IBotTheme,
  IDmbtNode,
  IDmbtProps,
  IDmbtShape,
  IDmbtState,
  SimpleAction,
} from "./definitions";
import { BotFooter } from "./Footer";
import { BotHeader } from "./Header";
import { logMiddleware, thunkMiddleware } from "./middlewares";
import { useDmbtReducer, BotContext, createReducer } from "./reducer";
import { getInitialState } from "./stateHelpers";
import { BotTheme } from "./Theme";
import { Trigger } from "./Trigger";

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
  } = props;

  const botBodyRef = React.createRef<HTMLDivElement>();
  const [opened, setOpened] = React.useState(
    props.initiallyClosed ? false : true
  );

  const [state, dispatch] = useDmbtReducer(reducer, initialState, middlewares);
  const activeInteraction = onGetInteractionNode(state.activeInteraction);
  const interactionOnFooter =
    activeInteraction && activeInteraction.properties.displayAs === "footer";

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

  return (
    <BotContext.Provider value={dispatch}>
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
              {/* <ProcessedMessages
                      processedMessages={botState.processedMessages}
                      CustomAnswer={props.CustomAnswer}
                      viewSilentNodes={props.viewSilentNodes || false}
                    />
                    <ActiveMessage
                      key={botState.activeMessage?.id}
                      activeMessage={botState.activeMessage}
                      viewSilentNodes={props.viewSilentNodes || false}
                      onLoaded={onLoaded}
                      CustomAnswer={props.CustomAnswer}
                      onProcessed={(message: IMessage) =>
                        onBotEvent("onGetNextMessage", message)
                      }
                    />
                    <BodyInteraction
                      node={botState.activeInteraction}
                      key={`bodyinteractionwr-${botState.activeInteraction?.id}`}
                      onAddProcessedMessage={onAddProcessedMessage}
                      onLoaded={onLoaded}
                      onCallHost={onCallHost}
                      variables={botState.variables}
                      onSetVariable={onSetVariable}
                      onSendAttachments={onSendAttachments}
                      onUserAction={onUserAction}
                      renderErrorDetails={props.renderErrorDetails}
                      onGetExternalComponent={onGetExternalComponent}
                    />
                    <FinalNotes
                      onLoaded={onLoaded}
                      finished={botState.finished}
                      finalMessageContent={theme.finalMessageContent}
                    /> */}
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
    </BotContext.Provider>
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
    styleOverrides: any;
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
  const middlewares = baseMiddlewares.concat(props.middlewares || []);

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
