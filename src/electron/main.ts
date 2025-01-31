import { app, BrowserWindow } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev ? "." : "..",
    "dist-electron/preload.cjs"
  );
};

app.on("ready", () => {
  const uiPath = path.join(app.getAppPath(), "/dist-ui/index.html");
  const mainWindow = new BrowserWindow({
    title: "Ollama runner",
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3232");
    return;
  }

  mainWindow.loadFile(uiPath);
});
