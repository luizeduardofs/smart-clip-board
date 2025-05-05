import {
  app,
  BrowserWindow,
  clipboard,
  Menu,
  nativeImage,
  Tray,
} from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let tray: Tray | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  win.hide();

  if (process.platform === "darwin") {
    app.dock.hide();
  }

  const iconPath = path.join(process.env.VITE_PUBLIC!, "Template.png");
  const trayIcon = nativeImage.createFromPath(iconPath);
  if (trayIcon.isEmpty()) {
    console.error("❌ Falha ao carregar o ícone do tray:", iconPath);
    return;
  }

  tray = new Tray(trayIcon);
  const trayMenu = Menu.buildFromTemplate([
    {
      label: "Mostrar",
      click: () => {
        if (win) {
          win.show();
          if (process.platform === "darwin") {
            app.dock.show();
          }
        }
      },
    },
    {
      label: "Ocultar",
      click: () => {
        if (win) {
          win.hide();
          if (process.platform === "darwin") {
            app.dock.hide();
          }
        }
      },
    },
    {
      label: "Sair",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Smart Clipboard");
  tray.setContextMenu(trayMenu);

  watchClipboard(win);
}

let lastText = "";

function watchClipboard(win: BrowserWindow) {
  setInterval(() => {
    const currentText = clipboard.readText().trim();
    if (currentText && currentText !== lastText) {
      lastText = currentText;
      win.webContents.send("clipboard-text", currentText);
    }
  }, 500);
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
