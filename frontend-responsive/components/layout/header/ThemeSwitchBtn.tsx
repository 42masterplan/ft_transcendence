import { Switch } from "@/components/shadcn/ui/switch";
import { Label } from "@/components/shadcn/ui/label";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitchBtn() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const modeIcon = isDark ? <Moon className="mr-2 h-4 w-4"/> : <Sun className="mr-2 h-4 w-4"/>;
  
  // return a switch button that toggles between light and dark mode
  return (
    <div className="flex items-center">
      {/* <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {isDark ? "Dark" : "Light"}
      </span> */}
      <span>{modeIcon}</span>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
}
