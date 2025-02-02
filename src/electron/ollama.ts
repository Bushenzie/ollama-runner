import ollama, { ListResponse } from "ollama";
import { IpcMainInvokeEvent } from "electron/main";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const getAllInstalledModels = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  e: IpcMainInvokeEvent
): Promise<ListResponse> => {
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
  const response = await ollama.chat({
    model: args.model,
    messages: args.messages,
  });

  return response;
};
