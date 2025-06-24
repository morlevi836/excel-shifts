import React from "react";
import { people } from "@/data/people";
import { exportShifts } from "@/utils/exportToExcel";
import { ShiftSelector } from "@/components/ShiftSelector";
import { ShiftTable } from "@/components/ShiftTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function App() {
  const [todayShift, setTodayShift] = React.useState<number[]>([]);
  const [yesterdayShift, setYesterdayShift] = React.useState<number[]>([]);

  const handleDownload = () => {
    exportShifts(
      people,
      people.filter((p) => todayShift.includes(p.id)),
      people.filter((p) => yesterdayShift.includes(p.id)),
    );
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
          <Tooltip>
            <TooltipTrigger>
              <Download className="cursor-pointer" onClick={handleDownload} />
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              הוצאה לאקסל
            </TooltipContent>
          </Tooltip>{" "}
        </div>

        <ShiftSelector
          label="משמרת היום"
          people={people}
          selected={todayShift}
          setSelected={setTodayShift}
          disabledValues={yesterdayShift.map(String)}
        />

        <ShiftSelector
          label="משמרת אתמול"
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
    </div>
  );
}

export default App;
