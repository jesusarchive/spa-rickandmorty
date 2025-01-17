import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

import useCharacterListContext from "../../providers/character-list-provider.hook";
import { setFilters } from "../../providers/character-list-provider.state";

const schema = z.object({
  nameFilter: z.string().optional(),
  statusFilter: z
    .string()
    .optional()
    .refine(
      (data) => (data ? ["alive", "dead", "unknown"].includes(data) : true),
      {
        message: "Status must be alive, dead, or unknown",
      }
    ),
  speciesFilter: z.string().optional(),
  typeFilter: z.string().optional(),
  genderFilter: z
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { dispatch } = useCharacterListContext();

  const handleApplySearch = (data) => {
    setFilters(dispatch)({
      filters: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleApplySearch)}
      className="w-full h-24 flex items-center justify-between px-4"
    >
      <div className="flex items-center gap-4">
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by name"
            {...register("nameFilter")}
          />
          {errors.nameFilter && <p>{errors.nameFilter.message as string} </p>}
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
            {...register("statusFilter")}
          />
          {errors.statusFilter && (
            <p>{errors.statusFilter.message as string}</p>
          )}
        </div>
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by species"
            {...register("speciesFilter")}
          />
          {errors.speciesFilter && (
            <p>{errors.speciesFilter.message as string}</p>
          )}
        </div>
        <div>
          <Input
            className="border p-2 rounded"
            type="text"
            placeholder="Filter by type"
            {...register("typeFilter")}
          />
          {errors.typeFilter && <p>{errors.typeFilter.message as string}</p>}
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
            {...register("genderFilter")}
          />
          {errors.genderFilter && (
            <p>{errors.genderFilter.message as string}</p>
          )}
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
