import { get, isEmpty } from "lodash";
import { DEFAULT_PORT_ID as DefaultPort } from ".";
import {
  BotNodeOutputType,
  BUBBLE_DELIMITER,
  DEFAULT_PORT_ID,
  IBotNode,
  IBotNodeInteractionProps,
  IBotState,
  IMessage,
} from "./definitions";
import { DumbotNotification } from "./Notification";
import * as AllIcons from "grommet-icons";
import { Avatar } from "grommet";

export const convertToType = ({
  value,
  type,
}: {
  value: any;
  type: BotNodeOutputType;
}) => {
  const varType = typeof value;
  if (varType === type) {
    return value;
  }

  switch (type) {
    case "string":
      return value.toString();
    case "number":
      return Number(value);
    case "date":
      return new Date(value);
    default:
      return value;
  }
};

export const getNodeFromState = (state: IBotState, id: string) => {
  return state.nodes.find((el) => el.id === id) as IBotNode;
};

export const getBotStartingNode = (state: IBotState) => {
  return state.nodes.find((el) => el.type === "start");
};

export const getNextBotNodeId = (
  state: IBotState,
  fromNodeId: string,
  fromPortId: string
) => {
  // calculate next id on the path and fallback to default port
  const defaultPortId: DEFAULT_PORT_ID = "default";
  return (
    state.paths[`${fromNodeId}-${fromPortId}`] ||
    state.paths[`${fromNodeId}-${defaultPortId}`]
  );
};

export const getContentForMessage = (
  message: IMessage,
  viewSilentNodes: boolean
) => {
  if (message.silent && !viewSilentNodes) {
    return "";
  }

  if (message.user && message.output?.type) {
    const value =
      message.output.type === "object"
        ? encodeURIComponent(JSON.stringify(message.output.value))
        : message.output.value;
    return `<useranswer type="${message.output.type}" value="${value}"></useranswer>`;
  }

  return message.nodeContent;
};

const navigateObjectPropertiesAndSubastitute = (path: string, bag: any) => {
  return get(bag, path, undefined);
};

export const substituteVarsInObject = (data: any, metadata: any): any => {
  metadata = {
    test: [1, 2, 3, 4, 5, 6],
    test1: {
      name: "pietro",
    },
  };
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

export const substituteVars = (
  templateString: string | undefined,
  templateVariables: { [key: string]: any }
): string | undefined => {
  if (!templateString) {
    return undefined;
  }

  return templateString.replace(
    /\${(.*?)}/g,
    (_, g) =>
      navigateObjectPropertiesAndSubastitute(g, templateVariables) || `$\{${g}}`
  );
};

export const getInteractionLabel = (content: string) => {
  if (!content.replaceAll) {
    const regExp = new RegExp(BUBBLE_DELIMITER, "g");
    return content.replace(regExp, `\n`);
  }
  return content.replaceAll(BUBBLE_DELIMITER, `\n`);
};

// eslint-disable-next-line
const getImageIcon = (src: string) => (props: any) =>
  <Avatar src={src} className="dbot-icon" size="20px" {...props} />;
export const GetIcon = (icon?: string) =>
  icon ? (AllIcons as any)[icon] || getImageIcon(icon) : null;

export const MissingExternalComponent = (props: IBotNodeInteractionProps) => {
  const message = `Node type ${props.node.type} not implemented. Moving to next node`;
  return (
    <DumbotNotification
      message={message}
      status="warning"
      onClose={() =>
        props.onUserAction({
          value: message,
          port: DefaultPort,
          type: "string",
          id: props.node.id 
        })
      }
    />
  );
};
