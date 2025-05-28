"use client";

import { AppLeftContents, AppLeftNav, NavItem } from "@/comp/navs/app_left_nav";
import { databases } from "@/lib/appwriteClient";
import { Calculator, ChevronLeft, History, LayoutDashboard, List, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CSMainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isInQuiz = pathname.startsWith("/app/cs/q");

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title="CompSci">
        { isInQuiz ? <><NavItem href="#" icon={<Calculator size={20} />} label="Quiz" active={true} />
        <NavItem href="." icon={<ChevronLeft size={20} />} label="Back to subject" active={false} /></>
        :

        <><NavItem href="/app/cs/" icon={<Calculator size={20} />} label="Overview" active={pathname === "/app/cs"} />
        <NavItem href="/app/cs/topics" icon={<List size={20} />} label="Topics" active={pathname.startsWith("/app/cs/topics")} />
        <NavItem href="/app/cs/#" icon={<History size={20} />} label="Quiz History" active={pathname === "/app/cs/#"} /></> }
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}