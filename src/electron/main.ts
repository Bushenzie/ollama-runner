import { app, BrowserWindow } from "electron";
import { ipcMain } from "electron/main";
import path from "path";
import { getAllInstalledModels, handleMessage } from "./ollama.js";
// import { getAllInstalledModels, handleMessage } from "./ollama.js";
// import { Channel } from "./types.js";

const isDev = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow | null = null;

const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev ? "." : "..",
    "dist-electron/preload.cjs"
  );
};

app
  .whenReady()
  .then(() => {
    const uiPath = path.join(app.getAppPath(), "/dist-ui/index.html");

    mainWindow = new BrowserWindow({
      title: "Ollama runner",
      height: 900,
      width: 600,
      webPreferences: {
        contextIsolation: true,
        preload: getPreloadPath(),
      },
    });

    if (isDev) {
      mainWindow.loadURL("http://localhost:3232");
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadFile(uiPath);
    }
  })
  .then(() => {
    ipcMain.handle("sendMessage", handleMessage);
    ipcMain.handle("getModels", getAllInstalledModels);
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
