import React from "react";

import Input, { type InputProps } from "@/components/ui/input";

const TypeFilter = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        className="border p-2 rounded"
        type="text"
        placeholder="Filter by type"
        {...props}
      />
    );
  }
);

export default TypeFilter;
