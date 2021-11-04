import { IBotState } from "../definitions";
import { getNodeFromState } from "../utils";
import * as esbuild from "esbuild-wasm";

//let service: esbuild;
let buildSystemInitialized = false;

export const runTranspiler = async (rawCode: string) => {
  if (!buildSystemInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.11.6/esbuild.wasm",
    });
    buildSystemInitialized = true;
  }
  const result = await esbuild.transform(rawCode, {
    minify: true,
    loader: "jsx",
  });
  return result.code;
};

export const transpile = async (nodeId: string, state: IBotState) => {
  try {
    const node = getNodeFromState(state, nodeId);
    if (!["snippet", "custom"].includes(node.type)) {
      return "";
    }

    const code =
      node.type === "snippet"
        ? `return ${node.properties.code}`
        : node.properties.code;

    console.log(code);
    const result = await runTranspiler(code);

    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
