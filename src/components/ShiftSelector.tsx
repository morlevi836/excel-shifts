import type { Person } from "@/types/Person";
import { MultiSelect } from "./MultiSelect";

interface ShiftSelectorProps {
  label: string;
  people: Person[];
  selected: number[];
  setSelected: (ids: number[]) => void;
  disabledValues?: string[];
}

export function ShiftSelector({
  label,
  people,
  selected,
  setSelected,
  disabledValues = [],
}: ShiftSelectorProps) {
  return (
    <div className="my-4 text-right">
      <h3 className="mb-2 text-lg font-semibold">{label}</h3>
      <MultiSelect
        options={people.map((p) => ({ label: p.name, value: p.id.toString() }))}
        value={selected.map((id) => id.toString())}
        onValueChange={(vals) => setSelected(vals.map(Number))}
        disabledValues={disabledValues}
      />
    </div>
  );
}
