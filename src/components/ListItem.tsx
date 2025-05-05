import { Copy, Pin, PinOff, Trash2 } from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
export enum Variant {
  "saved",
  "unsaved",
}

interface ListItemProps {
  variant: Variant;
  text: string;
}

export function ListItem({ variant, text }: ListItemProps) {
  return (
    <div className="flex items-center bg-gray px-4 border-b border-gray-500">
      <span className="flex-1 my-3 text-gray-200">{text}</span>
      <div className="flex gap-3">
        <button className="cursor-pointer">
          <Copy size={18} color="#e5e7eb" />
        </button>
        {variant === Variant.saved ? (
          <button className="cursor-pointer">
            <PinOff size={18} color="#e5e7eb" />
          </button>
        ) : (
          <button className="cursor-pointer">
            <Pin size={18} color="#e5e7eb" />
          </button>
        )}
        <button className="cursor-pointer">
          <Trash2 size={18} color="#ffe2e2" />
        </button>
      </div>
    </div>
  );
}
