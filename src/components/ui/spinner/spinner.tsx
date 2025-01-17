import React from "react";

import { cn } from "@/utils/cn";

export type SpinnerProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export default function Spinner({ className }: Readonly<SpinnerProps>) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900",
        className
      )}
    />
  );
}
