"use client";

import { AppLeftContents, AppLeftNav, NavItem, QuizMainSidebar, QuizQuestionSidebar } from "@/comp/navs/app_left_nav";
import { databases } from "@/lib/appwriteClient";
import { Calculator, ChevronLeft, History, LayoutDashboard, List, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CSMainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isInQuiz = pathname.startsWith("/app/cs/q");

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title="CompSci">
        { isInQuiz ? 
        <QuizQuestionSidebar subject="cs" pn={pathname} />
        :
        <QuizMainSidebar subject="cs" pn={pathname} />
        }
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}