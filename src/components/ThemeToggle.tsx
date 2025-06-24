import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={toggleTheme}
          variant="ghost"
          className="hover:bg-muted hover:text-primary absolute top-4 left-4 cursor-pointer rounded-full p-2 transition-colors"
          aria-label={dark ? "העבר למצב בהיר" : "העבר למצב כהה"}
        >
          <span className="sr-only">Toggle theme</span>
          <Sun
            className={`h-5 w-5 transition-transform duration-300 ${
              dark ? "scale-0 rotate-90" : "scale-100"
            }`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-transform duration-300 ${
              dark ? "scale-100" : "scale-0 -rotate-90"
            }`}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="center">
        {dark ? "מצב בהיר" : "מצב כהה"}
      </TooltipContent>
    </Tooltip>
  );
}
