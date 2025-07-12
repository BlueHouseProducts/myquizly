"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Sync state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
    } else {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  // Apply selected theme
  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as "light" | "dark" | "system";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <><nav className="w-fit ml-4 mb-2 mt-4 bg-blue-500/20 py-2 px-4 rounded-xl"><Settings /></nav>
    
    <div className="max-w-md  p-6 mt-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      <div>
        <label
          htmlFor="theme"
          className="block font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Theme
        </label>
        <select
          id="theme"
          value={theme}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          This setting does not save to other devices.
        </p>
      </div>
    </div></>
  );
}
