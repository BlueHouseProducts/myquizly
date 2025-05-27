"use client";

import { AppLeftContents, AppLeftNav, NavItem } from "@/comp/navs/app_left_nav";
import { Calculator, History, LayoutDashboard, List, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MathsMainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title="Maths">
        <NavItem href="/app/maths/" icon={<Calculator size={20} />} label="Overview" active={pathname === "/app/maths"} />
        <NavItem href="/app/maths/topics" icon={<List size={20} />} label="Topics" active={pathname.startsWith("/app/maths/topics")} />
        <NavItem href="/app/maths/#" icon={<History size={20} />} label="Quiz History" active={pathname === "/app/maths/#"} />
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}