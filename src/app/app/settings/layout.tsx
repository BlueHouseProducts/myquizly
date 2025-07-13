"use client";

import { AppLeftContents, AppLeftNav, NavItem } from "@/comp/navs/app_left_nav";
import { HelpCircle, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50">
      <AppLeftNav title="Settings">
        <NavItem href="/app/settings/" icon={<User size={20} />} label="Account" active={pathname === "/app/settings"} />
        <NavItem href="/app/settings/privacy" icon={<Lock size={20} />} label="Privacy" active={pathname === "/app/settings/privacy"} />
        <NavItem href="/app/settings/support" icon={<HelpCircle size={20} />} label="Support" active={pathname === "/app/settings/support"} />
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}