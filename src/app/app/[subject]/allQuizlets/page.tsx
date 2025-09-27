import { TopicError } from "@/comp/subjects/subtopic_items";
import { subjectData, subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { QuizletList } from "./listQuizlets";

export default async function MathsTopicPage({params} : {params: Promise<{topic: string, subject: string}>}) {
  const subject = validateSubjectOrRedirect((await params).subject);

  return <div>
    <h1 className="text-3xl font-bold mb-4">{subject}</h1>

    <QuizletList subject={subject}/>

  </div>
}
