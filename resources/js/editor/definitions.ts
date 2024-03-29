export const START_NODE_TYPE = 'start';
export const DEFAULT_NODE_PORT = 'default';

export interface IDmbtChoiceProps {
  value?: any;
  icon?: string;
  rounded?: boolean;
  outlined?: boolean;
  className?: string;
  severity?:
    | 'danger'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined;
  badge?: string;
  badgeClassName?: string;
}

export interface IDmbtNodeProps {
  className?: string;
  asStart?: boolean;
  placeholder?: string;
  helpText?: string;
  label?: string;
  validationErrorMessage?: string;
  id?: string;
}

export interface IDmbtQuestionProps extends IDmbtNodeProps {
  pattern?: RegExp;
  sendIcon?: string;
  sendClassName?: string;
  leftAddons?: string[];
  rightAddons?: string[];
}

export interface IDmbtJSSnippetProps extends IDmbtNodeProps {
  code: string;
}

export interface IDmbtExternalComponentProps extends IDmbtNodeProps {
  componentUrl: string;
  componentName: string;
  tag: string;
}

export interface IDmbtMultichoiceProps extends IDmbtNodeProps {
  min?: number;
  max?: number;
}

export interface IDmbtPort {
  id: string;
  text: string;
  value?: any;
  index: number;
  properties: IDmbtChoiceProps;
}

export interface IDmbtNode {
  title: string;
  id: string;
  type: string;
  content: string[];
  output: {
    id: string;
    type: string;
  };
  properties?: { displayAs: 'message' | 'footer' | 'full' } & IDmbtNodeProps;
  ports: {
    [key: string]: IDmbtPort;
  };
  user: boolean;
  silent?: boolean;
  asStart?: boolean;
}

export interface IDmbtShape {
  nodes: {
    [id: string]: IDmbtNode;
  };
  paths: { [id: string]: string };
  name: string;
  id: string;
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
  content: string[];
  interactive?: boolean;
  output: IDmbtMessageOutput;
  meta: {
    isUser?: boolean;
    leadingGroup?: boolean;
    nickname?: string;
    format?: string;
    time?: string;
    silent?: boolean;
    avatarSrc?: string;
    hasAvatar?: boolean;
    containerclassName?: string;
    messageClassName?: string;
    nicknameClassName?: string;
    avatarClassName?: string;
  };
}

export interface IDmbtState {
  processed: IDmbtMessage[];
  active: IDmbtMessage[];
  activeInteraction?: string;
  interactionProgress: string[];
  finished?: boolean;
  loading?: boolean;
  error?: boolean;
  variables: { [key: string]: any };
}

export interface IBotSettings {
  headerText?: string;
  headerLogo?: string;
  footerText?: string;
  userAvatar?: string;
  botAvatar?: string;
  disableAvatars?: boolean;
  showMessageNickName?: boolean;
  showMessageClock?: boolean;
  allowRestartOnEnd?: boolean;
  jsonViewerTheme?: string;
  userNick?: string;
  dumbotNick?: string;
  messageDelay?: number;
  defaultFontSize?: number;
  defaultFontScales?: number[];
  defaultInputStyle?: string;
}

export interface IDmbtInteractionProps {
  node: IDmbtNode;
  state: IDmbtState;
  dispatcher: DmbtDispatch;
  customInteractions?: Map<
    string,
    (props: IDmbtInteractionProps) => JSX.Element
  >;
  onCallHost?: (
    hostFunctionName: string,
    parameters: { [key: string]: any }
  ) => Promise<any>;
  onLoading: (loading: boolean) => void;
  onValidation: (valid: boolean, message: string) => void;
  customCssTheme?: string;
}

export interface IDmbtProps {
  botUUID: string;
  uuid?: string;
  trigger?: {
    image?: string;
    severity?:
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'danger'
      | undefined;
  };
  initiallyClosed?: boolean;
  externalVariables?: { [key: string]: any };
  mode?: 'full' | 'popup' | 'inline' | 'chat';
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
  customMessageDisplay?: Map<string, (props: IDmbtMessage) => JSX.Element>;
}

export type DmbtActionType =
  | '@next'
  | '@prev'
  | '@answer'
  | '@variable'
  | '@message'
  | '@restart'
  | '@loading'
  | '@error'
  | '@instantMessage'
  | '@jump'
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
export type DmbtEvents =
  | 'dmbt-StateChanged'
  | 'evt-SendDataToHost'
  | 'evt-restart';

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

export interface IDumbotSnippetContext {
  variables: { [key: string]: any };
  ports: { [key: string]: string };
  nodeId: string;
  onCallHost: (
    hostFunctionName: string,
    parameters: {
      [key: string]: any;
    }
  ) => Promise<any>;
  onSetVariable: (name: string, value: any) => void;
}

export interface IAPPView {
  title: string;
  render: (root: HTMLElement | null, params?: any) => void;
  cleanup?: () => void;
}

export interface IChartActions {
  onNodeChanged: (nodeId: string, node: IDmbtNode) => void;
}

export interface INavigateArgs {
  to: string;
  params?: any;
}

export const NodeTypes = {
  TAGS: 'tags',
  NUMERIC: 'numeric',
  EXTERNAL: 'external',
  COLOR: 'color',
  DATE: 'date',
  TIME: 'time',
  LONGTEXT: 'longText',
  QUESTION: 'question',
  MASK: 'mask',
  BUTTONS: 'buttons',
  MULTIBUTTONS: 'multiButtons',
  CODE: 'code'
};

export const TriggerStyle = {
  width: '92px',
  height: '92px',
  padding: '0',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  borderRadius: '50%'
};
