import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "בחר עובדים...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue));
    } else {
      onValueChange([...value, optionValue]);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("rtl w-full justify-between")}
        >
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}
          <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rtl w-full p-0 text-right">
        <Command>
          <CommandInput placeholder="הקלד כדי לחפש..." />
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(option.value)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "border-primary ml-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      value.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
