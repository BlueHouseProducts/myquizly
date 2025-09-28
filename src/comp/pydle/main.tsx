import { subjectType } from "@/lib/dbCompData";
import { GetQuizletDataV2 } from "@/lib/dbQuiz";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import './hjs.css'

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/python';
import PyPlayground from "./play";

export default async function PydlePage({ pydle_id, subject }: { pydle_id: string, subject: string }) {
  const validateSubject = validateSubjectOrRedirect(subject);
  const quizlet = await GetQuizletDataV2(pydle_id, validateSubject);

  console.log(quizlet);

  if (quizlet === "ERR") {
    redirect(".");
  }

  if (!quizlet || !quizlet.quiz_data) {
    redirect(".");
  }

  const data = JSON.parse(quizlet.quiz_data); // Ensure quiz_data is parsed, if needed

  if (!data) {
    redirect(".");
  }

  let code = "import os\nprint(\"hi\")"  

  hljs.registerLanguage('python', javascript);
  const highlightedCode = hljs.highlight(code || '', { language: 'python' }).value;
  
 return (
  <div className="flex flex-col min-h-screen p-4">
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-4">{quizlet.name}</h1>
      
      <PyPlayground id={"test"} />

      <pre><code className="bg-black p-4 line-clamp-4 overflow-x-auto" dangerouslySetInnerHTML={ {__html: highlightedCode} } >
      </code></pre>
    </div>
    
    <div className="flex flex-row gap-1 items-end justify-start">
      <Link className="underline inline-flex items-center gap-1" href={"#"}>
        <DownloadIcon size={16} />
        Download code
      </Link>

      <Link
      className="mt-4 inline-flex items-center gap-1 text-sm px-3 py-2 w-fit bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"
      href={`../topics/${quizlet.topic}`}
    >
      <ArrowLeft size={16} />
      Back to {quizlet.topic}
    </Link>
    </div>
  </div>);
}