import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import type { CharacterFilters } from "@/rest-clients/rick-and-morty/types";
import capitalize from "@/utils/capitalize";

import useCharacterListContext from "../../providers/character-list-provider.hook";
import { setFilters } from "../../providers/character-list-provider.state";

const STATUS_VALUES = ["alive", "dead", "unknown"];
const SPECIE_VALUES = ["human", "humanoid"];
const GENDER_VALUES = ["female", "male", "genderless", "unknown"];

const schema = z.object({
  name: z.string().optional(),
  status: z
    .string()
    .optional()
    .refine((data) => (data ? STATUS_VALUES.includes(data) : true), {
      message: "Status must be alive, dead, or unknown",
    }),
  species: z
    .string()
    .optional()
    .refine((data) => (data ? SPECIE_VALUES.includes(data) : true), {
      message: "Species must be human or humanoid",
    }),
  type: z.string().optional(),
  gender: z
    .string()
    .optional()
    .refine((data) => (data ? GENDER_VALUES.includes(data) : true), {
      message: "Gender must be female, male, genderless, or unknown",
    }),
});

export default function CharacterDataGridHeaderBar() {
  const {
    state: { filters, results },
    dispatch,
  } = useCharacterListContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: filters as CharacterFilters,
  });

  const statusSelectOptions = React.useMemo(
    () => [
      { value: "", label: "Filter by status" },
      ...STATUS_VALUES.map((el) => ({
        value: el,
        label: capitalize(el),
      })),
    ],
    []
  );

  const specieSelectOptions = React.useMemo(
    () => [
      { value: "", label: "Filter by specie" },
      ...SPECIE_VALUES.map((el) => ({
        value: el,
        label: capitalize(el),
      })),
    ],
    []
  );

  const genderSelectOptions = React.useMemo(
    () => [
      { value: "", label: "Filter by gender" },
      ...GENDER_VALUES.map((el) => ({
        value: el,
        label: capitalize(el),
      })),
    ],
    []
  );

  const onSearchButtonClick = (data: CharacterFilters) => {
    setFilters(dispatch)({
      filters: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSearchButtonClick)}
      className="w-full h-24 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="text-left">
          <p>Results: {results?.length ?? 0}</p>
        </div>
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message as string} </p>}
        </div>
        <div>
          <Select
            className="border p-2 rounded"
            options={statusSelectOptions}
            {...register("status")}
          />
          {errors.status && <p>{errors.status.message as string}</p>}
        </div>
        <div>
          <Select
            className="border p-2 rounded"
            options={specieSelectOptions}
            {...register("species")}
          />
          {errors.species && <p>{errors.species.message as string}</p>}
        </div>
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by type"
            {...register("type")}
          />
          {errors.type && <p>{errors.type.message as string}</p>}
        </div>
        <div>
          <Select
            className="border p-2 rounded"
            options={genderSelectOptions}
            {...register("gender")}
          />
          {errors.gender && <p>{errors.gender.message as string}</p>}
        </div>
        <div>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Apply Search
          </Button>
        </div>
      </div>
    </form>
  );
}
