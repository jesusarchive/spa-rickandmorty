import React from "react";

import { cn } from "@/utils/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: SelectOption[];
  loading?: boolean;
};

export default function Select({
  className,
  options,
  loading,
  ...props
}: Readonly<SelectProps>) {
  return (
    <select
      className={cn("border-gray-300 border-2 rounded p-2", className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <option>Loading...</option>
      ) : (
        options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))
      )}
    </select>
  );
}
