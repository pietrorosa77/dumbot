import {
  IBotThemableColors,
  IBotThemableProps,
  IBotTheme,
} from "./definitions";
import { deepMerge } from "grommet/utils";
import { base } from "grommet/themes";
import {
  FormClose,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall,
} from "grommet-icons";

const defaultbotAvatar =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiBkPSJNMzAyLjU0NSw2OS44MThjMC0yNS43MDctMjAuODQtNDYuNTQ1LTQ2LjU0NS00Ni41NDVzLTQ2LjU0NSwyMC44MzgtNDYuNTQ1LDQ2LjU0NQ0KCWMwLDE3LjIyNSw5LjM2NSwzMi4yNTQsMjMuMjczLDQwLjMwNHY4My44MThoNDYuNTQ1di04My44MThDMjkzLjE4MSwxMDIuMDczLDMwMi41NDUsODcuMDQzLDMwMi41NDUsNjkuODE4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzVBOEJCMDsiIGQ9Ik0yNTYsMjMuMjczdjE3MC42NjdoMjMuMjczdi04My44MThjMTMuOTA4LTguMDQ5LDIzLjI3My0yMy4wNzcsMjMuMjczLTQwLjMwNA0KCUMzMDIuNTQ1LDQ0LjExMSwyODEuNzA1LDIzLjI3MywyNTYsMjMuMjczeiIvPg0KPHJlY3QgeT0iMjQwLjQ4NSIgc3R5bGU9ImZpbGw6IzkzQzdFRjsiIHdpZHRoPSIyNDguMjQyIiBoZWlnaHQ9IjEyNC4xMjEiLz4NCjxyZWN0IHg9IjI2My43NTgiIHk9IjI0MC40ODUiIHN0eWxlPSJmaWxsOiM1QThCQjA7IiB3aWR0aD0iMjQ4LjI0MiIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSIxODYuMTgyIiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojOTNDN0VGOyIgd2lkdGg9IjEzOS42MzYiIGhlaWdodD0iMTI0LjEyMSIvPg0KPHJlY3QgeD0iMjU2IiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojNUE4QkIwOyIgd2lkdGg9IjY5LjgxOCIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSI0Ni41NDUiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiNDQ0U5Rjk7IiB3aWR0aD0iNDE4LjkwOSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cmVjdCB4PSIyNTYiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiB3aWR0aD0iMjA5LjQ1NSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0M1RDc2OyIgZD0iTTE5My45MzksMjcxLjUxNWMwLDE3LjEzOC0xMy44OTQsMzEuMDMtMzEuMDMsMzEuMDNsMCwwYy0xNy4xMzYsMC0zMS4wMy0xMy44OTItMzEuMDMtMzEuMDNsMCwwDQoJYzAtMTcuMTM4LDEzLjg5NC0zMS4wMywzMS4wMy0zMS4wM2wwLDBDMTgwLjA0NiwyNDAuNDg1LDE5My45MzksMjU0LjM3NywxOTMuOTM5LDI3MS41MTVMMTkzLjkzOSwyNzEuNTE1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMkUzQjsiIGQ9Ik0zODAuMTIxLDI3MS41MTVjMCwxNy4xMzgtMTMuODk0LDMxLjAzLTMxLjAzLDMxLjAzbDAsMGMtMTcuMTM3LDAtMzEuMDMtMTMuODkyLTMxLjAzLTMxLjAzbDAsMA0KCWMwLTE3LjEzOCwxMy44OTQtMzEuMDMsMzEuMDMtMzEuMDNsMCwwQzM2Ni4yMjcsMjQwLjQ4NSwzODAuMTIxLDI1NC4zNzcsMzgwLjEyMSwyNzEuNTE1TDM4MC4xMjEsMjcxLjUxNXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzVENzY7IiBkPSJNMTg2LjE4MiwzNDkuMDkxYzAsMzguNTU4LDMxLjI1OCw2OS44MTgsNjkuODE4LDY5LjgxOGwwLDBjMzguNTU4LDAsNjkuODE4LTMxLjI2LDY5LjgxOC02OS44MTgNCglIMTg2LjE4MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRTJFM0I7IiBkPSJNMjU2LDM0OS4wOTFjMCwzOC41NTgsMCw0Ni41NDUsMCw2OS44MThsMCwwYzM4LjU1OCwwLDY5LjgxOC0zMS4yNiw2OS44MTgtNjkuODE4SDI1NnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K";
const defaultuserAvatar =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTMgNTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUzIDUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojZWRlZWY5OyIgZD0iTTE4LjYxMyw0MS41NTJsLTcuOTA3LDQuMzEzYy0wLjQ2NCwwLjI1My0wLjg4MSwwLjU2NC0xLjI2OSwwLjkwM0MxNC4wNDcsNTAuNjU1LDE5Ljk5OCw1MywyNi41LDUzICBjNi40NTQsMCwxMi4zNjctMi4zMSwxNi45NjQtNi4xNDRjLTAuNDI0LTAuMzU4LTAuODg0LTAuNjgtMS4zOTQtMC45MzRsLTguNDY3LTQuMjMzYy0xLjA5NC0wLjU0Ny0xLjc4NS0xLjY2NS0xLjc4NS0yLjg4OHYtMy4zMjIgIGMwLjIzOC0wLjI3MSwwLjUxLTAuNjE5LDAuODAxLTEuMDNjMS4xNTQtMS42MywyLjAyNy0zLjQyMywyLjYzMi01LjMwNGMxLjA4Ni0wLjMzNSwxLjg4Ni0xLjMzOCwxLjg4Ni0yLjUzdi0zLjU0NiAgYzAtMC43OC0wLjM0Ny0xLjQ3Ny0wLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLDEuMDUzLTcuOTc3LTkuNzUtNy45NzdzLTkuNzUsNy45NzctOS43NSw3Ljk3N3Y1LjEyNiAgYy0wLjU0LDAuNDg4LTAuODg2LDEuMTg1LTAuODg2LDEuOTY1djMuNTQ2YzAsMC45MzQsMC40OTEsMS43NTYsMS4yMjYsMi4yMzFjMC44ODYsMy44NTcsMy4yMDYsNi42MzMsMy4yMDYsNi42MzN2My4yNCAgQzIwLjI5NiwzOS44OTksMTkuNjUsNDAuOTg2LDE4LjYxMyw0MS41NTJ6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsiIGQ9Ik0yNi45NTMsMC4wMDRDMTIuMzItMC4yNDYsMC4yNTQsMTEuNDE0LDAuMDA0LDI2LjA0N0MtMC4xMzgsMzQuMzQ0LDMuNTYsNDEuODAxLDkuNDQ4LDQ2Ljc2ICAgYzAuMzg1LTAuMzM2LDAuNzk4LTAuNjQ0LDEuMjU3LTAuODk0bDcuOTA3LTQuMzEzYzEuMDM3LTAuNTY2LDEuNjgzLTEuNjUzLDEuNjgzLTIuODM1di0zLjI0YzAsMC0yLjMyMS0yLjc3Ni0zLjIwNi02LjYzMyAgIGMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcgICBzOS43NSw3Ljk3Nyw5Ljc1LDcuOTc3djUuMTI2YzAuNTQsMC40ODgsMC44ODYsMS4xODUsMC44ODYsMS45NjV2My41NDZjMCwxLjE5Mi0wLjgsMi4xOTUtMS44ODYsMi41MyAgIGMtMC42MDUsMS44ODEtMS40NzgsMy42NzQtMi42MzIsNS4zMDRjLTAuMjkxLDAuNDExLTAuNTYzLDAuNzU5LTAuODAxLDEuMDNWMzguOGMwLDEuMjIzLDAuNjkxLDIuMzQyLDEuNzg1LDIuODg4bDguNDY3LDQuMjMzICAgYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiLz4NCjwvZz4NCjwvc3ZnPg==";

