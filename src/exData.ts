/* eslint-disable */
export const data = {
  nodes: {
    node1: {
      id: "node1",
      type: "start",
      user: false,
      title: "Start!",
      content: `
# A demo of React

Welcome *your* user with a nice **message**!

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

http://techslides.com/demos/sample-videos/small.webm

![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==)<dumbot-boubble/>
These features **do not work by default**.
👆 Use the toggle above to add the plugin.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins


<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

![Kitten](https://d33wubrfki0l68.cloudfront.net/200d166fc3dff29e5b8a6703d8e83cc25821bcf4/10dd6/media/2018/08/kitten.jpg "A cute kitten")

You know, sometimes in life it seems like there's no way out. Like
11  a sheep trapped in a maze designed by wolves. See all the
12  options [here](https://github.com/probablyup/markdown-to-jsx/) sometimes in life it seems like there's no way out. Like

[here](https://github.com/probablyup/markdown-to-jsx/ "Markdown Image")

![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more \`testpie\`     |


~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

~~~js
import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);
~~~
        `,
      position: { x: 22, y: 19 },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      output: { id: "", type: "null" },
      size: { h: 366, w: 250 },
      updates: 3,
      properties: { externalVariables: ["test", "test2"] },
    },
    "9CRaFo_963xR4O9Pq_KoJ": {
      id: "9CRaFo_963xR4O9Pq_KoJ",
      type: "message",
      user: false,
      position: { x: 1253.333536783854, y: 119.91666158040363 },
      title: "Send a message",
      content: "here's your message",
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      output: { id: "", type: "null" },
      size: { h: 141, w: 250 },
      properties: {},
    },
    "8CrN_nPaQ1-nrN3ad93AO": {
      id: "8CrN_nPaQ1-nrN3ad93AO",
      type: "buttons",
      user: true,
      position: { x: 1318.666788736979, y: 381.54167175292963 },
      title: "Buttons 2",
      content: "please select your option",
      properties: {
        direction: "row",
        multiple: false,
        min: 2,
        max: 4,
        ports: {
          "X8FhFABftj3W-XrFy48H8": {
            text: "${test.names[0]}",
            value: "${test.names[0]}",
            icon: "Trash",
          },
          "SL2yv-5DeSXGBHiOvw5zM": {
            text: "${test.names[1]}",
            value: "${test.names[1]}",
            icon: "PlayFill",
          },
          O5UxVkBYJruM3IGhRScDn: {
            text: "${test.names[2]}",
            value: "${test.names[2]}",
            icon: "PlayFill",
          },
          answ1: {
            text: "multi4",
            value: "multi4",
            icon: "PlayFill",
          },
          answ2: {
            text: "multi5",
            value: "multi5",
            icon: "PlayFill",
          },
          default: {
            text: "(multi option exit)",
            value: "(multi option exit)",
          },
        },
      },
      output: { id: "btns2", type: "string" },
      ports: {
        "X8FhFABftj3W-XrFy48H8": {
          id: "X8FhFABftj3W-XrFy48H8",
          text: "${test.names[0]}",
          type: "option",
          properties: { value: "${test.names[0]}" },
          index: 6,
          selected: false,
        },
        "SL2yv-5DeSXGBHiOvw5zM": {
          id: "SL2yv-5DeSXGBHiOvw5zM",
          text: "${test.names[1]}",
          type: "option",
          properties: { value: "${test.names[1]}" },
          index: 5,
          selected: false,
        },
        O5UxVkBYJruM3IGhRScDn: {
          id: "O5UxVkBYJruM3IGhRScDn",
          text: "${test.names[2]}",
          type: "option",
          properties: { value: "${test.names[2]}" },
          index: 4,
          selected: false,
        },
        answ2: {
          id: "answ2",
          type: "option",
          text: "multi4",
          properties: { value: "multi4" },
          index: 3,
          selected: false,
        },
        answ1: {
          id: "answ1",
          type: "option",
          text: "multi5",
          properties: { value: "multi5" },
          index: 2,
          selected: false,
        },
        default: {
          id: "default",
          type: "default",
          text: "(multi option exit)",
          index: 1,
          selected: false,
        },
      },
      size: { h: 316, w: 250 },
      updates: 7,
    },
    "mWZIL8m-aSb-j7alzvE59": {
      id: "mWZIL8m-aSb-j7alzvE59",
      type: "message",
      output: { id: "", type: "null" },
      user: false,
      position: { x: 1745.9999847412107, y: 60.0000508626302 },
      title: "Send a message",
      content:
        "here's your summary:\nPick one is: ${aaa.data}\nAnswer q is: ${answerq}\nBtns 2 is: ${btns2}",
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      size: { h: 189, w: 250 },
      updates: 4,
      properties: {},
    },
    ZLX80zOfwAkkIE17i_HoF: {
      id: "ZLX80zOfwAkkIE17i_HoF",
      type: "question",
      user: true,
      position: { x: 913, y: 347.666748046875 },
      title: "Simple Question",
      content:
        "from second block ${2ndblock}?\n(from exit default)?\nuser choice: ${usrClikked}\nid:${cstmReactNode.id}\nname:${cstmReactNode.name}\nemail:${cstmReactNode.email}\n",
      output: { id: "answerq", type: "color" },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      properties: {
        controlType: "input",
        type: "color",
        label: "text",
        value: "text",
        size: "medium",
        width: "medium",
        maxLength: 100,
        placeholder: "test placeholder",
        pattern: "",
        suggestions: ["test", "test2", "test3"],
        textAlign: "start",
      },
      size: { h: 261, w: 250 },
      updates: 7,
    },
    yW4YuAOtGTsfB3EW7N1al: {
      id: "yW4YuAOtGTsfB3EW7N1al",
      type: "question",
      user: true,
      position: { x: 915.3333129882812, y: 51.33331298828125 },
      title: "Simple Question",
      content:
        "can you answer this (from exit 1)?\nuser choice: ${usrClikked}\nid:${cstmReactNode.id}\nname:${cstmReactNode.name}\nemail:${cstmReactNode.email}\n",
      output: { id: "answerq", type: "color" },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      properties: {
        controlType: "input",
        type: "color",
        label: "text",
        size: "medium",
        width: "medium",
        maxLength: 100,
        placeholder: "test placeholder",
        pattern: "",
        suggestions: ["test", "test2", "test3"],
        textAlign: "start",
      },
      size: { h: 237, w: 250 },
      updates: 6,
    },
    "GECvtsvImQKNoCcl_L-lR": {
      id: "GECvtsvImQKNoCcl_L-lR",
      type: "snippet",
      user: true,
      position: { x: 315.08341471354163, y: 73.25005849202473 },
      title: "Javascript ",
      content: "",
      output: { id: "", type: "null" },
      properties: {
        code: 'async function usersnippet(SnippetContext){\n  const callApi = async (label) => {\n    //onCallHost will call a function passed as a property into the bot instance if defined. You can cal an api\n    // from the host and provide data out\n    const data = await SnippetContext.onCallHost(label, SnippetContext.variables);\n    return data;\n  }\n\n  // you can use await \n  const res = await callApi("testlabel");\n  console.log("RESPONSEEEEE", res)\n  // set variables on the Bot\n  SnippetContext.onSetVariable("aaa", res);\n  // read variables from the bot\n  console.log("Available variables",SnippetContext.variables);\n  console.log("Available ports",SnippetContext.ports);\n  // proceed with the flow on port default\n  return SnippetContext.ports.exit1\n}',
      },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
        exit1: {
          id: "exit1",
          type: "option",
          text: "exit 1",
          properties: { value: "exit 1" },
          index: 2,
        },
        exit2: {
          id: "exit2",
          type: "option",
          text: "exit 2",
          properties: { value: "exit 2" },
          index: 3,
        },
      },
      size: { h: 139, w: 250 },
      updates: 50,
    },
    "GsWp1nD07JeI8jtumwP-N": {
      id: "GsWp1nD07JeI8jtumwP-N",
      type: "custom",
      user: true,
      position: { x: 629, y: 81 },
      title: "Table",
      content:
        "Ask something to the user and create your custom React component to allow him to answer",
      properties: {
        code: `const{onSetVariable,onCallHost,onUserAction,theme}=NodeContext;return n=>{const[o,r]=React.useState([]),a=[{property:"name",header:React.createElement(Grommet.Text,null,"Name with extra")},{property:"email",header:"Email"},{property:"gender",header:"Gender"},{property:"status",header:"Status"}].map(e=>({...e}));return a[0].pin=!0,React.useEffect(()=>{(async()=>{const t=await onCallHost();r(t?t.data:[])})()},[!0]),React.useEffect(()=>{console.log("rendering")},[!0]),React.createElement(Grommet.Box,{background:theme.global.colors.bars,fill:"vertical"},React.createElement(Grommet.DataTable,{fill:!0,pin:!0,paginate:!0,step:10,background:{pinned:{color:"background-contrast"}},columns:a,data:o,onClickRow:e=>{alert(e.datum.id);let t=NodeContext.ports.exit1;e.datum.id<2010?(onSetVariable("usrClikked","less than 2010"),t=NodeContext.ports.default):onSetVariable("usrClikked","grater or equal than 2010"),onUserAction(e.datum,t)}}))};`,
      },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
        exit1: {
          type: "option",
          id: "exit1",
          text: "exit 1",
          index: 2,
        },
      },
      size: { h: 248, w: 250 },
      updates: 36,
      output: { id: "cstmReactNode", type: "object" },
    },
    lidyxkDjoLiPj7WqfGrXb: {
      id: "lidyxkDjoLiPj7WqfGrXb",
      type: "custom",
      user: true,
      position: { x: 447, y: 458 },
      title: "React Component",
      content: "Test File Upload",
      properties: {
        code: `const{onSendAttachments,onUserAction,theme}=NodeContext;return m=>{const[e,l]=React.useState([]),[s,a]=React.useState(!1),n=Grommet.Box,c=Grommet.FileInput,r=BotComponents.DumbotIconButton,i=async()=>{let o=e;try{a(!0),await onSendAttachments(e)}catch(t){console.error(t),o=t}finally{a(!1),onUserAction(o.toString(),NodeContext.ports.default)}};return React.createElement(n,{align:"center",justify:"start",pad:"large"},React.createElement(n,{width:"medium",background:theme.global.colors.bars},React.createElement(c,{multiple:{max:5},onChange:(o,{files:t})=>{console.log(o,t),l(t)}})),React.createElement(n,null,React.createElement(r,{tip:"Send files",icon:s?React.createElement(BotComponents.DumbotSpinner,{themeColor:"accent-1"}):React.createElement(Icons.Play,null),onClick:i,disabled:!e.length||s,bgColor:"bars",style:{alignSelf:"center",padding:"8px",margin:"6px"}})))};`,
      },
      ports: {
        default: {
          id: "default",
          type: "default",
          text: "output",
          index: 1,
        },
      },
      size: { h: 141, w: 250 },
      output: { id: "files", type: "object" },
      updates: 18,
    },
  },
  links: {
    "DpM7iUW4B--mezk_Yg7_-": {
      from: { nodeId: "8CrN_nPaQ1-nrN3ad93AO", portId: "default" },
      id: "DpM7iUW4B--mezk_Yg7_-",
      to: "mWZIL8m-aSb-j7alzvE59",
      posTo: { x: 2006.6666666666663, y: 369.99999999999994 },
    },
    U0oMZKpFigOwJQGBOKeoJ: {
      from: { nodeId: "9CRaFo_963xR4O9Pq_KoJ", portId: "default" },
      id: "U0oMZKpFigOwJQGBOKeoJ",
      to: "8CrN_nPaQ1-nrN3ad93AO",
      posTo: { x: 1594.9999999999998, y: 324.99999999999994 },
    },
    uhehmg5nNYK5sO4GTjG1K: {
      from: { nodeId: "ZLX80zOfwAkkIE17i_HoF", portId: "default" },
      id: "uhehmg5nNYK5sO4GTjG1K",
      to: "9CRaFo_963xR4O9Pq_KoJ",
      posTo: { x: 1314.9999999999998, y: 311.66666666666663 },
    },
    B_STvIfAoufmQQ81Azt3E: {
      from: { nodeId: "yW4YuAOtGTsfB3EW7N1al", portId: "default" },
      id: "B_STvIfAoufmQQ81Azt3E",
      to: "9CRaFo_963xR4O9Pq_KoJ",
      posTo: { x: 1333.333333333333, y: 283.3333333333333 },
    },
    qIbK5lBpcFX1NwqDyhRXY: {
      from: { nodeId: "GsWp1nD07JeI8jtumwP-N", portId: "exit1" },
      id: "qIbK5lBpcFX1NwqDyhRXY",
      to: "yW4YuAOtGTsfB3EW7N1al",
      posTo: { x: 1013, y: 626 },
    },
    hkVNMbvoUBYNBiAXE3MuX: {
      from: { nodeId: "GsWp1nD07JeI8jtumwP-N", portId: "default" },
      id: "hkVNMbvoUBYNBiAXE3MuX",
      to: "lidyxkDjoLiPj7WqfGrXb",
      posTo: { x: 568, y: 384 },
    },
    "4jQa2OnC13rMO0fXR9lZc": {
      from: { nodeId: "lidyxkDjoLiPj7WqfGrXb", portId: "default" },
      id: "4jQa2OnC13rMO0fXR9lZc",
      to: "ZLX80zOfwAkkIE17i_HoF",
      posTo: { x: 975, y: 432 },
    },
    Wfrmx9oE9q5A6OZNItBgE: {
      from: { nodeId: "node1", portId: "default" },
      id: "Wfrmx9oE9q5A6OZNItBgE",
      to: "GECvtsvImQKNoCcl_L-lR",
      posTo: { x: 375, y: 185 },
    },
    bse_d0lg_OhPuV9csoQ6u: {
      from: { nodeId: "GECvtsvImQKNoCcl_L-lR", portId: "exit1" },
      id: "bse_d0lg_OhPuV9csoQ6u",
      to: "GsWp1nD07JeI8jtumwP-N",
      posTo: { x: 696, y: 197 },
    },
  },
  selected: {
    node1: false,
    "9CRaFo_963xR4O9Pq_KoJ": false,
    "8CrN_nPaQ1-nrN3ad93AO": false,
    "mWZIL8m-aSb-j7alzvE59": false,
    ZLX80zOfwAkkIE17i_HoF: false,
    yW4YuAOtGTsfB3EW7N1al: false,
    "GECvtsvImQKNoCcl_L-lR": false,
    "GsWp1nD07JeI8jtumwP-N": false,
    lidyxkDjoLiPj7WqfGrXb: false,
  },
};
