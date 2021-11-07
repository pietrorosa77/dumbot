import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { Box, Button, Layer, Paragraph, Text } from "grommet";

export type NotificationType = "critical" | "warning" | "normal" | "unknown";
export const DumbotNotification = (props: {
  message: string;
  onClose?: () => void;
  status: NotificationType;
  title?: string;
  toast?: boolean;
  preserve?: boolean;
}) => {
  const theme = useContext(ThemeContext) || "base";
  const [visible, setVisible] = useState(true);
  const propsOnClose = props.onClose;

  const close = useCallback(() => {
    setVisible(false);
    if (propsOnClose) propsOnClose();
  }, [propsOnClose]);

  useEffect(() => {
    const timer = setTimeout(close, theme.notification.time);

    return () => clearTimeout(timer);
  }, [close, theme.notification.time]);

  const { icon: CloseIcon } = theme.notification.close;
  const { icon: StatusIcon, color } = theme.notification[props.status];
  const { color: closeIconColor } = theme.notification.close;

  let content: any = (
    <Box
      {...theme.notification.container}
      {...(props.toast ? { ...theme.notification.toast.container } : {})}
      direction="row"
    >
      <Box {...theme.notification.iconContainer}>
        <StatusIcon color={color} />
      </Box>
      <Box
        {...theme.notification.textContainer}
        align="start"
        direction="row"
        justify="between"
        flex
      >
        <Box>
          <Text {...theme.notification.title}>
            {props.title || "Dumbot Notification"}
          </Text>
          {!props.preserve && (
            <Paragraph {...theme.notification.message}>
              {props.message || ""}
            </Paragraph>
          )}
          {props.preserve && <pre>{props.message}</pre>}
        </Box>
        {props.onClose && (
          <Button
            icon={<CloseIcon color={closeIconColor} />}
            onClick={close}
            plain
          />
        )}
      </Box>
    </Box>
  );

  if (props.toast) {
    content = visible && (
      <Layer
        {...theme.notification.toast.layer}
        role="log"
        modal={false}
        onEsc={props.onClose}
        responsive
        plain
      >
        {content}
      </Layer>
    );
  }

  return content;
};
