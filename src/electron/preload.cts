const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  test: () => console.log("testing"),
});
