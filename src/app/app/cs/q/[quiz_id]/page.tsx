import { QuizMainPage } from "@/comp/quiz/quiz_page";

export default async function QuizPage({ params } : {params: Promise<{quiz_id: string}> } ) {
  const qid = (await params).quiz_id;
  
  return <QuizMainPage quiz_id={qid} subject="cs" />
}