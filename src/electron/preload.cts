const electron = require("electron");

// export type ElectronAPI = {
//   getModels: () =>
// };

// declare global {
//   interface Window {
//     electron: ElectronAPI;
//   }
// }

const electronAPI = {
  getModels: () => electron.ipcRenderer.invoke("getModels"),
  sendMessage: (args: { model: string; message: string }) =>
    electron.ipcRenderer.invoke("sendMessage", args),
};

electron.contextBridge.exposeInMainWorld("api", electronAPI);