const BotProps: IBotThemableProps = {
  bubbleFontSize: "14px",
  bubbleMaxWidth: "500px",
  bubbleBoxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.90)",
  bubblePxRadius: "18px",
  bubblePadding: "12px",
  bubbleControlWidth: "100%",
  bubbleControlMaxWidth: "500px",
  headerHeight: "100px",
  headerLogoSize: "40px",
  headerFontSize: "20px",
  headerText: "Welcome to this amazing experience",
  headerTextAlign: "center",
  headerLogo: defaultbotAvatar,
  footerHeight: "65px",
  footerFontSize: "12px",
  footerText: "Powered by Dumbot",
  footerTextAlign: "center",
  botAvatar: defaultbotAvatar,
  userAvatar: defaultuserAvatar,
  finalMessageContent: "Powered by Dumbot!",
  messageDelay: 1000,
  avatarSize: "50px",
  disableAvatars: false,
  allowRestartOnEnd: true,
  bubbleAnimationDuration: "0.5s",
  maxBotColumnSize: "800px",
  minBotColumnSize: "300px",
  avatarClock: true,
  jsonViewerTheme: "rjv-default",
  prefillOldAnswers: true,
};

const BotColors: IBotThemableColors = {
  botBackground: "#cbd2ff",
  botBubbleColor: "#4a4d70",
  botFontColor: "#fff",
  botUserBubbleColor: "#edeef9",
  botUserFontColor: "#4a4a4a",
  optionsColor: "#7D4CDB",
  botUserAvatarBg: "#4a4d70",
  botAvatarBg: "#edeef9",
  botFocusColor: "rgba(81, 203, 238, 1)",
  botHeaderLogoBgColor: "#4a4d70",
  botHeaderBgColor: "#2b2e4b",
  botHeaderFontColor: "#fff",
  botFooterBgColor: "#2b2e4b",
  botFooterFontColor: "#fff",
  botAvatarClockFontColor: "#4a4a4a",
  botTriggerButtonHoverColor: "cornflowerblue",
  botTriggerButtonColor: "#fff",
  botTriggerButtonBackgroundColor: "#2b2e4b",
  botInputControlsFontColor: "#4a4a4a",
  botInputBoxBgColor: "#fff",
  botCloseButtonBgColor: "#4a4d70",
  botBackButtonBgColor: "#4a4d70",
  botCloseButtonFontColor: "#fff",
  botBackButtonFontColor: "#fff",
  tipColor: "#fff",
};

