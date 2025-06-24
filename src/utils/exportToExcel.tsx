import type { Person } from "@/types/Person";
import * as XLSX from "xlsx-js-style";
import moment from "moment";

export function exportShifts(
  allPeople: Person[],
  today: Person[],
  yesterday: Person[],
  shiftTime: "בוקר" | "ערב",
  selectedDate: Date,
) {
  const shiftMap = new Map<number, string>();
  today.forEach((p) => shiftMap.set(p.id, "משמרת נכנסת"));
  yesterday.forEach((p) => shiftMap.set(p.id, "משמרת יוצאת"));

  const combined = allPeople.map((p) => ({
    name: p.name,
    id: p.securityNumber,
    phone: p.phone,
    address: p.address,
    email: p.email,
    shift: shiftMap.get(p.id) ?? "ללא משמרת",
  }));

  const wsData = [
    ["שם", "תעודת זהות", "טלפון", "כתובת", "אימייל", "משמרת"],
    ...combined.map((row) => [
      row.name,
      row.id,
      row.phone,
      row.address,
      row.email,
      row.shift,
    ]),
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "E0E0E0" } }, // light gray
  };

  const todayStyle = {
    fill: { fgColor: { rgb: "FFFACD" } }, // Light yellow
    font: { bold: true },
    alignment: { horizontal: "center" },
  };

  const yesterdayStyle = {
    fill: { fgColor: { rgb: "FFDAB9" } }, // Peach puff
    font: { bold: true },
    alignment: { horizontal: "center" },
  };

  // Style header row
  const headerRow = wsData[0];
  headerRow.forEach((_, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: 0 });
    if (ws[cellRef]) {
      ws[cellRef].s = headerStyle;
    }
  });

  // Style data rows
  for (let rowIdx = 1; rowIdx < wsData.length; rowIdx++) {
    const shift = wsData[rowIdx][5];
    const style =
      shift === "משמרת נכנסת"
        ? todayStyle
        : shift === "משמרת יוצאת"
          ? yesterdayStyle
          : undefined;

    if (style) {
      for (let colIdx = 0; colIdx < 6; colIdx++) {
        const cellRef = XLSX.utils.encode_cell({ c: colIdx, r: rowIdx });
        if (ws[cellRef]) {
          ws[cellRef].s = style;
        }
      }
    }
  }

  // Optional: adjust column widths
  ws["!cols"] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 30 },
    { wch: 25 },
    { wch: 15 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "משמרות");

  XLSX.writeFile(
    wb,
    `דמח - משמרת ${shiftTime} - ${moment(selectedDate).format("DD-MM-YYYY")}.xlsx`,
  );
}
