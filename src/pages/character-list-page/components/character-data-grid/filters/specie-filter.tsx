/* eslint-disable react-refresh/only-export-components */
import React from "react";

import Select, { type SelectProps } from "@/components/ui/select";
import capitalize from "@/utils/capitalize";

export const SPECIE_VALUES = {
  human: "human",
  humanoid: "humanoid",
} as const;

const SpecieFilter = React.forwardRef((props: SelectProps, ref) => {
  const specieSelectOptions = React.useMemo(
    () => [
      { value: "", label: "Filter by specie" },
      ...Object.values(SPECIE_VALUES).map((el) => ({
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
      options={specieSelectOptions}
      {...props}
    />
  );
});

export default SpecieFilter;
