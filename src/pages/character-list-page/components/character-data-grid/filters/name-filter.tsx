import React from "react";

import Input, { type InputProps } from "@/components/ui/input";

const NameFilter = React.forwardRef((props: InputProps, ref) => {
  return (
    <Input
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      className="border p-2 rounded"
      type="text"
      placeholder="Filter by name"
      {...props}
    />
  );
});

export default NameFilter;
