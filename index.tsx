/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { data } from "./src/exData";
import { Dumbot } from "./src/bot/Bot";
import {
  BotNodeOutputType,
  BotNodeType,
  DEFAULT_PORT_ID,
  IBotNode,
  IBotState,
  IStartNode,
} from "./src/bot/definitions";
import { Box } from "grommet";

const defPortId: DEFAULT_PORT_ID = "default";
const getInitialState = (): IBotState => {
  const stateString = `{"nodes":[{"id":"node1","content":"Welcome *your* user with a nice **message**!😂","user":false,"title":"Start!","type":"start","properties":{},"output":{"type":"null","id":"start"},"ports":["default"]},{"content":"Type your message here","id":"N2XbELZtyn","user":false,"output":{"type":"null","id":"message_0_GqAK378P"},"ports":["default"],"title":"Message","type":"message","properties":{"ports":{}}},{"content":"Can you answer this?","id":"rz3gxpZixa","user":true,"output":{"type":"text","id":"question_Tq2uZzB4W3"},"ports":["default"],"title":"Question","type":"question","properties":{"ports":{},"controlType":"input","type":"text","label":"text","pattern":"","validationErrorMessage":"","size":"medium","width":"medium","maxLength":100,"minLength":2,"placeholder":"","suggestions":[],"textAlign":"start"}},{"content":"pick the option!","id":"KfB4u17Hzo","user":true,"output":{"type":"text","id":"buttons_8b9km4GvyF"},"ports":["default","option1","option2"],"title":"Buttons","type":"buttons","properties":{"ports":{"option1":{"value":"test port 1","icon":"Accessibility","text":"test port 1","id":"option1"},"option2":{"value":"testport2","icon":"Achievement","text":"testport2","id":"option2"}},"multiple":false,"min":1,"max":1,"direction":"row","label":"buttons"}}],"paths":{"node1-default":"KfB4u17Hzo","KfB4u17Hzo-default":"rz3gxpZixa","rz3gxpZixa-default":"N2XbELZtyn"},"processedMessages":[{"nodeId":"node1","id":"5jqIoEj2653msvtZgqr0C","nodeContent":"Welcome *your* user with a nice **message**!😂","user":false,"exitPort":"default"},{"nodeId":"KfB4u17Hzo","output":{"value":"testport2","port":"option2","type":"text"},"wasInteractive":true,"id":"bh5xL6icyqIYe2zi6dveb","user":false,"silent":false,"nodeContent":"pick the option!","exitPort":"option2"},{"nodeId":"KfB4u17Hzo","output":{"value":"testport2","port":"option2","type":"text"},"id":"aHrxswVJEvhXogk-tQOsc","user":true,"nodeContent":"pick the option!","silent":false,"exitPort":"option2"}],"variables":{"test":{"names":["pietro","tommaso","filippo"]},"buttons_8b9km4GvyF":"testport2"},"activeMessage":null,"activeInteraction":{"content":"Can you answer this?","id":"rz3gxpZixa","user":true,"output":{"type":"text","id":"question_Tq2uZzB4W3"},"ports":["default"],"title":"Question","type":"question","properties":{"ports":{},"controlType":"input","type":"text","label":"text","pattern":"","validationErrorMessage":"","size":"medium","width":"medium","maxLength":100,"minLength":2,"placeholder":"","suggestions":[],"textAlign":"start"}},"finished":false,"userId":"xo3ZoReDl1wdMPKeVTqq0","botId":"SPFj05jqH34LaV5vzV4hh"}`;
  return JSON.parse(stateString);
  // const chartNodesArray = Object.entries(data.nodes).map((n) => n[1]);
  // const chartStartNode = chartNodesArray.find((n) => n.type === "start");
  // const startBotNode: IStartNode = {
  //   id: chartStartNode!.id,
  //   content: chartStartNode!.content,
  //   user: chartStartNode!.user,
  //   title: chartStartNode!.title,
  //   type: "start",
  //   properties: chartStartNode!.properties,
  //   output: {
  //     type: chartStartNode!.output.type as BotNodeOutputType,
  //     id: chartStartNode!.output.id,
  //   },
  //   ports: [defPortId],
  // };

  // const nodes: IBotNode[] = chartNodesArray
  //   .filter((n) => n.type !== "start")
  //   .map((item) => {
  //     const ports: string[] = Object.keys(item.ports).filter(
  //       (id) => id !== defPortId
  //     );

  //     return {
  //       content: item.content,
  //       id: item.id,
  //       user: item.user,
  //       output: {
  //         type: item.output.type as BotNodeOutputType,
  //         id: item.output.id,
  //       },
  //       ports: [defPortId, ...ports],
  //       title: item.title,
  //       type: item.type as BotNodeType,
  //       properties: item.properties,
  //     };
  //   });

  // const paths = Object.values(data.links).reduce((acc, current) => {
  //   const linksMapKey = `${current.from.nodeId}-${current.from.portId}`;
  //   return {
  //     ...acc,
  //     [`${linksMapKey}`]: current.to,
  //   };
  // }, {});

  // return {
  //   nodes: [startBotNode, ...nodes],
  //   paths,
  //   processedMessages: [],
  //   variables: {},
  //   activeMessage: null,
  //   activeInteraction: null,
  //   finished: false,
  // };
};

ReactDOM.render(
  <React.StrictMode>
    <Dumbot
      botUUID="testBot"
      initialState={getInitialState()}
      allowClose
      onToggle={(opened: boolean) => {
        //console.log(opened);
      }}
      onUserAction={(answer) => {
        console.log("USERANSWER", answer);
      }}
      onSetVariable={(name, value) => {
        console.log("SETTINGVARIABLE", name, value);
      }}
      onStateChanging={(state, type, payload) => {
        console.log("STATECHANGING", type, payload);
      }}
      onStateChanged={(state) => {
        console.log("STATECHANGED", state);
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
      viewSilentNodes
      theme={{
        bot: {
          buttonsRadius: "6px",
          messageDelay: 2000,
        },
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
