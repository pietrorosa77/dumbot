import { Colors, ThemeType } from "grommet/themes/base";

export const START_NODE_TYPE = "start";
export const DEFAULT_NODE_PORT = "default";

export interface IDmbtPort {
  id: string;
  text: string;
  index: number;
  value?: string;
  icon?: string;
  [key: string]: any;
}

export interface IDmbtNode {
  id: string;
  type: string;
  content: string;
  output: {
    id: string;
    type: string;
  };
  properties?: {
    width?: string;
    asStart?: boolean;
    displayAs: "message" | "footer";
    [key: string]: any;
  };
  ports: {
    [key: string]: IDmbtPort;
  };
  user: boolean;
  silent?: boolean;
}

export interface IDmbtShape {
  nodes: {
    [id: string]: IDmbtNode;
  };
  paths: { [id: string]: string };
}

export interface IDmbtMessageOutput {
  type: string;
  value: any;
  id: string;
  port: string;
  meta?: { [key: string]: any };
}

export interface IDmbtMessage {
  id: string;
  nodeId: string;
  content: string;
  interactive?: boolean;
  output: IDmbtMessageOutput;
  meta: {
    isUser?: boolean;
    leaingGroup?: boolean;
    nickname?: string;
    time?: string;
    silent?: boolean;
    avatarSrc?: string;
    bgColor?: string;
    nicknameColor?: string;
    hasAvatar?: boolean;
    width?: string;
    [key: string]: any;
  };
}

export interface IDmbtState {
  processed: IDmbtMessage[];
  active: IDmbtMessage[];
  activeInteraction?: string;
  interactionProgress: string[];
  finished?: boolean;
  loading?: boolean;
  variables: { [key: string]: any };
}

export interface IDmbtInteractionProps {
  node: IDmbtNode;
  theme: IBotTheme;
  variables: any;
  dispatcher: DmbtDispatch;
  onCallHost?: (
    hostFunctionName: string,
    parameters: { [key: string]: any }
  ) => Promise<any>;
}

export interface IDmbtProps {
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
  mode?: "full" | "popup" | "inline" | "chat";
  className?: string;
  height?: string;
  width?: string;
  viewSilentNodes?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  onToggle?: (opened: boolean) => void;
  onCallHost?: (label: string, variables: any) => Promise<any>;
  onStateChanged?: (data: {
    new: IDmbtState;
    prev: IDmbtState;
    action: SimpleAction;
  }) => void;
  onBotFinished?: (state: IDmbtState) => void;
  onSendDataToHost?: (data: any) => void;
  disableAutofocus?: boolean;
  customInteractions?: Map<
    string,
    (props: IDmbtInteractionProps) => JSX.Element
  >;
  customMessageDisplay?: Map<
    string,
    (props: { message: IDmbtMessage }) => JSX.Element
  >;
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
  headerText?: string;
  headerTextAlign?: string;
  headerLogo?: string;
  footerHeight?: string;
  footerText?: string;
  footerTextAlign?: string;
  userAvatar?: string;
  botAvatar?: string;
  messageDelay?: number;
  avatarSize?: number;
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
  botUserBubbleColor: string;
  botBackground: string;
  botTriggerButtonColor: string;
  botTriggerButtonBackgroundColor: string;
  botCodeBg: string;
  botSpecialTagsBackground: string;
}

export type IBotTheme = ThemeType & {
  bot?: IBotThemableProps;
};

export type DmbtActionType =
  | "@next"
  | "@prev"
  | "@answer"
  | "@variable"
  | "@message"
  | "@restart"
  | "@loading"
  | DmbtEvents;

export type SimpleAction = {
  type: DmbtActionType;
  payload: any;
};
export type DmbtAction = SimpleAction | ((store: DmbtStore) => any);

export type DmbtDispatch = (action: DmbtAction) => any;

export type DmbtStore = {
  getState: () => IDmbtState;
  dispatch: DmbtDispatch;
  getEventBus: () => IDmbtEventBus;
};

export type DmbtMiddlewhare = (
  store: DmbtStore
) => (next: DmbtDispatch) => (action: DmbtAction) => any;

export type DmbtEventBusUnsubscibeHandle = (event: CustomEvent) => void;
export type DmbtEvents = "dmbt-StateChanged" | "evt-SendDataToHost";

export interface IDmbtEventBus {
  subscribe: (
    event: DmbtEvents,
    callback: (data?: any) => void,
    options?: AddEventListenerOptions
  ) => DmbtEventBusUnsubscibeHandle;

  unSubscribe: (
    event: DmbtEvents,
    unsubscribeHandle: DmbtEventBusUnsubscibeHandle,
    options?: AddEventListenerOptions
  ) => void;

  emit: (type: DmbtEvents, data: any) => void;
}

export interface IDisplayResponseProps {
  message: IDmbtMessage;
  theme: IBotTheme;
}
