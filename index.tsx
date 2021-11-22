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
  const chartNodesArray = Object.entries(data.nodes).map((n) => n[1]);
  const chartStartNode = chartNodesArray.find((n) => n.type === "start");
  const startBotNode: IStartNode = {
    id: chartStartNode!.id,
    content: chartStartNode!.content,
    user: chartStartNode!.user,
    title: chartStartNode!.title,
    type: "start",
    properties: chartStartNode!.properties,
    output: {
      type: chartStartNode!.output.type as BotNodeOutputType,
      id: chartStartNode!.output.id,
    },
    ports: [defPortId],
  };

  const nodes: IBotNode[] = chartNodesArray
    .filter((n) => n.type !== "start")
    .map((item) => {
      const ports: string[] = Object.keys(item.ports).filter(
        (id) => id !== defPortId
      );

      return {
        content: item.content,
        id: item.id,
        user: item.user,
        output: {
          type: item.output.type as BotNodeOutputType,
          id: item.output.id,
        },
        ports: [defPortId, ...ports],
        title: item.title,
        type: item.type as BotNodeType,
        properties: item.properties,
      };
    });

  const paths = Object.values(data.links).reduce((acc, current) => {
    const linksMapKey = `${current.from.nodeId}-${current.from.portId}`;
    return {
      ...acc,
      [`${linksMapKey}`]: current.to,
    };
  }, {});

  return {
    nodes: [startBotNode, ...nodes],
    paths,
    processedMessages: [],
    variables: {},
    activeMessage: null,
    activeInteraction: null,
    finished: false,
  };
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
