import { TopicList, TopicItem, AutoTopicItems } from "@/comp/subjects/topics_items";
import { subjectData, subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default async function Maths_Topics({ params }: { params: Promise<{ subject: subjectType }> }) {
  const subject = validateSubjectOrRedirect((await params).subject);
  
  const topics = subjectData[(await params).subject];

  if (!topics) {
    return <p>This subject is not completed yet. Check back later.</p>
  }
  
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">Topics</h1>

    <ul className="w-full">
      <TopicList>
        <AutoTopicItems topics={topics} />
      </TopicList>
    </ul>
  </>
}