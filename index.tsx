/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { Dumbot } from "./src/bot2/Bot";
import { IDmbtShape } from "./src/bot2/definitions";
import { testBotDefiniton } from "./testdata";

const BotShape: IDmbtShape = {
  nodes: testBotDefiniton.chart.nodes,
  paths: testBotDefiniton.chart.paths,
};

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
      //   onUserAction={(answer) => {
      //     console.log("USERANSWER", answer);
      //   }}
      //   onSetVariable={(name, value) => {
      //     console.log("SETTINGVARIABLE", name, value);
      //   }}
      //   onStateChanging={(state, type, payload) => {
      //     console.log("STATECHANGING", type, payload);
      //   }}
      //   onStateChanged={(state) => {
      //     console.log("STATECHANGED", state);
      //   }}
      //   onBotFinished={(state) => {
      //     console.log("FINISHED");
      //   }}
      //   onCallHost={async () => {
      //     const res = await fetch("https://gorest.co.in/public/v1/users");
      //     return await res.json();
      //   }}
      externalVariables={{
        test: {
          names: ["pietro", "tommaso", "filippo"],
        },
      }}
      theme={{
        bot: {
          buttonsRadius: "6px",
          messageDelay: 1500,
        },
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
