import * as React from "react";
import { IBotState } from "./definitions";

const BotContext: React.Context<IBotState> = React.createContext<any>({});

export default BotContext;
