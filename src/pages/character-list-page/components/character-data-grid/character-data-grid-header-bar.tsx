import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import type { CharacterFilters } from "@/rest-clients/rick-and-morty/types";

import useCharacterListContext from "../../providers/character-list-provider.hook";
import { setFilters } from "../../providers/character-list-provider.state";

const schema = z.object({
  name: z.string().optional(),
  status: z
    .string()
    .optional()
    .refine(
      (data) => (data ? ["alive", "dead", "unknown"].includes(data) : true),
      {
        message: "Status must be alive, dead, or unknown",
      }
    ),
  species: z.string().optional(),
  type: z.string().optional(),
  gender: z
    .string()
    .optional()
    .refine(
      (data) =>
        data
          ? ["female", "male", "genderless", "unknown"].includes(data)
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: filters as CharacterFilters,
  });

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
            options={[
              { value: "", label: "Filter by status" },
              { value: "alive", label: "Alive" },
              { value: "dead", label: "Dead" },
              { value: "unknown", label: "Unknown" },
            ]}
            {...register("status")}
          />
          {errors.status && <p>{errors.status.message as string}</p>}
        </div>
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by species"
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
            options={[
              { value: "", label: "Filter by gender" },
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "genderless", label: "Genderless" },
              { value: "unknown", label: "Unknown" },
            ]}
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
