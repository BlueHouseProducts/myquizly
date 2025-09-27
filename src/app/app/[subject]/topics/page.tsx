import { getUserServerCurrent } from "@/comp/ssr/auth";
import { TopicList, TopicItem, AutoTopicItems } from "@/comp/subjects/topics_items";
import { dbData, subjectData, subjectType } from "@/lib/dbCompData";
import { UserAdmin } from "@/lib/dbQuiz";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { Calculator, Database, Link2 } from "lucide-react";
import Link from "next/link";

export default async function Maths_Topics({ params }: { params: Promise<{ subject: subjectType }> }) {
  const subject = validateSubjectOrRedirect((await params).subject);
  const topics = subjectData[subject];

  const isAdmin = await UserAdmin();

  if (!topics) {
    return <p>This subject is not completed yet. Check back later.</p>
  }
  
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">Topics</h1>

    { isAdmin && <div className="my-3 bg-black/20 py-2 rounded-full px-4">
      <Database className="inline-block mx-2" /><Link className="underline" href={process.env.APP_CONSOLE! + `databases/database-${dbData.quiz_db.id}/collection-${dbData.quiz_db.collections[subject]}`}><span className="font-bold">You're an admin! </span> View the database dashboard for this subject.</Link>
    </div> }

    <Link href={`allQuizlets`} className="my-3 bg-black/20 py-2 rounded-full px-4">
      <Link2 className="inline-block mx-2" /> View all quizlets in {subject}
    </Link>

    <ul className="w-full">
      <TopicList>
        <AutoTopicItems topics={topics} />
      </TopicList>
    </ul>
  </>
}