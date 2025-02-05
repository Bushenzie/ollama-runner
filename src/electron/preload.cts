const electron = require("electron");

type Message = {
  role: "user" | "assistant";
  content: string;
};

electron.contextBridge.exposeInMainWorld("api", {
  checkAvailability: () => electron.ipcRenderer.invoke("checkAvailability"),
  getModels: () => electron.ipcRenderer.invoke("getModels"),
  sendMessage: (args: { model: string; messages: Message[] }) =>
    electron.ipcRenderer.invoke("sendMessage", args),
} satisfies Window["api"]);
