import PdfPage from "@/comp/pdf/main";
import { subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";

export default async function QuizPage({ params } : {params: Promise<{pdf_id: string, subject: subjectType}> } ) {
  const subject = validateSubjectOrRedirect((await params).subject);
  
  const qid = (await params).pdf_id;
  
  return <PdfPage pdf_id={qid} subject={subject} />
}