import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  placeholder = "בחר חיילים...",
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

  const selectAll = () => {
    const filtered = options
      .filter((o) => !disabledValues.includes(o.value))
      .map((o) => o.value);
    onValueChange(filtered);
  };

  const clearAll = () => {
    onValueChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "focus:ring-primary w-full rounded-md border bg-white px-3 py-2 text-right shadow-sm transition focus:ring-2 focus:ring-offset-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white",
          "min-h-[40px] cursor-pointer text-sm",
        )}
      >
        <div className="flex flex-wrap items-center gap-1">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((val) => {
              const label = options.find((o) => o.value === val)?.label;
              return (
                <Badge
                  key={val}
                  variant="secondary"
                  className="flex cursor-pointer items-center gap-1 transition hover:opacity-80"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent popover from toggling
                    toggleOption(val);
                  }}
                >
                  {label}
                  <X className="h-3 w-3" />
                </Badge>
              );
            })
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 text-right">
        <Command>
          <div className="flex items-center justify-between px-2 pt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={selectAll}
              className="text-xs"
            >
              בחר הכל
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearAll}
              className="text-xs"
            >
              אפס הכל
            </Button>
          </div>
          <CommandInput
            placeholder="הקלד כדי לחפש..."
            className="mx-2 mt-2 text-sm"
          />
          <CommandEmpty className="text-muted-foreground p-2 text-sm">
            לא נמצאו תוצאות
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                const isDisabled = disabledValues.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (!isDisabled) toggleOption(option.value);
                    }}
                    className={cn(
                      "cursor-pointer",
                      isDisabled ? "pointer-events-none opacity-40" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "border-primary ml-2 flex h-4 w-4 items-center justify-center rounded-sm border transition",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
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
