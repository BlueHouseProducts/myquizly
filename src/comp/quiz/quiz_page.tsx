"use client";

import { databases } from "@/lib/appwriteClient";
import { subjectType, dbData } from "@/lib/dbCompData";
import { Models } from "appwrite";
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import QuizBuilder from "./quiz_builder";
import { GetQuizData } from "@/lib/dbQuiz";
import { useRouter } from "next/navigation";

export function QuizMainPage({ quiz_id, subject }: { quiz_id: string, subject: subjectType }) {
  const [quizData, setQuizData] = useState<any>("LOAD");
  const r = useRouter();

  useEffect(() => {
    GetQuizData(quiz_id, subject).then(r => {
      setQuizData(r);
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

  return <QuizBuilder data={quizData} />
}
