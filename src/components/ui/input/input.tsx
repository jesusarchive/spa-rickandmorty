import React from "react";

import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: Readonly<InputProps>, ref) => {
    return (
      <input
        ref={ref}
        className={cn("border-gray-300 border-2 rounded p-2", className)}
        {...props}
      />
    );
  }
);

export default InputComponent;
