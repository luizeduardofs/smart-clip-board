import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ListItem, Variant } from "../components/ListItem";
import { Wrapper } from "../components/Wrapper";

declare global {
  interface Window {
    ipcRenderer?: {
      onClipboardText: (listener: (text: string) => void) => void;
    };
  }
}

export function History() {
  const [copiedText, setCopiedText] = useState<string[]>([]);

  useEffect(() => {
    const listener = (text: string) => {
      setCopiedText([...copiedText, text]);
    };

    window.ipcRenderer?.onClipboardText(listener);
  }, [copiedText]);

  return (
    <Wrapper>
      <Header />
      <h1 className="text-2xl font-bold text-gray-200 p-4">History today</h1>
      <ul>
        {copiedText.map((item, index) => (
          <ListItem key={index} variant={Variant.unsaved} text={item} />
        ))}
      </ul>
    </Wrapper>
  );
}
