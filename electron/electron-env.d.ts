/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

declare global {
  interface Window {
    ipcRenderer: {
      onClipboardText: (callback: (text: string) => void) => void;
    };
  }
}
