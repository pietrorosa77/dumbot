import * as Grommet from "grommet";
import * as Icons from "grommet-icons";
import * as React from "react";
import lodash from "lodash";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { ActionButtonBot } from "../../ActionButtonBot";
import { BotSpinner } from "../../LoadingMessage";
import { ICustomNodeContext } from "../../definitions";

const BotComponents = {
  DumbotIconButton: ActionButtonBot,
  DumbotSpinner: BotSpinner,
};

export const generateComponent = (
  code: string,
  nodeContext: ICustomNodeContext
) => {
  if (!code) {
    return null;
  }

  // eslint-disable-next-line no-new-func
  const func = new Function(
    "React",
    "Grommet",
    "Icons",
    "Styled",
    "Lodash",
    "nanoid",
    "NodeContext",
    "BotComponents",
    code
  );
  const comp = func(
    React,
    Grommet,
    Icons,
    styled,
    lodash,
    nanoid,
    nodeContext,
    BotComponents
  );
  return comp;
};
