import { createContext } from "react";
import { IBuildPCContext } from "../types/context-types";

export const BuildPCContext = createContext<IBuildPCContext | null>(null);
