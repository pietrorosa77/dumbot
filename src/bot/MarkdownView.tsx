import { substituteVars } from "./utils";
import {
  Clock,
  Image,
  Markdown,
  Paragraph,
  Carousel,
  Box,
  Video,
  TextInput,
  Form,
  Text,
  Button,
} from "grommet";
import React from "react";
import { isEqual } from "lodash";
import styled from "styled-components";
import { UserAnswer } from "./interactions/UserAnswerDisplay";
import { BotNodeOutputType } from "./definitions";

interface IMarkdownViewProps {
  text: any;
  components?: any;
  variables: { [key: string]: any };
}

export const StyledMarkdow = styled(Markdown)`
  font-size: inherit !important;
  * {
    font-size: inherit !important;
  }
`;

export const MarkdownView = React.memo(
  function MarkdownView(props: IMarkdownViewProps) {
    const [components, setComponents] = React.useState<any>(undefined);

    React.useEffect(() => {
      const overrides = props.components || {};
      const componentsRend = {
        p: overrides.p || {
          component: Paragraph,
          props: { width: "100%", height: "100%", margin: "0" },
        },
        img: overrides.img || {
          component: Image,
          props: { width: "100%", height: "100%" },
        },
        clock: {
          component: function ClockWidget(props: any) {
            const type = ["analog", "digital"].includes(props.type)
              ? props.type
              : "analog";
            return (
              <Clock
                type={type}
                suppressHydrationWarning={true}
                size={props.size || "small"}
                precision={props.precision || "seconds"}
              />
            );
          },
        },
        video: {
          component: function VideoWidget(props: any) {
            return (
              <Video controls="over" fit="cover">
                <source key="video" src={props.src} type={props.type} />
              </Video>
            );
          },
        },
        carousel: {
          component: function CarouselWidget(props: any) {
            const images = props.data ? props.data.split(",") : [];
            return (
              <Box
                width={props.width || "200px"}
                className="cc-pietro"
                height={props.height || "200px"}
              >
                <Carousel fill>
                  {images.map((img: string) => (
                    <Image key={img} alt={img} src={img.trim()} fit="contain" />
                  ))}
                </Carousel>
              </Box>
            );
          },
        },
        useranswer: {
          component: function UserAnswerWidget(props: {
            type: string;
            value: string;
          }) {
            return (
              <UserAnswer
                type={props.type as BotNodeOutputType}
                value={props.value}
              />
            );
          },
        },
        TextInput: {
          component: TextInput,
        },
        Text: {
          component: Text,
        },
        Form: {
          component: Form,
        },
        Button: {
          component: Button,
        },
      };
      setComponents(componentsRend);
    }, [props.components]);

    const isText = props.text.trim ? true : false;

    const text = isText ? (props.text as string).trim() : props.text;

    const markdown =
      text && isText && props.variables
        ? substituteVars(text as string, props.variables)
        : text;

    return isText ? (
      <StyledMarkdow components={components}>{markdown}</StyledMarkdow>
    ) : (
      text
    );
  },
  function arePropsEqual(
    prevProps: IMarkdownViewProps,
    nextProps: IMarkdownViewProps
  ) {
    const equalContent = prevProps.text === nextProps.text;
    const equalVars = isEqual(prevProps.variables, nextProps.variables);
    return equalContent && equalVars;
  }
);
