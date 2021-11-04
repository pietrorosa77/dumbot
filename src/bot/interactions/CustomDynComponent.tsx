import React, { lazy, Suspense } from "react";
import {
  BotNodeOutputType,
  IBotNodeInteractionLoaderProps,
} from "../definitions";
// import { IBotNodeInteractionProps } from "../definitions";
import { useDynamicScript } from "../hooks/useDynamicScript";

const loadComponent = (scope: any, module: any) => {
  return async () => {
    await __webpack_init_sharing__("default");

    const container = window[scope] as any; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await (window[scope] as any).get(module);
    const Module = factory();
    return Module;
  };
};

const System = (props: any) => {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });
  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <Suspense fallback="Loading System">
      <Component {...props} />
    </Suspense>
  );
};

export const BotCustomNode = (props: IBotNodeInteractionLoaderProps) => {
  const [system, setSystem] = React.useState<any>();
  // if (!props.node) {
  //   return null;
  // }

  // nodeId: props.node.id,
  //         onUserAction: (value: any, port: string) => {
  //           props.onUserAction({
  //             port,
  //             value,
  //             type: props.node.output.type,
  //           });
  //         },
  //         onSendAttachments: props.onSendAttachments,
  //         onSetVariable: props.onSetVariable,
  //         onCallHost: props.onCallHost,
  //         theme: props.theme,
  // ports:
  //         variables: props.variables,

  const ports = props.node?.ports.reduce((acc, p) => {
    return {
      ...acc,
      [`${p}`]: p,
    };
  }, {});

  const onUserAction = (value: any, port: string) => {
    props.onUserAction({
      port,
      value,
      type: props.node?.output?.type as BotNodeOutputType,
    });
  };

  const loadRemoteWidget = () => {
    setSystem({
      url: "http://localhost:4000/remoteEntry.js",
      scope: "comic",
      module: "./XKCD",
    });
  };
  return (
    <div>
      <button onClick={loadRemoteWidget}>Load Remote Widget</button>
      <div style={{ marginTop: "2em" }}>
        <System
          system={system}
          {...props}
          onUserAction={onUserAction}
          ports={ports}
        />
      </div>
    </div>
  );
};
