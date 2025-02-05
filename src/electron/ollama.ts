import ollama, { ListResponse } from "ollama";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const getAllInstalledModels = async (): Promise<ListResponse> => {
  try {
    const models = await ollama.list();
    return models;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    throw new Error("There was error during fetch of all models");
  }
};

export const handleMessage = async (
  e: Electron.IpcMainInvokeEvent,
  args: { model: string; messages: Message[] }
) => {
  const startTime = Date.now();
  const response = await ollama.chat({
    model: args.model,
    messages: args.messages,
    // stream: true,
  });
  const endTime = Date.now();
  const elapsedTime = (endTime - startTime) / 1000;

  return {
    ...response,
    tokensPerSecond: response.eval_count / elapsedTime,
  };
};

export const checkAvailability = async (): Promise<boolean> => {
  try {
    await axios.get("http://localhost:11434");
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
};
