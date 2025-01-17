import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/button";
import type {
  CharacterFilters,
  CharacterGender,
  CharacterSpecie,
  CharacterStatus,
} from "@/rest-clients/rick-and-morty/types";

import useCharacterListContext from "../../providers/character-list-provider.hook";
import {
  setFilters,
  setResults,
} from "../../providers/character-list-provider.state";
import GenderFilter, { GENDER_VALUES } from "./filters/gender-filter";
import NameFilter from "./filters/name-filter";
import SpecieFilter, { SPECIE_VALUES } from "./filters/specie-filter";
import StatusFilter, { STATUS_VALUES } from "./filters/status-filter";
import TypeFilter from "./filters/type-filter";

const schema = z.object({
  name: z.string().optional(),
  status: z
    .string()
    .optional()
    .refine(
      (data) =>
        data
          ? Object.values(STATUS_VALUES).includes(data as CharacterStatus)
          : true,
      {
        message: "Status must be alive, dead, or unknown",
      }
    ),
  species: z
    .string()
    .optional()
    .refine(
      (data) =>
        data
          ? Object.values(SPECIE_VALUES).includes(data as CharacterSpecie)
          : true,
      {
        message: "Species must be human or humanoid",
      }
    ),
  type: z.string().optional(),
  gender: z
    .string()
    .optional()
    .refine(
      (data) =>
        data
          ? Object.values(GENDER_VALUES).includes(data as CharacterGender)
          : true,
      {
        message: "Gender must be female, male, genderless, or unknown",
      }
    ),
});

export default function CharacterDataGridHeaderBar() {
  const {
    state: { filters, results },
    dispatch,
  } = useCharacterListContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: filters as CharacterFilters,
  });

  const fullReset = () => {
    setResults(dispatch)({ results: null });
    setFilters(dispatch)({ filters: null });
    reset();
  };

  const onSearch = (data: CharacterFilters) => {
    setFilters(dispatch)({
      filters: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="w-full flex flex-wrap items-center justify-between gap-4"
    >
      <div className="w-full flex flex-wrap items-center justify-between px-12 py-5">
        <div className="flex gap-4">
          <span className="font-bold text-xl">
            Results: {results?.length ?? 0}
          </span>
          <Button type="button" onClick={fullReset} variant="ghost" size="sm">
            <RefreshCwIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-4">
          <div>
            <NameFilter {...register("name")} />
            {errors.name && <p>{errors.name.message as string} </p>}
          </div>
          <div>
            <StatusFilter {...register("status")} />
            {errors.status && <p>{errors.status.message as string}</p>}
          </div>
          <div>
            <SpecieFilter {...register("species")} />
            {errors.species && <p>{errors.species.message as string}</p>}
          </div>
          <div>
            <TypeFilter {...register("type")} />
            {errors.type && <p>{errors.type.message as string}</p>}
          </div>
          <div>
            <GenderFilter {...register("gender")} />
            {errors.gender && <p>{errors.gender.message as string}</p>}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <Button type="submit">Apply Search</Button>
          </div>
          <div>
            <Button type="button" onClick={fullReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
