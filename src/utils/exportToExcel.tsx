import * as XLSX from "xlsx";
import type { Person } from "@/types/Person";

export function exportShifts(
  allPeople: Person[],
  today: Person[],
  yesterday: Person[],
) {
  const shiftMap = new Map<number, string>();
  today.forEach((p) => shiftMap.set(p.id, "משמרת היום"));
  yesterday.forEach((p) => shiftMap.set(p.id, "משמרת אתמול"));

  const combined = allPeople.map((p) => ({
    שם: p.name,
    תעודת_זהות: p.securityNumber,
    טלפון: p.phone,
    כתובת: p.address,
    אימייל: p.email,
    משמרת: shiftMap.get(p.id) ?? "ללא משמרת",
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(combined, {
    header: ["שם", "תעודת_זהות", "טלפון", "כתובת", "אימייל", "משמרת"],
  });

  ws["!cols"] = [
    { wch: 20 }, // שם
    { wch: 15 }, // תעודת זהות
    { wch: 15 }, // טלפון
    { wch: 30 }, // כתובת
    { wch: 25 }, // אימייל
    { wch: 15 }, // משמרת
  ];

  XLSX.utils.book_append_sheet(wb, ws, "משמרות");
  XLSX.writeFile(wb, "משמרות.xlsx");
}
