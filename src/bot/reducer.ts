import { nanoid } from "nanoid";
import {
  Actions,
  BotActionPayload,
  IBotNode,
  IBotState,
  IMessage,
  ISetVariable,
  IUserAction,
} from "./definitions";
import {
  getBotStartingNode,
  getNextBotNodeId,
  getNodeFromState,
} from "./utils";

export const getInitialState = (
  state: IBotState,
  externalVariables: object
): IBotState => {
  if (state.finished || state.activeMessage || state.activeInteraction) {
    return state;
  }

  const startNode = getBotStartingNode(state) as IBotNode;

  return {
    ...state,
    variables: {
      ...state.variables,
      ...externalVariables,
    },
    activeMessage: startNode.properties?.startWaitingUser
      ? null
      : {
          nodeId: startNode.id,
          id: nanoid(),
          nodeContent: startNode.content,
          user: false,
          exitPort: startNode.ports[0],
        },
    activeInteraction: startNode.properties?.startWaitingUser
      ? startNode
      : null,
  };
};

export const reducer = (
  state: IBotState,
  action: { type: Actions; payload: BotActionPayload }
) => {
  let ret: IBotState;
  switch (action.type) {
    case "onCustomMessage":
      ret = onCustomMessage(state, action.payload as IMessage);
      break;
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
  if (!state.processedMessages || !state.processedMessages.length) {
    return state;
  }

  const prevMessages = state.processedMessages.filter(
    (el) =>
      ["chat", "label", "skip"].includes(el.desc || "") &&
      el.nodeId !== activeInteraction.id
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
  const silent = activeNode.silent;
  const outputVarId = activeNode.output?.id || activeNode.id;
  const variables = {
    ...state.variables,
    [`${outputVarId}`]: userAnswer.value,
  };

  const processedMessage: IMessage = {
    nodeId: activeNode.id,
    id: nanoid(),
    desc: !silent ? "label" : "",
    user: false,
    silent,
    nodeContent: silent
      ? `silent ${activeNode.type} - ${activeNode.title}`
      : activeNode.content,
    exitPort: userAnswer.port,
  };

  const activeMessage: IMessage = {
    nodeId: activeNode.id,
    output: {
      ...userAnswer,
      id: outputVarId,
    },
    id: nanoid(),
    user: true,
    nodeContent: "", // note useful here since the render will take the output
    silent,
    exitPort: userAnswer.port,
  };

  const newState = {
    ...state,
    variables,
    activeMessage,
    activeInteraction: null,
    processedMessages: state.processedMessages.concat([processedMessage]),
  };

  if (userAnswer.stateTransformer) {
    return userAnswer.stateTransformer(newState);
  }

  return newState;
};

const onCustomMessage = (state: IBotState, message: IMessage): IBotState => {
  const activeNode = state.activeInteraction as IBotNode;
  const messageId = message.id || nanoid();
  const exists = state.processedMessages.find((m) => m.id === messageId);
  if (exists) {
    return {
      ...state,
    };
  }

  const processedMessage: IMessage = {
    nodeId: activeNode ? activeNode.id : nanoid(),
    id: messageId,
    user: message.user,
    silent: false,
    desc: message.desc,
    nodeContent: message.nodeContent,
    metadata: message.metadata,
    exitPort: message.exitPort,
  };

  return {
    ...state,
    processedMessages: state.processedMessages.concat([processedMessage]),
  };
};
