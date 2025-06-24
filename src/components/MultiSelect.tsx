import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  disabledValues?: string[];
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "בחר עובדים...",
  disabledValues = [],
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue));
    } else {
      onValueChange([...value, optionValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "focus:ring-primary w-full rounded-md border bg-white px-3 py-2 text-right shadow-sm focus:ring-2 focus:ring-offset-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white",
          "flex min-h-[40px] cursor-pointer flex-wrap items-center gap-1",
          value.length === 0 && "text-gray-400 dark:text-gray-500",
        )}
      >
        {value.length === 0
          ? placeholder
          : value
              .map((val) => options.find((o) => o.value === val)?.label)
              .filter(Boolean)
              .join(", ")}
      </PopoverTrigger>
      <PopoverContent className="rtl w-full p-0 text-right">
        <Command>
          <CommandInput placeholder="הקלד כדי לחפש..." />
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const disabled = disabledValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (!disabled) toggleOption(option.value);
                    }}
                    className={cn(
                      "cursor-pointer",
                      disabled ? "pointer-events-none opacity-40" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "border-primary ml-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        value.includes(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                        disabled ? "opacity-40" : "",
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
