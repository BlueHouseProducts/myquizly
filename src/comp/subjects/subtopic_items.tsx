import { ChevronRight, CloudAlert } from "lucide-react";
import Link from "next/link";

function capitalise(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function TopicError({error, topic} : {error: string, topic: string}) {
  return <>
    <h1 className="text-3xl md:text-4xl font-bold my-2">Quizzes on {capitalise(topic)}</h1>

    <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
      <CloudAlert size={40} />
      <h2 className="text-xl">{error}</h2>
    </div>
    <Link href="." className="underline">Back to all topics...</Link></>
    </>
}

export async function TopicPage({topic, children, suject_full_name}: {topic: string, children: React.ReactNode, suject_full_name: string}) {
  return <>
    <p className="select-none text-lg flex flex-row gap-2">
     <Link className="hover:dark:text-blue-300 hover:text-blue-700 underline-offset-4 underline transition-colors" href=".">Topics</Link> 
     <ChevronRight />
     {topic}</p>
    
    <h1 className="text-3xl md:text-4xl font-bold my-4">{topic}</h1>
    <h2 className="text-2xl md:text-3xl mb-2">Quizzes on {topic}</h2>

    {children}
  </>
}