import { AppLeftContents, AppLeftNav, QuizMainSidebar, ScienceMainSidebar } from "@/comp/navs/app_left_nav";
import { subjectType } from "@/lib/dbCompData";

export default async function MathsMainLayout({ children}: {
  children: React.ReactNode;
  params: { subject: subjectType };
}) {
  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title={"Science"}>
        <ScienceMainSidebar />
      </AppLeftNav>

      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}
