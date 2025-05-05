import { ComponentProps } from "react";

interface WrapperProps extends ComponentProps<"section"> {}

export function Wrapper(props: WrapperProps) {
  return <section className="w-full min-h-screen bg-gray-700" {...props} />;
}
