import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 ease-out focus-ring border border-border hover:border-primary min-h-[44px] bg-transparent"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="switch"
      aria-checked={isDark}
    >
      <Sun 
        className={cn(
          "w-4 h-4 transition-all duration-300",
          isDark 
            ? "text-foreground/60" 
            : "text-primary"
        )}
      />
      <Moon 
        className={cn(
          "w-4 h-4 transition-all duration-300",
          isDark 
            ? "text-primary" 
            : "text-foreground/60"
        )}
      />
    </button>
  );
};

export default ThemeToggle;
