import React, { forwardRef } from "react";

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

const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { className, options, loading, ...rest } = props;

    return (
      <select
        ref={ref}
        className={cn("border-gray-300 border-2 rounded p-2", className)}
        disabled={loading}
        {...rest}
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
);

export default SelectComponent;
