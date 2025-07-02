import { QuizMainPage } from "@/comp/quiz/quiz_page";
import { subjectType } from "@/lib/dbCompData";

export default async function QuizPage({ params } : {params: Promise<{quiz_id: string, subject: subjectType}> } ) {
  const qid = (await params).quiz_id;
  
  return <QuizMainPage quiz_id={qid} subject={(await params).subject} />
}