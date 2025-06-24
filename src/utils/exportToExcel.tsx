import * as XLSX from "xlsx";
import type { Person } from "@/types/Person";
import moment from "moment";

export function exportShifts(
  allPeople: Person[],
  today: Person[],
  yesterday: Person[],
  shiftTime: "בוקר" | "ערב",
  date: Date,
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
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 25 },
    { wch: 30 },
    { wch: 15 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "משמרות");
  XLSX.writeFile(
    wb,
    `דמח - משמרת ${shiftTime} ${moment(date).format("DD-MM-YYYY")}.xlsx`,
  );
}
