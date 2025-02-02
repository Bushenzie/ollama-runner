import ollama, { ListResponse } from "ollama";
import { IpcMainInvokeEvent } from "electron/main";

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
  args: { model: string; message: string }
) => {
  const response = await ollama.chat({
    model: args.model,
    messages: [{ role: "user", content: args.message }],
  });

  return response;
  //   e.reply("sendMessageResponse", { message: args.message.repeat(2) });
};
