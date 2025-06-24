import React from "react";
import { people } from "@/data/people";
import { exportShifts } from "@/utils/exportToExcel";
import { ShiftSelector } from "@/components/ShiftSelector";
import { ShiftTable } from "@/components/ShiftTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Download } from "lucide-react";
import { DatePicker } from "./components/DatePicker";
import { Button } from "./components/ui/button";

function App() {
  const [todayShift, setTodayShift] = React.useState<number[]>([]);
  const [yesterdayShift, setYesterdayShift] = React.useState<number[]>([]);
  const [shiftTime, setShiftTime] = React.useState<"בוקר" | "ערב">("בוקר");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDownload = () => {
    if (!selectedDate) return;

    exportShifts(
      people,
      people.filter((p) => todayShift.includes(p.id)),
      people.filter((p) => yesterdayShift.includes(p.id)),
      shiftTime,
      selectedDate, // 👈 new
    );
  };

  const toggleShiftTime = () => {
    setShiftTime((prev) => (prev === "בוקר" ? "ערב" : "בוקר"));
  };

  return (
    <div
      dir="rtl"
      className="relative mx-auto flex min-h-screen w-[95%] flex-col items-center bg-white px-4 py-10 text-right text-black dark:bg-zinc-900 dark:text-white"
    >
      <div className="w-1/2">
        <ThemeToggle />

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">בחירת משמרות</h1>

          <div className="flex items-center justify-end gap-4">
            <Button
              onClick={toggleShiftTime}
              className="bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary cursor-pointer rounded-full px-6 py-2 text-sm font-semibold shadow-md transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              משמרת {shiftTime}
            </Button>

            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        <ShiftSelector
          label="משמרת נוכחית"
          people={people}
          selected={todayShift}
          setSelected={setTodayShift}
          disabledValues={yesterdayShift.map(String)}
        />

        <ShiftSelector
          label="משמרת יוצאת"
          people={people}
          selected={yesterdayShift}
          setSelected={setYesterdayShift}
          disabledValues={todayShift.map(String)}
        />
      </div>

      <ShiftTable
        people={people}
        todayShiftIds={todayShift}
        yesterdayShiftIds={yesterdayShift}
      />

      <Button
        onClick={handleDownload}
        className="bg-primary text-primary-foreground hover:bg-primary/90 fixed bottom-4 left-4 z-50 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition"
      >
        <Download className="h-4 w-4" />
        הוצאה לאקסל
      </Button>
    </div>
  );
}

export default App;
