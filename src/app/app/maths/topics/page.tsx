import { TopicList, TopicItem } from "@/comp/subjects/topics_items";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default function Maths_Topics() {
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">Maths Topics</h1>

    <ul className="w-full">
      <TopicList>
        <TopicItem Url="algebra" Badge="A" ImageLogo={Calculator} Title="Algebra" />
      </TopicList>
    </ul>
  </>
}