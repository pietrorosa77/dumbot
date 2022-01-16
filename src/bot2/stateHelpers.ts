import { get } from "lodash";
import {
  IDmbtState,
  IDmbtShape,
  START_NODE_TYPE,
  IDmbtNode,
  IDmbtMessage,
  IDmbtMessageOutput,
  DEFAULT_NODE_PORT,
} from "./definitions";

const navigateObjectPropertiesAndSubastitute = (path: string, bag: any) => {
  return get(bag, path, undefined);
};

const substituteVars = (
  templateString: string | undefined,
  templateVariables: { [key: string]: any }
): string => {
  if (!templateVariables) {
    return templateString || "";
  }
  if (!templateString) {
    return "";
  }

  return templateString.replace(
    /\${(.*?)}/g,
    (_, g) =>
      navigateObjectPropertiesAndSubastitute(g, templateVariables) || `$\{${g}}`
  );
};

export const BUBBLE_DELIMITER = "<dumbot-boubble/>";

export const getBotStartingNode = (state: IDmbtShape) => {
  const nodes = Object.keys(state.nodes).map((k) => state.nodes[k]);
  return nodes.find(
    (el) => el.type === START_NODE_TYPE || el.properties?.asStart
  );
};

export const getNodeMessages = (
  node: IDmbtNode | undefined,
  variables: any
): IDmbtMessage[] => {
  if (!node || !node.content) {
    return [];
  }

  const parts = node.content.split(BUBBLE_DELIMITER).filter((el: string) => el);

  const messages = parts.map((mesagePart, i) => {
    const msg: IDmbtMessage = {
      id: `${node.id}-${i}`,
      nodeId: node.id,
      output: {
        id: node.id,
        value: undefined,
        type: "message",
        port: DEFAULT_NODE_PORT,
      },
      content: substituteVars(mesagePart, variables),
      interactive: node.user,
      meta: {
        silent: node.silent ? true : false,
        time: new Date().toISOString(),
      },
    };
    return msg;
  });

  return messages;
};

export const getUserAnswer = (
  interactionId: string,
  output: IDmbtMessageOutput
): IDmbtMessage => {
  return {
    id: `${interactionId}-answer`,
    nodeId: interactionId,
    content: "",
    output,
    meta: {
      isUser: true,
      silent: false,
      time: new Date().toISOString(),
    },
  };
};

export const getInitialState = (
  shape: IDmbtShape,
  savedState?: IDmbtState,
  externalVariables?: any
): IDmbtState => {
  if (savedState) {
    return savedState;
  }

  const startNode = getBotStartingNode(shape) as IDmbtNode;
  const variables = externalVariables || {};

  return {
    variables,
    processed: [],
    active: getNodeMessages(startNode, variables),
    activeInteraction: undefined,
    interactionProgress: [],
    finished: false,
    loading: false,
  };
};
