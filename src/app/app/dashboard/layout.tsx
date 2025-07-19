"use client";

import { AppLeftContents, AppLeftNav, NavItem } from "@/comp/navs/app_left_nav";
import { History, LayoutDashboard, List, Lock, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title="Overview">
        <NavItem href="/app/dashboard/" icon={<LayoutDashboard size={20} />} label="User Overview" active={pathname === "/app/dashboard"} />
        <NavItem href="/app/dashboard/subjects" icon={<List size={20} />} label="Subjects" active={pathname === "/app/dashboard/subjects"} />
        <NavItem href="/app/dashboard/search" icon={<Search size={20} />} label="Search" active={pathname === "/app/dashboard/search"} />
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}