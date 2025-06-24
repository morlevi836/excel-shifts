import type { Person } from "@/types/Person";

interface ShiftTableProps {
  people: Person[];
  todayShiftIds: number[];
  yesterdayShiftIds: number[];
}

export function ShiftTable({
  people,
  todayShiftIds,
  yesterdayShiftIds,
}: ShiftTableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
      <table className="rtl w-full min-w-[700px] table-fixed text-right">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              שם
            </th>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              תעודת זהות
            </th>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              טלפון
            </th>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              כתובת
            </th>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              אימייל
            </th>
            <th className="border-b border-gray-300 px-4 py-3 dark:border-zinc-600">
              משמרת
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            let shift = "ללא משמרת";
            if (todayShiftIds.includes(person.id)) shift = "משמרת נכנסת";
            else if (yesterdayShiftIds.includes(person.id))
              shift = "משמרת יוצאת";

            return (
              <tr
                key={person.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <td className="truncate px-4 py-2">{person.name}</td>
                <td className="truncate px-4 py-2">{person.securityNumber}</td>
                <td className="truncate px-4 py-2">{person.phone}</td>
                <td className="truncate px-4 py-2">{person.address}</td>
                <td className="truncate px-4 py-2">{person.email}</td>
                <td className="px-4 py-2 font-semibold">{shift}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
