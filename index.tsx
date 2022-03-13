/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { Dumbot } from "./src/bot/Bot";
import { IDmbtMessage, IDmbtShape } from "./src/bot/definitions";
import { testBotDefiniton } from "./testdata";

const BotShape: IDmbtShape = {
  nodes: testBotDefiniton.chart.nodes,
  paths: testBotDefiniton.chart.paths,
};

const CustomDisplay = new Map([
  [
    "message",
    (props: { message: IDmbtMessage }) => (
      <pre>{JSON.stringify(props.message, null, 4)}</pre>
    ),
  ],
  [
    "text",
    (props: { message: IDmbtMessage }) => (
      <pre>{JSON.stringify(props.message, null, 4)}</pre>
    ),
  ],
]);

ReactDOM.render(
  <React.StrictMode>
    <Dumbot
      botUUID="testBot"
      shape={BotShape}
      allowClose
      log={false}
      onToggle={(opened: boolean) => {
        //console.log(opened);
      }}
      onSendDataToHost={(data) => {
        console.log("onSendDataToHost", data);
      }}
      onStateChanged={(data) => {
        console.log("STATECHANGED", data);
      }}
      onBotFinished={(state) => {
        console.log("FINISHED");
      }}
      onCallHost={async () => {
        const res = await fetch("https://gorest.co.in/public/v1/users");
        return await res.json();
      }}
      externalVariables={{
        test: {
          names: ["pietro", "tommaso", "filippo"],
        },
      }}
      // customMessageDisplay={CustomDisplay}
      theme={{
        global: {
          colors: {
            gold: {
              dark: "#df9007",
              light: "#e7b86b",
            },
            "gold!": "#F9B644",
            brand: "black",
            "accent-1": "gold!",
            active: "gold!",
            botUserBubbleColor: "cornflowerblue",
          },
        },
        bot: {
          buttonsRadius: "6px",
          messageDelay: 1500,
        },

        // button: {
        //   padding: {
        //     horizontal: "10px",
        //     vertical: "10px",
        //   },
        //   extend: `background: skyblue; border: 5px dotted green;hover:red`,
        //   hover: {
        //     background: { color: "red" },
        //     secondary: {
        //       border: { color: "active" },
        //     },
        //   },
        // },
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
