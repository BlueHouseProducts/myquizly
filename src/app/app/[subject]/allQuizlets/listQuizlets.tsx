"use client";

import { account, databases } from "@/lib/appwriteClient";
import { dbData, subjectType } from "@/lib/dbCompData";
import { GetAllQuizlets } from "@/lib/dbQuiz";
import { Models } from "appwrite";
import { Suspense, useEffect, useState } from "react";

async function getQuizes(subject: subjectType): Promise<Models.Document[]> {
  return GetAllQuizlets(subject);
}

function Quizes({ subject }: { subject: subjectType }) {
  const [quizes, setQuizes] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizes(subject).then((res) => {
      setQuizes(res);
      setLoading(false);
    });
  }, [subject]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="list-disc list-inside">
      {quizes.map((quiz) => (
        <li key={quiz.$id}>
          <a
            className="underline"
            href={`/app/${subject}/${quiz.type === "quick_quiz" ? "q" : quiz.type === "pdf" ? "p" : quiz.type === "video" ? "v" : quiz.type === "web_link" ? "link" : ""}/${quiz.$id.toString()}`}
          >
            {quiz.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function QuizletList({ subject }: { subject: subjectType }) {
  return <Quizes subject={subject} />;
}
