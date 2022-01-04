import { ThemeType } from "grommet";
import { Colors } from "grommet/themes/base";
import { PlaceHolderType } from "grommet/utils";
export type BotNodeType = "question" | "buttons" | "start" | "message" | string;

export type BotNodeOutputType =
  | "string"
  | "number"
  | "array"
  | "date"
  | "boolean"
  | "object"
  | "null"
  | "password"
  | "file"
  | "color"
  | "error"
  | "text";

export type Actions =
  | "onBack"
  | "onGetNextMessage"
  | "onUserAction"
  | "onSetVariable"
  | "onChatMessage"
  | "onBotRestart";

export const BUBBLE_DELIMITER = "<dumbot-boubble/>";

export type DEFAULT_PORT_ID = "default";
export const DEFAULTPORT: DEFAULT_PORT_ID = "default";

export interface IUserAction {
  type: BotNodeOutputType;
  value: any;
  port: string;
  id?: string;
}

export interface ISetVariable {
  id: string;
  value: any;
}

export interface IChatMessage {
  content: string;
  avatarSrc?: string;
  id?: string;
  user: boolean;
  metadata: IChatMessageMetadata;
}

export type BotActionPayload =
  | IUserAction
  | IMessage
  | IBotNode
  | ISetVariable
  | IChatMessage;

export interface IBotNode {
  id: string;
  type: BotNodeType;
  content: string;
  title: string;
  output: {
    id: string;
    type: BotNodeOutputType;
  };
  properties: {
    [key: string]: any;
    ports?: {
      [key: string]: {
        [key: string]: any;
      };
    };
  };
  ports: [DEFAULT_PORT_ID, ...string[]];
  user: boolean;
  silent?: boolean;
  prevOutput?: {
    value: any;
    type: BotNodeOutputType;
  };
}

export interface IChatMessageMetadata {
  nickname: string;
  label: string;
  bgColor?: string;
  color?: string;
  avatarSrc?: string;
  nicknameColor?: string;
  width?: string;
}

export interface IMessage {
  user: boolean;
  silent?: boolean;
  wasInteractive?: boolean;
  id: string;
  nodeId: string;
  output?: {
    value: any;
    type: BotNodeOutputType;
    id?: string;
  };
  exitPort: string;
  nodeContent: string;
  chatMetadata?: IChatMessageMetadata;
}

export interface IStartNode extends IBotNode {
  type: "start";
}

export interface IBotState {
  nodes: [IStartNode, ...IBotNode[]];
  paths: {
    [key: string]: string;
  };
  finished?: boolean;
  variables: { [key: string]: any };
  processedMessages: IMessage[];
  activeMessage: IMessage | null;
  activeInteraction: IBotNode | null;
}

export interface IBotThemableProps {
  bubblePxRadius?: string;
  bubbleFontSize?: string;
  bubbleMaxWidth?: string;
  bubbleBoxShadow?: string;
  bubblePadding?: string;
  avatarClock?: boolean;
  headerHeight?: string;
  headerLogoSize?: string;
  headerFontSize?: string;
  headerText?: string;
  headerTextAlign?: string;
  headerLogo?: string;
  footerHeight?: string;
  footerFontSize?: string;
  footerText?: string;
  footerTextAlign?: string;
  userAvatar?: string;
  botAvatar?: string;
  messageDelay?: number;
  avatarSize?: string;
  disableAvatars?: boolean;
  bubbleAnimationDuration?: string;
  bubbleWidth?: string;
  maxBotColumnSize?: string;
  finalMessageContent?: string;
  minBotColumnSize?: string;
  allowRestartOnEnd?: boolean;
  jsonViewerTheme?: string;
  buttonsRadius?: string;
  onlyIconButtonsRadius?: string;
  botCodeHighLightTheme?: string;
  userNick?: string;
  dumbotNick?: string;
}

export interface IBotThemableColors extends Colors {
  botBackground: string;
  botBubbleColor: string;
  botFontColor: string;
  botUserBubbleColor: string;
  botUserFontColor: string;
  optionsColor: string;
  botUserAvatarBg: string;
  botAvatarBg: string;
  botFocusColor: string;
  botHeaderLogoBgColor: string;
  botHeaderBgColor: string;
  botHeaderFontColor: string;
  botFooterBgColor: string;
  botFooterFontColor: string;
  botAvatarClockFontColor: string;
  botTriggerButtonHoverColor: string;
  botTriggerButtonColor: string;
  botTriggerButtonBackgroundColor: string;
  botInputControlsFontColor: string;
  botInputBoxBgColor: string;
  botCloseButtonBgColor: string;
  botBackButtonBgColor: string;
  botCloseButtonFontColor: string;
  botBackButtonFontColor: string;
  tipColor: string;
}

