import { QuizMainPage } from "@/comp/quiz/quiz_page";
import { subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";

export default async function QuizPage({ params } : {params: Promise<{quiz_id: string, subject: subjectType}> } ) {
  const subject = validateSubjectOrRedirect((await params).subject);
  
  const qid = (await params).quiz_id;
  
  return <QuizMainPage quiz_id={qid} subject={subject} />
}