/* eslint-disable react-refresh/only-export-components */
import React from "react";

import Select, { type SelectProps } from "@/components/ui/select";
import capitalize from "@/utils/capitalize";

export const GENDER_VALUES = {
  female: "female",
  male: "male",
  genderless: "genderless",
  unknown: "unknown",
} as const;

const GenderFilter = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const genderSelectOptions = React.useMemo(
      () => [
        { value: "", label: "Filter by gender" },
        ...Object.values(GENDER_VALUES).map((el) => ({
          value: el,
          label: capitalize(el),
        })),
      ],
      []
    );

    return (
      <Select
        ref={ref}
        className="border p-2 rounded"
        options={genderSelectOptions}
        {...props}
      />
    );
  }
);

export default GenderFilter;
