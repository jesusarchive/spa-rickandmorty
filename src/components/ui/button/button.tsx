import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        )}
        {...props}
      />
    );
  }
);

export default ButtonComponent;
