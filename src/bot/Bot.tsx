import * as React from "react";
import { Grommet, ThemeContext, ThemeType } from "grommet";
import { Box } from "grommet";
import { getInitialState, reducer } from "./reducer";
import { BotTheme } from "./defaultTheme";
import {
  Actions,
  BotActionPayload,
  IBotNode,
  IBotNodeInteractionProps,
  IBotState,
  IBotThemableProps,
  IBotTheme,
  IDumbotProps,
  IMessage,
  IUserAction,
} from "./definitions";

import { deepMerge } from "grommet/utils";
import { BotLayout, ChatBotContainer, ChatbotContent } from "./Container";
import { BotHeader } from "./Header";
import { BotFooter } from "./Footer";
import { ProcessedMessages } from "./ProcessedMessages";
import { ActiveMessage } from "./ActiveMessage";
import { FinalNotes } from "./FinalNotes";
import { FloatingTrigger } from "./FloatingTrigger";
import BotContext from "./BotContext";
import { BodyInteraction, FooterInteraction } from "./interactions/Interaction";
import { useBotReducer } from "./botReducer";
import { MissingExternalComponent } from "./utils";
import { createGlobalStyle } from "styled-components";

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

function DumbotInner(props: IDumbotProps) {
  const bottheme: IBotTheme = React.useContext(ThemeContext);
  const theme = bottheme.bot as IBotThemableProps;
  const botBodyRef = React.createRef<HTMLDivElement>();

  const [opened, setOpened] = React.useState(
    props.initiallyClosed && props.allowClose ? false : true
  );

  const autoscroll = (element: HTMLDivElement | null) => {
    if (element) {
      window.requestAnimationFrame(() =>
        element.scroll({ top: element.scrollHeight, behavior: "smooth" })
      );
    }
  };

  const [botState, dispatch] = useBotReducer(
    reducer,
    getInitialState(props.initialState, props.externalVariables || {}),
    (state: IBotState, type: Actions, payload: BotActionPayload) => {
      if (props.onStateChanging) {
        props.onStateChanging(state, type, payload);
      }
    },
    (state: IBotState) => {
      if (props.onStateChanged) {
        props.onStateChanged(state);
      }
    },
    (state: IBotState) => {
      if (props.onBotFinished) {
        props.onBotFinished(state);
      }
    }
  );

  const onToggle = (opened: boolean) => {
    setOpened(opened);
    if (props.onToggle) {
      props.onToggle(opened);
    }
  };

  const onBotEvent = (type: Actions, payload: BotActionPayload) => {
    dispatch({ type, payload });
  };

  const onSendAttachments = async (files: any[]) => {
    if (!props.onSendAttachments) {
      console.error("onSendAttachments isn't defined as Bot property");
      return;
    }

    return await props.onSendAttachments(files);
  };

  const onCallHost = async (label: string, variables: any) => {
    if (!props.onCallHost) {
      console.error("on call host isn't defined as Bot property");
      return null;
    }

    return await props.onCallHost(label, variables);
  };

  const onSetVariable = (name: string, value: any) => {
    onBotEvent("onSetVariable", { id: name, value });
    if (props.onSetVariable) {
      props.onSetVariable(name, value);
    }
  };

  const onUserAction = (answer: IUserAction) => {
    onBotEvent("onUserAction", answer);
    if (props.onUserAction) {
      props.onUserAction(answer);
    }
  };

  const onLoaded = () => {
    autoscroll(botBodyRef.current);
    if (opened && botBodyRef.current && !props.disableAutofocus) {
      botBodyRef.current.focus();
    }
  };

  const onGetExternalComponent = (data: IBotNodeInteractionProps) => {
    if (props.onGetExternalComponent) {
      return props.onGetExternalComponent(data);
    } else {
      return MissingExternalComponent;
    }
  };

  const onAddProcessedMessage = (message: IMessage) => {
    onBotEvent("onCustomMessage", message);
  };

  React.useEffect(() => {
    const resizeListener = () =>
      window.requestAnimationFrame(() => autoscroll(botBodyRef.current));
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [botBodyRef]);

  React.useEffect(() => {
    autoscroll(botBodyRef.current);
  }, [botBodyRef]);

  const interactionOnFooter =
    botState.activeInteraction &&
    botState.activeInteraction.properties.displayAs === "footer"
      ? true
      : false;

  return (
    <BotContext.Provider value={botState}>
      <Box width="100%" height="100%" className={props.className}>
        <FloatingTrigger
          opened={opened}
          icon={props.trigger?.icon}
          size={props.trigger?.size}
          onToggleBot={onToggle}
        />
        <ChatBotContainer opened={opened}>
          <Box
            className="dumbot-innerContainer"
            direction="row"
            overflow="hidden"
            width="100%"
            height="100%"
          >
            <Box
              direction="column"
              overflow="hidden"
              width="100%"
              height="100%"
            >
              <BotHeader
                footerBusy={interactionOnFooter}
                allowClose={props.allowClose}
                onClose={() => onToggle(false)}
                isEnd={botState.finished || false}
                waitingForUser={botState.activeInteraction ? true : false}
                onBack={() =>
                  onBotEvent(
                    botState.finished ? "onBotRestart" : "onBack",
                    botState.activeInteraction as IBotNode
                  )
                }
              />
              <ChatbotContent opened={opened} ref={botBodyRef as any}>
                <BotLayout>
                  <ProcessedMessages
                    processedMessages={botState.processedMessages}
                    getCustomUserAnswer={props.getCustomUserAnswer}
                    viewSilentNodes={props.viewSilentNodes || false}
                  />
                  <ActiveMessage
                    key={botState.activeMessage?.id}
                    activeMessage={botState.activeMessage}
                    viewSilentNodes={props.viewSilentNodes || false}
                    onLoaded={onLoaded}
                    getCustomUserAnswer={props.getCustomUserAnswer}
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
                  />
                  <div style={{ height: "50px" }} />
                </BotLayout>
              </ChatbotContent>
              <div
                style={{
                  backgroundColor: bottheme?.global?.colors
                    ?.botFooterBgColor as any,
                }}
              >
                <FooterInteraction
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
                />
              </div>
              {!interactionOnFooter && (
                <BotFooter
                  isEnd={botState.finished || false}
                  waitingForUser={botState.activeInteraction ? true : false}
                  onBack={() =>
                    onBotEvent(
                      botState.finished ? "onBotRestart" : "onBack",
                      botState.activeInteraction as IBotNode
                    )
                  }
                />
              )}
            </Box>
          </Box>
        </ChatBotContainer>
      </Box>
    </BotContext.Provider>
  );
}

export const ThemeWrapper = (props: {
  children: any;
  themeOverrides?: ThemeType;
  styleOverrides?: any;
}) => {
  const theme = deepMerge(BotTheme, props.themeOverrides || {});

  const style: React.CSSProperties = {
    boxSizing: "border-box",
    ...(props.styleOverrides || {}),
    // fontFamily: (theme.bot as IBotThemableProps).fontFamily,
  };

  return (
    <Grommet theme={theme} full style={style} cssVars plain>
      {props.children}
    </Grommet>
  );
};

export const Dumbot = (props: IDumbotProps) => {
  return (
    <ThemeWrapper themeOverrides={props.theme}>
      <GlobalStyle />
      <DumbotInner {...props} />
    </ThemeWrapper>
  );
};
