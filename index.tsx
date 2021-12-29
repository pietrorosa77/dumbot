/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { Dumbot } from "./src/bot/Bot";
import { DEFAULT_PORT_ID, IBotState } from "./src/bot/definitions";

const defPortId: DEFAULT_PORT_ID = "default";
const getInitialState = (): IBotState => {
  const stateString = `{"nodes":[{"content":"pick the option!","id":"KfB4u17Hzo","user":true,"output":{"type":"text","id":"multiOut"},"ports":["default","option1","option2","option3","option4","option5"],"title":"Buttons","type":"buttons","properties":{"displayAs": "footer","ports":{"option1":{"value":"test port 1","icon":"Accessibility","text":"test port 1","id":"option1"},"option2":{"value":"testport2 😂","icon":"Achievement","text":"testport2 😂","id":"option2"},"option3":{"value":"edit me","icon":"","text":"edit me","id":"option3"},"option4":{"value":"edit me 2","icon":"","text":"edit me 2","id":"option4"},"option5":{"value":"LibraryComponent","icon":"","text":"LibraryComponent","id":"option5"}},"multiple":false,"min":2,"max":4,"direction":"column","label":"buttons","code":null}},{"id":"node1","content":"Welcome *your* user with a nice **message**!😂","user":false,"title":"Start!","type":"start","properties":{},"output":{"type":"null","id":"start"},"ports":["default"]},{"content":"Type your message here","id":"N2XbELZtyn","user":false,"output":{"type":"null","id":"message_0_GqAK378P"},"ports":["default"],"title":"Message","type":"message","properties":{"disableBubble":true,"ports":{}}},{"content":"pick the option!","id":"KfB4u17Hzo","user":true,"output":{"type":"array","id":"multiOut"},"ports":["default","option1","option2","option3","option4","option5"],"title":"Buttons","type":"buttons","properties":{"ports":{"option1":{"value":"test port 1","icon":"Accessibility","text":"test port 1","id":"option1"},"option2":{"value":"testport2","icon":"Achievement","text":"testport2","id":"option2"},"option3":{"value":"edit me","icon":"","text":"edit me","id":"option3"},"option4":{"value":"edit me 2","icon":"","text":"edit me 2","id":"option4"},"option5":{"value":"edit me6","icon":"","text":"edit me6","id":"option5"}},"multiple":true,"min":2,"max":4,"direction":"row","label":"buttons"}},{"content":"can you answer this :smile:","id":"hxlx4hraRY","user":true,"output":{"id":"question_z80ob4nHVg"},"ports":["default"],"title":"Question","type":"question","properties":{"displayAs": "footer","background":"transparent","ports":{},"label":"multiline text","controlType":"textarea","size":"medium","raws":5,"colums":4,"width":"100%","placeholder":"type"}}],"paths":{"KfB4u17Hzo-option1":"hxlx4hraRY","node1-default":"KfB4u17Hzo","KfB4u17Hzo-option1":"N2XbELZtyn","KfB4u17Hzo-option5":"hxlx4hraRY","KfB4u17Hzo-option4":"hxlx4hraRY","KfB4u17Hzo-option3":"hxlx4hraRY","KfB4u17Hzo-option2":"N2XbELZtyn","KfB4u17Hzo-default":"hxlx4hraRY"},"processedMessages":[{"nodeId":"node1","id":"I43E02TlPKj2mmwugHbtG","nodeContent":"Welcome *your* user with a nice **message**!😂","user":false,"exitPort":"default"},{"nodeId":"KfB4u17Hzo","output":{"value":["edit me6","edit me 2"],"port":"default","type":"array","id":"KfB4u17Hzo"},"wasInteractive":true,"id":"Pcd5ceRrLl6jxkJV8jM2i","user":false,"silent":false,"nodeContent":"pick the option!","exitPort":"default"}],"variables":{"test":{"names":["pietro","tommaso","filippo"]},"multiOut":["edit me6","edit me 2"],"question_z80ob4nHVg":"jgiugugygg hiuuhuhhuhuhuiuhhu ihiuhiu"},"activeMessage":{"nodeId":"KfB4u17Hzo","output":{"value":["edit me6","edit me 2"],"port":"default","type":"array","id":"KfB4u17Hzo"},"id":"Xu6XQUmm_XpvoPtH99y1H","user":true,"nodeContent":"pick the option!","silent":false,"exitPort":"default"},"activeInteraction":null,"finished":false,"userId":"qlB8_OpO73BauFo0r1F7X","botId":"SPFj05jqH34LaV5vzV4hh"}`;
  return JSON.parse(stateString);
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
          messageDelay: 1500,
        },
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
