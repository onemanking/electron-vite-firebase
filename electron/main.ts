import { app, BrowserWindow } from "electron";
import path from "node:path";

import { db } from "./firebase";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", async () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());

    //TODO: TEST FIREBASE
    const ref = db.ref("version");
    console.log(`Ref ${ref}`);
    ref.on("value", (snapshot) => {
      const onlineVersion = snapshot.val();
      console.log(`ref.on Online version ${onlineVersion}`);
    });

    //TODO: TEST WITH AWAIT
    const onlineVersion = (await ref.get()).val();
    console.log(`await ref.get() Online version ${onlineVersion}`);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
});

app.whenReady().then(createWindow);
