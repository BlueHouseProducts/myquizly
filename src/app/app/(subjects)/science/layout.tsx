"use client";

import { AppLeftContents, AppLeftNav, NavItem, QuizMainSidebar, QuizQuestionSidebar } from "@/comp/navs/app_left_nav";
import { databases } from "@/lib/appwriteClient";
import { subjectType } from "@/lib/dbCompData";
import { Calculator, ChevronLeft, FileQuestion, History, LayoutDashboard, List, Lock, User } from "lucide-react";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

const subject = "Science"
const id: subjectType = "science";

export const metadata: Metadata = {
  title: "Quizly | " + subject,
  description: "GCSE Revision Platform",
};

export default function MathsMainLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isInQuiz = pathname.startsWith(`/app/${id}/q`);

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title={subject}>
        { isInQuiz ? 
        <QuizQuestionSidebar subject={id} pn={pathname} />
        :
        <QuizMainSidebar subject={id} pn={pathname} />
        }
      </AppLeftNav>
      
      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}