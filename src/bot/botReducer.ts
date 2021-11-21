import React from "react";
import { Actions, BotActionPayload, IBotState } from "./definitions";

export const useBotReducer = (
  reducer: (
    state: IBotState,
    action: {
      type: Actions;
      payload: BotActionPayload;
    }
  ) => IBotState,
  initialState: IBotState,
  onStateChanging: (
    state: IBotState,
    type: Actions,
    payload: BotActionPayload
  ) => void,
  onStateChanged: (state: IBotState) => void,
  onBotFinished: (state: IBotState) => void
): [
  IBotState,
  React.Dispatch<{
    type: Actions;
    payload: BotActionPayload;
  }>
] => {
  const callFinished = React.useRef(initialState.finished ? true : false);

  const [appState, dispatch] = React.useReducer(reducer, initialState);
  const wrappedDispatch: React.Dispatch<{
    type: Actions;
    payload: BotActionPayload;
  }> = (value: { type: Actions; payload: BotActionPayload }) => {
    onStateChanging(appState, value.type, value.payload);
    dispatch({ type: value.type, payload: value.payload });
  };

  React.useEffect(() => {
    if (appState.finished && !callFinished.current) {
      onBotFinished(appState);
      callFinished.current = true;
    } else {
      onStateChanged(appState);
    }
    // eslint-disable-next-line
  }, [appState.processedMessages.length]);

  return [appState, wrappedDispatch];
};