export const DefaultBotFont = {
  family: "'Sora',sans-serif",
  size: "14px",
  face: `/* latin-ext */
  @font-face {
    font-family: 'Sora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/sora/v3/xMQOuFFYT72X5wkB_18qmnndmSdSnk-DKQJRBg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Sora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/sora/v3/xMQOuFFYT72X5wkB_18qmnndmSdSnk-NKQI.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`,
};

export const BotTheme: IBotTheme = deepMerge(base, {
  global: {
    colors: {
      focus: "cornflowerblue",
      hide: "transparent",
      canvasBg: "#3a5584",
      canvasGrid: "rgba(81, 203, 238, 0.1)",
      connection: "cornflowerblue",
      "accent-1": "rgba(81, 203, 238, 1)",
      nodehighlight: "#6FFFB0",
      bars: "#2b2e4b",
      brand: "#4a4d70",
      options: "#7D4CDB",
      ...BotColors,
    },
    font: DefaultBotFont,
    drop: {
      extend: () => {
        return `
          z-index:111111111;
        `;
      },
    },
  },
  tip: {
    drop: {
      background: { color: "botHeaderBgColor", opacity: 0.8 },
      margin: "none",
      round: "medium",
      elevation: "none",
      style: {
        color: BotColors.tipColor,
      },
    },
    content: {
      elevation: "none",
      background: "none",
      pad: "none",
    },
  },
  bot: BotProps,
  textInput: {
    extend: (props: any) => {
      return props.type === "color"
        ? `
          padding: 0px;
          padding-left: ${props.icon ? "48px" : "5px"};
        }`
        : "";
    },
    suggestions: {
      extend: (props: any) => {
        const botFocusColor = props.theme.global.colors.botFocusColor;
        const simpleColor = props.theme.global.colors.botBubbleColor;
        const fontcolor = props.theme.global.colors.botFontColor;
        return `
          color: ${fontcolor};
          background: ${simpleColor};
          li: hover {
            background: ${botFocusColor};
          }
        `;
      },
    },
  },
  notification: {
    time: 8000,
    container: {
      // any box props
      pad: { horizontal: "small", vertical: "xsmall" },
      background: {
        color: "background-front",
      },
    },
    toast: {
      container: {
        // any box props
        elevation: "medium",
        round: "xsmall",
        width: "medium",
      },
      layer: {
        position: "top",
        margin: "medium",
      },
    },
    iconContainer: {
      // any box props
      pad: { right: "small" },
    },
    textContainer: {
      // any box props
      gap: "medium",
    },
    title: {
      // any text props
      weight: "bold",
    },
    message: {
      // any text props
      margin: "none",
    },
    close: {
      icon: FormClose,
    },
    critical: {
      icon: StatusCriticalSmall,
      color: "status-critical",
    },
    warning: {
      icon: StatusWarningSmall,
      color: "status-warning",
    },
    normal: {
      icon: StatusGoodSmall,
      color: "status-ok",
    },
    unknown: {
      icon: StatusUnknownSmall,
      color: "status-unknown",
    },
    undefined: {
      icon: StatusUnknownSmall,
      color: "status-unknown",
    },
  },
});
