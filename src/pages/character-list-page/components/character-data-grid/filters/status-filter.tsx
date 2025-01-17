/* eslint-disable react-refresh/only-export-components */
import React from "react";

import Select, { type SelectProps } from "@/components/ui/select";
import capitalize from "@/utils/capitalize";

export const STATUS_VALUES = {
  alive: "alive",
  dead: "dead",
  unknown: "unknown",
} as const;

const StatusFilter = React.forwardRef((props: SelectProps, ref) => {
  const statusSelectOptions = React.useMemo(
    () => [
      { value: "", label: "Filter by status" },
      ...Object.values(STATUS_VALUES).map((el) => ({
        value: el,
        label: capitalize(el),
      })),
    ],
    []
  );

  return (
    <Select
      ref={ref as React.RefObject<HTMLSelectElement>}
      className="border p-2 rounded"
      options={statusSelectOptions}
      {...props}
    />
  );
});

export default StatusFilter;
