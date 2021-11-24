import { nanoid } from "nanoid";
import {
  Actions,
  BotActionPayload,
  IBotNode,
  IBotState,
  IMessage,
  ISetVariable,
  IStartNode,
  IUserAction,
} from "./definitions";
import {
  convertToType,
  getBotStartingNode,
  getNextBotNodeId,
  getNodeFromState,
} from "./utils";

const SilentNodes = ["snippet", "api"];

export const getInitialState = (
  state: IBotState,
  externalVariables: object
): IBotState => {
  if (state.finished || state.activeMessage || state.activeInteraction) {
    return state;
  }

  const startNode = getBotStartingNode(state) as IStartNode;

  return {
    ...state,
    variables: {
      ...state.variables,
      ...externalVariables,
    },
    activeMessage: {
      nodeId: startNode.id,
      id: nanoid(),
      nodeContent: startNode.content,
      user: false,
      exitPort: startNode.ports[0],
    },
  };
};

export const reducer = (
  state: IBotState,
  action: { type: Actions; payload: BotActionPayload }
) => {
  let ret: IBotState;
  switch (action.type) {
    case "onUserAction":
      ret = onUserAction(state, action.payload as IUserAction);
      break;
    case "onGetNextMessage":
      ret = onGetNextMessage(state, action.payload as IMessage);
      break;
    case "onBack":
      ret = onGetPrevMessage(state, action.payload as IBotNode);
      break;
    case "onSetVariable":
      ret = onSetVariable(state, action.payload as ISetVariable);
      break;
    case "onBotRestart":
      ret = getInitialState(
        {
          ...state,
          processedMessages: [],
          finished: false,
          activeMessage: null,
          activeInteraction: null,
        },
        state.variables
      );
      break;
  }

  return ret;
};

const onSetVariable = (state: IBotState, payload: ISetVariable): IBotState => {
  return {
    ...state,
    variables: {
      ...(state.variables || {}),
      [`${payload.id}`]: payload.value,
    },
  };
};

const onGetPrevMessage = (
  state: IBotState,
  activeInteraction: IBotNode
): IBotState => {
  const prevMessages = state.processedMessages.filter(
    (el) => el.wasInteractive && el.nodeId !== activeInteraction.id
  );

  let prevMessage = null;
  let prevInteraction = null;

  if (!prevMessages.length) {
    prevMessage = {
      ...state.processedMessages[0],
      id: nanoid(),
    };
  } else {
    const lastInteractionMessage = prevMessages[prevMessages.length - 1];
    prevInteraction = getNodeFromState(state, lastInteractionMessage.nodeId);

    prevInteraction.prevOutput = lastInteractionMessage.output;
  }

  return {
    ...state,
    activeInteraction: prevInteraction,
    activeMessage: prevMessage,
    finished: false,
    processedMessages: state.processedMessages.filter(
      (el) => el.nodeId !== activeInteraction.id
    ),
  };
};

const onGetNextMessage = (
  state: IBotState,
  processedMessage: IMessage
): IBotState => {
  const currentNode = getNodeFromState(state, processedMessage.nodeId);
  const nextId = getNextBotNodeId(
    state,
    currentNode.id,
    processedMessage.exitPort
  );
  const nextNode = getNodeFromState(state, nextId);
  const activeMessage: IMessage | null =
    nextNode && !nextNode.user
      ? {
          nodeId: nextId,
          id: nanoid(),
          user: false,
          nodeContent: nextNode.content,
          exitPort: nextNode.ports[0],
        }
      : null;

  const activeInteraction = nextNode && nextNode.user ? nextNode : null;
  const finished = activeMessage === null && activeInteraction === null;

  return {
    ...state,
    activeMessage,
    activeInteraction,
    finished,
    processedMessages: state.processedMessages.concat(processedMessage),
  };
};

const onUserAction = (state: IBotState, userAnswer: IUserAction): IBotState => {
  const activeNode = state.activeInteraction as IBotNode;
  const silent = SilentNodes.includes(activeNode.type);
  const processedMessage: IMessage = {
    nodeId: activeNode.id,
    output: userAnswer,
    wasInteractive: !silent,
    id: nanoid(),
    user: false,
    silent,
    nodeContent: silent
      ? `silent ${activeNode.type} - ${activeNode.title}`
      : activeNode.content,
    exitPort: userAnswer.port,
  };
  const outputVarId = activeNode.output?.id || activeNode.id;
  const converted = convertToType({
    value: userAnswer.value,
    type: userAnswer.type,
  });
  const variables = {
    ...state.variables,
    [`${outputVarId}`]: converted,
  };

  const activeMessage: IMessage = {
    nodeId: activeNode.id,
    output: userAnswer,
    id: nanoid(),
    user: true,
    nodeContent: activeNode.content,
    silent,
    exitPort: userAnswer.port,
  };

  return {
    ...state,
    variables,
    activeMessage,
    activeInteraction: null,
    processedMessages: state.processedMessages.concat([processedMessage]),
  };
};
