import { AutoTopicItems, TopicItem, TopicList } from "@/comp/subjects/topics_items";
import { subjectData } from "@/lib/dbCompData";
import { Calculator, Cpu } from "lucide-react";
import Link from "next/link";

const topics = subjectData.french;
const name = "French"

export default function Maths_Topics() {
  if (!topics) {
    return <p>This subject is not completed yet. Check back later.</p>
  }
  
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">{name} Science Topics</h1>

    <ul className="w-full">
      <TopicList>
        <AutoTopicItems topics={topics} />
      </TopicList>
    </ul>
  </>
}