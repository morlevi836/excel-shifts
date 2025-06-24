import React from "react";
import { people } from "@/data/people";
import { exportShifts } from "@/utils/exportToExcel";
import { ShiftSelector } from "@/components/ShiftSelector";
import { ShiftTable } from "@/components/ShiftTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Download } from "lucide-react";
import { DatePicker } from "./components/DatePicker";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      selectedDate,
    );

    toast.success("קובץ האקסל נוצר בהצלחה!");
  };

  const toggleShiftTime = () => {
    setShiftTime((prev) => (prev === "בוקר" ? "ערב" : "בוקר"));
  };

  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen w-full flex-col bg-white px-4 py-6 text-right text-black sm:px-8 md:px-12 lg:px-16 dark:bg-zinc-900 dark:text-white"
    >
      <div className="mx-auto w-1/2 max-sm:mx-0 max-sm:w-full">
        <ThemeToggle />

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold sm:text-3xl">בחירת משמרות</h1>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
            <Button
              onClick={toggleShiftTime}
              className="bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary rounded-full px-6 py-2 text-sm font-semibold shadow-md transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              משמרת {shiftTime}
            </Button>

            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        <ShiftSelector
          label="משמרת יוצאת"
          people={people}
          selected={yesterdayShift}
          setSelected={setYesterdayShift}
          disabledValues={todayShift.map(String)}
        />

        <ShiftSelector
          label="משמרת נכנסת"
          people={people}
          selected={todayShift}
          setSelected={setTodayShift}
          disabledValues={yesterdayShift.map(String)}
        />

        {/* Shift Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-muted text-muted-foreground relative rounded-xl border p-4 shadow-sm dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1 font-semibold">משמרת יוצאת</h4>
                <p>{yesterdayShift.length} עובדים נבחרו</p>
              </div>

              {yesterdayShift.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive transition"
                      onClick={() => setYesterdayShift([])}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>איפוס משמרת יוצאת</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="bg-secondary text-secondary-foreground relative rounded-xl border p-4 shadow-sm dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1 font-semibold">משמרת נכנסת</h4>
                <p>{todayShift.length} עובדים נבחרו</p>
              </div>

              {todayShift.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive transition"
                      onClick={() => setTodayShift([])}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>איפוס משמרת נכנסת</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 w-full overflow-x-auto">
        <ShiftTable
          people={people}
          todayShiftIds={todayShift}
          yesterdayShiftIds={yesterdayShift}
        />
      </div>

      {/* Floating Download Button */}
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
