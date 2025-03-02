import { app, BrowserWindow } from "electron";
import { ipcMain } from "electron/main";
import path from "path";
import {
  checkAvailability,
  getAllInstalledModels,
  handleMessage,
} from "./ollama.js";

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
      height: 750,
      width: 650,
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
    ipcMain.handle("checkAvailability", checkAvailability);
    ipcMain.handle("sendMessage", handleMessage);
    ipcMain.handle("getModels", getAllInstalledModels);
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