export type IBotTheme = ThemeType & {
  bot?: IBotThemableProps;
};

export type BotInputType = "input" | "masked" | "textarea" | "file";

export interface IInputControlProperties
  extends Omit<
    JSX.IntrinsicElements["input"],
    "onSelect" | "size" | "placeholder"
  > {
  suggestions?: string[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  icon?: string;
  placeholder?: PlaceHolderType;
  libraryMask?: string;
  mask?: Array<{
    length?: number | number[];
    fixed?: string;
    options?: string[] | number[];
    regexp?: any;
    placeholder?: string;
  }>;
  validationErrorMessage?: string;
  controlType: BotInputType;
}

export interface IInputComponentProps {
  inputProps: IInputControlProperties;
  isValid: boolean;
  focused: boolean;
  value: string;
  onChange: (value: any) => void;
  onFocus: (focused: boolean) => void;
  onSubmit: () => void;
  fontColor: string;
  Icon?: JSX.Element | undefined;
}

export interface IButtonsProps {
  multiple?: boolean;
  min?: number;
  max?: number;
  direction?: "row" | "column";
  icon?: string;
  ports: IPortProps;
}

export interface IPortProps {
  [key: string]: {
    icon?: string;
    text?: string;
    value?: string;
  };
}

export interface ISnippetContext {
  variables: { [key: string]: any };
  ports: { [key: string]: string };
  nodeId: string;
  theme: IBotTheme;
  onCallHost: (
    label: string,
    variables: { [key: string]: any }
  ) => Promise<any>;
  onSetVariable: (name: string, value: any) => void;
}

export interface ICustomNodeContext extends ISnippetContext {
  onUserAction: (value: any, port: string) => void;
  onSendAttachments: (attachments: any[]) => Promise<void>;
}

export interface IBotNodeInteractionLoaderProps {
  node: IBotNode | null;
  variables: { [key: string]: any };
  preview?: boolean;
  customProps?: { [key: string]: any };
  onSendAttachments: (attachments: any[]) => Promise<void>;
  onCallHost: (
    label: string,
    variables: { [key: string]: any }
  ) => Promise<any>;
  onSetVariable: (name: string, value: any) => void;
  onSizeChanged: (w: number, h: number) => void;
  onComponentError?: (error: any) => void;
  onUserAction: (answer: {
    value: any;
    port: string;
    type: BotNodeOutputType;
    id: string;
  }) => void;
  onLoaded: (ref: React.RefObject<any>) => void;
}

export interface IBotNodeInteractionProps
  extends IBotNodeInteractionLoaderProps {
  node: IBotNode;
  theme: IBotTheme;
}

export interface IDumbotProps {
  initialState: IBotState;
  botUUID: string;
  uuid?: string;
  trigger?: {
    icon?: string;
    size: "small" | "medium" | "large";
  };
  initiallyClosed?: boolean;
  allowClose?: boolean;
  theme?: IBotTheme;
  externalVariables?: { [key: string]: any };
  viewSilentNodes?: boolean;
  mode?: "full" | "popup" | "inline" | "chat";
  className?: string;
  height?: string;
  width?: string;
  onToggle?: (opened: boolean) => void;
  onUserAction?: (answer: {
    value: any;
    port: string;
    type: BotNodeOutputType;
    id: string;
  }) => void;
  onCallHost?: (label: string, variables: any) => Promise<any>;
  onSetVariable?: (name: string, value: any) => void;
  onSizeChanged?: (width: number, height: number) => void;
  onSendAttachments?: (files: any[]) => Promise<void>;
  onStateChanging?: (
    state: IBotState,
    type: Actions,
    payload: BotActionPayload
  ) => void;
  onStateChanged?: (state: IBotState) => void;
  onBotFinished?: (state: IBotState) => void;
  onGetExternalComponent?: (
    props: IBotNodeInteractionProps
  ) => (props: IBotNodeInteractionProps) => JSX.Element;
  renderErrorDetails?: (error: any) => JSX.Element;
  disableAutofocus?: boolean;
}

export const USERANSWER = "<USERANSWER/>";
