"use client";

import { databases } from "@/lib/appwriteClient";
import { subjectType, dbData } from "@/lib/dbCompData";
import { Models } from "appwrite";
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import QuizBuilder from "./quiz_builder";
import { GetQuizData, GetQuizletDataV2 } from "@/lib/dbQuiz";
import { useRouter } from "next/navigation";

export function QuizMainPage({ quiz_id, subject }: { quiz_id: string, subject: subjectType }) {
  const [quizData, setQuizData] = useState<any>("LOAD");
  const [quizName, setQuizName] = useState<object>({});
  const [qr, setQ] = useState<Models.Document | null>(null);


  useEffect(() => {
    GetQuizData(quiz_id, subject).then(r => {
      if (r === "ERR") { window.location.href = "."; return; }
      
      setQuizData(r[0]);
      setQuizName(r[1] as object);
    });

    GetQuizletDataV2(quiz_id, subject).then(r => {
      if (r === "ERR") { window.location.href = "."; return; }
      
      setQ(r);
    });
  }, [quiz_id]);


  if (quizData === "ERR") {
    window.location.href = ".";
    return <></>
  }

  if (quizData === "LOAD") {
    return (
      <div>
        <LoaderCircle />
        <p>Loading quiz...</p>
      </div>
    );
  }

  return <QuizBuilder quiz={quizName} desc={qr ? qr.description : null} data={quizData} />
}
