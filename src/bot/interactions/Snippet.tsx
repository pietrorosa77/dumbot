import { Box } from "grommet";
import * as React from "react";
import { IBotNodeInteractionProps, ISnippetContext } from "../definitions";
import { BotSpinner } from "../LoadingMessage";

const runSnippet = async (
  code: string,
  snippetcontext: ISnippetContext
): Promise<any> => {
  let worker: Worker;

  if ((import.meta as any)?.env?.DEV) {
    console.log("ENV IS", (import.meta as any).env);
    console.log("running dev server mode");
    worker = (
      await import("./workers/SnippetWorker?worker" as any)
    ).default() as Worker;
  } else {
    worker = new Worker(new URL("./workers/SnippetWorker", import.meta.url));
  }

  worker.onmessage = async (event: MessageEvent) => {
    const ret: any = {
      result: true,
      error: null,
    };
    try {
      switch (event.data.messageId) {
        case "onCallHost":
          ret.result = await snippetcontext.onCallHost(
            event.data.funcLabel,
            event.data.variables
          );
          break;
        case "onSetVariable":
          snippetcontext.onSetVariable(event.data.id, event.data.value);
          ret.result = {
            id: event.data.id,
            value: event.data.value,
          };
          break;
        default:
          break;
      }
    } catch (error) {
      ret.error = (error as any).toString();
    } finally {
      event.ports[0].postMessage(ret);
    }
  };

  return new Promise((res) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent) => {
      channel.port1.close();
      res(event.data.result);
    };
    const { variables, ports, nodeId } = snippetcontext;
    worker.postMessage({ id: "runSnippet", code, variables, ports, nodeId }, [
      channel.port2,
    ]);
  });
};

export const BotSnippet = (props: IBotNodeInteractionProps) => {
  const [result, setResult] = React.useState<any>(null);
  const ports = props.node.ports;

  const execSnippet = async () => {
    const snippetcontext: ISnippetContext = {
      onCallHost: props.onCallHost,
      nodeId: props.node.id,
      theme: props.theme,
      ports: ports.reduce((acc, p) => {
        return {
          ...acc,
          [`${p}`]: p,
        };
      }, {}),
      onSetVariable: props.onSetVariable,
      variables: props.variables,
    };

    const tranpiled = await props.onTranspileCode(props.node.id);

    let snippetOutput = {
      exit: "default",
      error: undefined,
    };

    snippetOutput = await runSnippet(tranpiled, snippetcontext);
    setResult(snippetOutput);
  };

  React.useEffect(() => {
    const compileCodeSnippet = async () => {
      await execSnippet();
    };
    compileCodeSnippet();
    // eslint-disable-next-line
  }, [true]);

  React.useEffect(() => {
    if (!result) {
      return;
    }

    if (result.error) {
      console.error(result.error);
      props.onUserAction({
        port: result.exit,
        value: `ERR: snippet ${props.node.id} error ${result.error}`,
        type: "string",
        id: props.node.id,
      });
    } else {
      props.onUserAction({
        port: result.exit,
        value: `OK: snippet ${props.node.id} exit result ${result.exit}`,
        type: "string",
        id: props.node.id,
      });
    }
    // eslint-disable-next-line
  }, [result]);

  return (
    <React.Fragment>
      <Box justify="start" pad="none" fill>
        {!result && <BotSpinner themeColor="accent-1" />}
      </Box>
    </React.Fragment>
  );
};
