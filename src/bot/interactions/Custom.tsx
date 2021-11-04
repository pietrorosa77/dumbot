import { Box } from "grommet";
import * as React from "react";
import { IBotNodeInteractionProps, ICustomNodeContext } from "../definitions";
import { ErrorBoundaryFunc } from "../ErrorBoundaries";
import { BotSpinner } from "../LoadingMessage";
import { DumbotNotification } from "../Notification";
import { substituteVarsInObject } from "../utils";
import { generateComponent } from "./workers/ComponentsGenerator";

export const BotCustomNode = (props: IBotNodeInteractionProps) => {
  const [ready, setReady] = React.useState(false);
  const [componentError, setComponentError] = React.useState(undefined);
  const componentRef = React.useRef(null);
  const nodeId = props.node.id;
  const ports = props.node.ports;

  React.useEffect(() => {
    const compileAndGenerateComponent = async () => {
      try {
        const botcontext: ICustomNodeContext = {
          nodeId: props.node.id,
          onUserAction: (value: any, port: string) => {
            props.onUserAction({
              port,
              value,
              type: props.node.output.type,
            });
          },
          onSendAttachments: props.onSendAttachments,
          onSetVariable: props.onSetVariable,
          onCallHost: props.onCallHost,
          theme: props.theme,
          ports: ports.reduce((acc, p) => {
            return {
              ...acc,
              [`${p}`]: p,
            };
          }, {}),
          variables: props.variables,
        };
        const source = await props.onTranspileCode(props.node.id);
        componentRef.current = await generateComponent(source, botcontext);
        setReady(true);
      } catch (error) {
        console.error(error);
        setComponentError(error as any);
      }
    };
    compileAndGenerateComponent();
    // eslint-disable-next-line
  }, [nodeId]);

  React.useEffect(() => {
    if (props.onComponentError) {
      props.onComponentError(componentError);
    }
    // eslint-disable-next-line
  }, [componentError]);

  const errorCallback = (error: any) => {
    setComponentError(error);
  };

  const GeneratedComponent = componentRef.current as any;
  const innerComponentProps = props.customProps
    ? substituteVarsInObject(props.customProps, props.variables || {})
    : {};
  return (
    <React.Fragment>
      <Box
        justify="start"
        pad="none"
        fill
        className="reactcustomblockcontainer"
      >
        {componentError && !props.preview && (
          <DumbotNotification
            toast={false}
            message="Error while rendering this component. Please wait, the bot will proceed in few seconds"
            status="critical"
            title="Dumbot error"
            onClose={() => {
              props.onUserAction({
                port: "default",
                value: "COMPONENT RENDER ERROR",
                type: "error",
              });
            }}
          />
        )}
        {componentError && props.preview && (
          <Box background="status-error" animation="fadeIn" pad="xsmall">
            <pre style={{ padding: 0, margin: 0 }}>
              {(componentError as any).toString()}
            </pre>
          </Box>
        )}
        {!componentError && (!ready || !GeneratedComponent) && (
          <BotSpinner themeColor="accent-1" />
        )}
        {!componentError && ready && GeneratedComponent && (
          <ErrorBoundaryFunc errorCallback={errorCallback}>
            <GeneratedComponent {...innerComponentProps} />
          </ErrorBoundaryFunc>
        )}
      </Box>
    </React.Fragment>
  );
};
