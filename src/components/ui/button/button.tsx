import React from "react";

import { cn } from "@/utils/cn";

const buttonVariants = {
  default: "bg-[#E8EAF0] text-[#213E7F] hover:bg-[#D1D5E3] cursor-pointer",
  primary:
    "bg-[#213E7F] text-white shadow-[0_2px_4px_rgba(33,62,127,0.2)] hover:bg-[#1a3266]",
  secondary: "bg-[#E8EAF0] text-[#213E7F] hover:bg-[#D1D5E3]",
  outline: "border border-[#213E7F] text-[#213E7F] hover:bg-[#E8EAF0]",
  ghost: "hover:bg-[#E8EAF0] text-[#213E7F]",
  link: "text-[#213E7F] underline-offset-4 hover:underline",
} as const;

const buttonSizes = {
  sm: "min-h-[32px] min-w-[80px] px-2 py-1 text-sm",
  md: "min-h-[40px] min-w-[100px] px-3 py-1.5",
  lg: "min-h-[50px] min-w-[120px] px-4 py-2 text-lg",
} as const;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      loading,
      disabled,
      variant = "default",
      size = "md",
      fullWidth,
      ...props
    }: Readonly<ButtonProps>,
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          buttonVariants[variant],
          buttonSizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          !fullWidth && "w-fit",
          fullWidth && "w-full",
          className
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="invisible">{children}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent" />
            </div>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
