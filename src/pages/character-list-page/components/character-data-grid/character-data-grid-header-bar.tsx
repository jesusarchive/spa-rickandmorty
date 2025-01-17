import { useState } from "react";

import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";

export default function CharacterDataGridHeaderBar() {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const handleApplySearch = () => {
    console.log("Applying search with filters:", {
      nameFilter,
      statusFilter,
      speciesFilter,
      typeFilter,
      genderFilter,
    });
  };

  return (
    <div className="w-full h-24 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Input
          className="border p-2 rounded"
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Select
          className="border p-2 rounded"
          options={[
            { value: "", label: "Filter by status" },
            { value: "alive", label: "Alive" },
            { value: "dead", label: "Dead" },
            { value: "unknown", label: "Unknown" },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <Input
          className="border p-2 rounded"
          type="text"
          placeholder="Filter by species"
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        />
        <Input
          className="border p-2 rounded"
          type="text"
          placeholder="Filter by type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        />
        <Select
          className="border p-2 rounded"
          options={[
            { value: "", label: "Filter by gender" },
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "genderless", label: "Genderless" },
            { value: "unknown", label: "Unknown" },
          ]}
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        />
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleApplySearch}
        >
          Apply Search
        </Button>
      </div>
    </div>
  );
}
