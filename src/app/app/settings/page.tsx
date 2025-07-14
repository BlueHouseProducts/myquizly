"use client";

import { client } from "@/lib/appwriteClient";
import { Account, Models } from "appwrite";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [account, setAccount] = useState<Models.User<Models.Preferences>>();

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

  useEffect(() => {
    async function g() {
      try {
        const account = new Account(client);
        const u = await account.get();

        setAccount(u);
      } catch (e) {
        return false;
      }
    }

    g();
  })

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
      <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      { account && <div className="mb-6">
        <p className="text-lg">Hello, {account.name}!</p>
        <div className="flex flex-row gap-2">
          { account.labels.map((lbl, idx) => <p className="px-2 bg-blue-200 dark:bg-black rounded-full" key={idx}>{lbl}</p>) }
        </div>
      </div> }

      <h2 className="text-2xl">Preferences</h2>

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
      </div>
    </div></>
  );
}
