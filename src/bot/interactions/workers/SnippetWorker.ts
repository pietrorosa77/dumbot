/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISnippetContext } from "../../definitions";

const ctx: Worker = globalThis.self as any;

const onCallHost = (funcLabel: string, variables: any) => {
  return new Promise((res, rej) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = ({ data }) => {
      channel.port1.close();
      if (data.error) {
        rej(data.error);
      } else {
        res(data.result);
      }
    };
    ctx.postMessage({ messageId: "onCallHost", funcLabel, variables }, [
      channel.port2,
    ]);
  });
};

const onSetVariable = (id: string, value: any) => {
  return new Promise((res, rej) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = ({ data }) => {
      channel.port1.close();
      if (data.error) {
        rej(data.error);
      } else {
        res(data.result);
      }
    };
    ctx.postMessage({ messageId: "onSetVariable", id, value }, [channel.port2]);
  });
};

const runSnippet = async (code: string, SnippetContext: ISnippetContext) => {
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(code);
    const toRun = func();
    const res = await toRun(SnippetContext);
    return { exit: (res as string) || "default", error: undefined };
  } catch (error) {
    console.error(error);
    return { exit: "default", error: error as any };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
ctx.onmessage = async (event) => {
  const snippet = event.data.code;
  const snippetTimeout = setTimeout(() => {
    event.ports[0].postMessage({
      mesageId: "endSnippet",
      result: { exit: "default", error: "snippet timeout" },
    });
  }, 30000);
  const snippetcontext: ISnippetContext = {
    onCallHost: async (label: string, variables: any) => {
      return await onCallHost(label, variables);
    },
    theme: event.data.theme,
    nodeId: event.data.nodeId,
    ports: event.data.ports,
    onSetVariable: async (id: string, value: any) => {
      return await onSetVariable(id, value);
    },
    variables: event.data.variables,
  };

  const result = await runSnippet(snippet, snippetcontext);
  clearTimeout(snippetTimeout);
  event.ports[0].postMessage({ mesageId: "endSnippet", result });
};

export default ctx;
