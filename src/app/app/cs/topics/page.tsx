import { TopicItem, TopicList } from "@/comp/subjects/topics_items";
import { Calculator, Cpu } from "lucide-react";
import Link from "next/link";

export default function Maths_Topics() {
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">Computer Science Topics</h1>

    <ul className="w-full">
      <TopicList>
        <TopicItem Url="systems" Badge="1.1" ImageLogo={Cpu} Title="Systems Architecture" />
      </TopicList>
    </ul>
  </>
}