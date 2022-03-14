import { Avatar } from "grommet";
import { get, isEmpty } from "lodash";
import {
  IDmbtState,
  IDmbtShape,
  START_NODE_TYPE,
  IDmbtNode,
  IDmbtMessage,
  IDmbtMessageOutput,
  DEFAULT_NODE_PORT,
  IDmbtPort,
} from "./definitions";
import * as AllIcons from "grommet-icons";

const navigateObjectPropertiesAndSubastitute = (path: string, bag: any) => {
  return get(bag, path, undefined);
};

export const substituteVars = (
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

export const substituteVarsInObject = (data: any, metadata: any): any => {
  if (isEmpty(metadata)) {
    return data;
  }

  let text = JSON.stringify(data); // stringify data object
  // eslint-disable-next-line
  const myregexp = /\${([\[\]a-z\d.]+)}/i; // regex to match the content to be replaced in data
  let match;
  let new_data = "";
  while ((match = myregexp.exec(text))) {
    // loop all matches
    try {
      // Example: [0]=${user.name} / [1]=user.name
      new_data = text.replace(match[0], get(metadata, match[1]) || match[1]);
      text = new_data;
    } catch (err: any) {
      console.log("Requested element doesn't exist", err.message);
    }
    match = myregexp.exec(text);
  }

  const ret = new_data ? JSON.parse(new_data) : data;
  return ret;
};

export const BUBBLE_DELIMITER = "<dumbot-boubble/>";

export const getBotStartingNode = (state: IDmbtShape) => {
  const nodes = Object.keys(state.nodes).map((k) => state.nodes[k]);
  return nodes.find(
    (el) => el.type === START_NODE_TYPE || el.properties?.asStart
  );
};

export const prepareInteractionNode = (
  node: IDmbtNode,
  variables: any
): IDmbtNode => {
  const ports = Object.keys(node.ports).reduce(
    (acc: { [key: string]: IDmbtPort }, key) => {
      const currPort = node.ports[key];
      const text = substituteVars(currPort.text, variables);
      const value = currPort.value
        ? substituteVars(currPort.value, variables)
        : text;
      return {
        ...acc,
        [`${key}`]: {
          ...currPort,
          text,
          value,
        },
      };
    },
    {}
  );

  return {
    ...node,
    ports,
  };
};

export const getNodeMessages = (
  node: IDmbtNode | undefined,
  variables: any
): IDmbtMessage[] => {
  if (!node) {
    return [];
  }

  if (!node.content) {
    return [
      {
        id: `${node.id}-silentpart}`,
        nodeId: node.id,
        output: {
          id: node.id,
          value: undefined,
          type: "message",
          port: DEFAULT_NODE_PORT,
        },
        content: "silent message",
        interactive: node.user,
        meta: {
          silent: true,
          time: new Date().toISOString(),
        },
      },
    ];
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
        width: node.properties?.width,
      },
    };
    return msg;
  });

  return messages;
};

export const getUserAnswer = (
  interactionId: string,
  output: IDmbtMessageOutput,
  meta?: { [key: string]: any }
): IDmbtMessage => {
  return {
    id: `${interactionId}-answer`,
    nodeId: interactionId,
    content: "",
    output,
    meta: {
      ...(meta || {}),
      isUser: true,
      silent: meta?.silent || false,
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

export const getPortsArray = (
  portDictionary: { [key: string]: IDmbtPort },
  keepDefault = false
): IDmbtPort[] =>
  Object.entries(portDictionary)
    .filter((e) => (keepDefault ? e[1] : e[0] !== DEFAULT_NODE_PORT))
    .map((e) => ({
      key: e[0],
      ...e[1],
    }));

// eslint-disable-next-line
const getImageIcon = (src: string) => (props: any) =>
  <Avatar src={src} className="dbot-icon" size="20px" {...props} />;
export const GetIcon = (icon?: string) =>
  icon ? (AllIcons as any)[icon] || getImageIcon(icon) : null;
