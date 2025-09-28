import PdfPage from "@/comp/pdf/main";
import PydlePage from "@/comp/pydle/main";
import { subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";

export default async function QuizPage({ params } : {params: Promise<{pydle_id: string, subject: subjectType}> } ) {
  const subject = validateSubjectOrRedirect((await params).subject);
  
  const qid = (await params).pydle_id;
  
  return <PydlePage pydle_id={qid} subject={subject} />
}