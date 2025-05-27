import ListTablePage from "@/comp/topic_list/list_table_page";
import { ChevronRight, CloudAlert } from "lucide-react";
import Link from "next/link";

const subtopics: {[key: string]: { codes: string[], name: string }[]} = {
  algebra: [{
    codes: ["a1", "a2", "a3", "a4", "a5", "a6", "a7"].map((s) => s.toLowerCase()),
    name: "Notation, vocabulary and manipulation",
  }],
}

export default async function MathsTopicPage({params}: {params: Promise<{topic: string}>}) {
  const topic = (await params).topic.toLowerCase();
  
  function capitalise(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  if (!subtopics[topic]) {
    return <>
      <p className="select-none text-lg flex flex-row gap-2">
      <Link className="hover:dark:text-blue-300 hover:text-blue-700 underline-offset-4 underline transition-colors" href="/app/maths/">Maths</Link> 
     <ChevronRight />
     <Link className="hover:dark:text-blue-300 hover:text-blue-700 underline-offset-4 underline transition-colors" href="/app/maths/topics">Topics</Link> 
     <ChevronRight />
     {capitalise(topic)}</p>
    <h1 className="text-3xl md:text-4xl font-bold my-2">Quizes on {capitalise(topic)}</h1>

    <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
      <CloudAlert size={40} />
      <h2 className="text-xl">We don't think that topic exists!</h2>
    </div>
    <Link href="." className="underline">Back to all topics...</Link></>
    </>
  }

  return <>
    <p className="select-none text-lg flex flex-row gap-2">
      <Link className="hover:dark:text-blue-300 hover:text-blue-700 underline-offset-4 underline transition-colors" href="/app/maths/">Maths</Link> 
     <ChevronRight />
     <Link className="hover:dark:text-blue-300 hover:text-blue-700 underline-offset-4 underline transition-colors" href="/app/maths/topics">Topics</Link> 
     <ChevronRight />
     {capitalise(topic)}</p>
    <h1 className="text-3xl md:text-4xl font-bold my-2">Quizes on {capitalise(topic)}</h1>

    <ListTablePage exam_board="edexcell" subject="maths" name={capitalise(topic)} subtopics={subtopics[topic.toLowerCase()]} />
  </>
}