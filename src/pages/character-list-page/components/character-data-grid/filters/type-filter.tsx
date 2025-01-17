import React from "react";

import Input, { type InputProps } from "@/components/ui/input";

const TypeFilter = React.forwardRef((props: Readonly<InputProps>, ref) => {
  return (
    <Input
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      className="border p-2 rounded"
      type="text"
      placeholder="Filter by type"
      {...props}
    />
  );
});

export default TypeFilter;
