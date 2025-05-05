import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import { History } from "./pages/History";
import { Saved } from "./pages/Saved";

declare global {
  interface Window {
    electronAPI: {
      onClipboardText: (callback: (text: string) => void) => void;
    };
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  );
}
