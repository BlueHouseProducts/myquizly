import { subjectType } from "@/lib/dbCompData";

export function QuizMainPage({ quiz_id, subject }: { quiz_id: string, subject: subjectType }) {
  return <p>Test, {quiz_id}, {subject}</p>
}