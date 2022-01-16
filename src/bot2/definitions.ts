import { Colors, ThemeType } from "grommet/themes/base";

export const START_NODE_TYPE = "start";
export const DEFAULT_NODE_PORT = "default";

export interface IDmbtNode {
  id: string;
  type: string;
  content: string;
  output: {
    id: string;
    type: string;
  };
  properties?: {
    [key: string]: any;
  };
  ports: {
    [key: string]: {
      [key: string]: any;
    };
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
}

export interface IDmbtMessage {
  id: string;
  nodeId: string;
  content: string;
  interactive?: boolean;
  output: IDmbtMessageOutput;
  meta: {
    isUser?: boolean;
    nickname?: string;
    time?: string;
    silent?: boolean;
    avatarSrc?: string;
    bgColor?: string;
    nicknameColor?: string;
    hasAvatar?: boolean;
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
  onToggle?: (opened: boolean) => void;
  onUserAnswer?: (answer: IDmbtMessageOutput) => void;
  onCallHost?: (label: string, variables: any) => Promise<any>;
  onSetVariable?: (name: string, value: any) => void;
  onSendAttachments?: (files: any[]) => Promise<void>;
  onStateChanged?: (state: IDmbtState) => void;
  onBotFinished?: (state: IDmbtState) => void;
  disableAutofocus?: boolean;
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

export type SimpleAction = {
  type:
    | "@next"
    | "@prev"
    | "@answer"
    | "@variable"
    | "@message"
    | "@restart"
    | "@loading";
  payload: any;
};
export type DmbtAction = SimpleAction | any;

export type DmbtDispatch = (action: DmbtAction) => any;

export type DmbtStore = {
  getState: () => IDmbtState;
  dispatch: DmbtDispatch;
};

export type DmbtMiddlewhare = (
  store: DmbtStore
) => (next: DmbtDispatch) => (action: DmbtAction) => any;
