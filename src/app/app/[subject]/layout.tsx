import { AppLeftContents, AppLeftNav, QuizMainSidebar } from "@/comp/navs/app_left_nav";
import { subjectType } from "@/lib/dbCompData";

export default async function MathsMainLayout({ children, params }: {
  children: React.ReactNode;
  params: { subject: subjectType };
}) {
  const subject = (await params).subject;

  return (
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50 overflow-hidden">
      <AppLeftNav title={subject}>
        <QuizMainSidebar subject={subject} />
      </AppLeftNav>

      <AppLeftContents>
        {children}
      </AppLeftContents>
    </main>
  );
}
