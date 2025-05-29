"use client";

import { AppLeftContents, AppLeftNav, NavItem, QuizMainSidebar, QuizQuestionSidebar } from "@/comp/navs/app_left_nav";
import { databases } from "@/lib/appwriteClient";
import { Calculator, ChevronLeft, FileQuestion, History, LayoutDashboard, List, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MathsMainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isInQuiz = pathname.startsWith("/app/maths/q");

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title="Maths">
        { isInQuiz ? 
        <QuizQuestionSidebar subject="maths" pn={pathname} />
        :
        <QuizMainSidebar subject="maths" pn={pathname} />
        }
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}