// components/DatePicker.tsx
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-right dark:bg-zinc-800"
        >
          <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
          {date ? format(date, "dd/MM/yyyy", { locale: he }) : "בחר תאריך"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        style={{
          direction: "ltr",
        }}
        align="end"
      >
        <Calendar
          mode="single"
          required
          selected={date ?? new Date()}
          onSelect={setDate}
          initialFocus
          locale={he}
        />
      </PopoverContent>
    </Popover>
  );
}
