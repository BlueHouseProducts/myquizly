"use client";

import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { databases } from "@/lib/appwriteClient";
import { Models, Query } from "appwrite";
import { CloudAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListTablePage({subject, name, exam_board, subtopics}: {name: string, subject: string, exam_board: "edexcell", subtopics: {codes: string[], name: string}[]}) {
  const [quizes, setQuizes] = useState<Models.Document[] | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    try {if (subject === "maths") {
      let promise = databases.listDocuments("68358fde0037593b1096", "68358ff6000ec3022f90",
        [ 
          Query.equal('topic', name.toLowerCase())
        ]
      );

      promise.then((response) => {
        setQuizes(response.documents);
        setLoaded(true);
      })
    } } catch (e) {
      console.log(e);

      setQuizes(null);
      setLoaded(true);
    }
  }, []);

  if (quizes && quizes.length === 0) {
    return <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
        <CloudAlert size={40} />
        <h2 className="text-xl">We didn't find any quizes with this topic!</h2>
      </div>
      <Link href="." className="underline">Back to all topics...</Link></>
  }

  if (!quizes && loaded) {
    return <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
      <CloudAlert size={40} />
      <h2 className="text-xl">Something failed getting quizes. Try again later.</h2>
    </div>
    <Link href="." className="underline">Back to all topics...</Link></>
  }

  if (!loaded) {
    return <p>Loading quizes...</p>
  }
  
  const quizzesBySubtopic = subtopics.map((subtopic) => {   
    if (!quizes) { return }

    return {
      subtopicName: subtopic.name,
      quizzes: quizes.filter((quiz) => subtopic.codes.includes((quiz.edexcell_label || "").toLowerCase())),
    }
  });

  const colour = exam_board === "edexcell" ?
    "pink-400" : ""

  return <div>
    <div className="overflow-x-hidden overflow-y-auto">
      {quizzesBySubtopic.map(({ subtopicName, quizzes }: any) => (
        <div key={subtopicName} className="mb-6">
          <h2 className="text-xl font-bold mb-2 mt-4">{subtopicName}</h2>
          {quizzes.length === 0 ? (
            <p className="text-gray-500 italic">No quizzes for this subtopic</p>
          ) : (
            quizzes.map((quiz: any) => (
              <Link key={quiz.$id} href={quiz.$id} className={`hover:scale-x-[105%] flex flex-row items-center justify-between gap-2 hover:bg-${colour}/20 hover:pr-6 hover:pl-10 transition-all p-2 rounded-xl border-${colour}/20 border-[2px] mr-4`}>
                <div className="flex flex-row gap-4 items-center">
                  <span className={`text-lg px-2 text-black bg-${colour} rounded-full h-fit`}>{quiz.edexcell_label}</span>
                  <p className="text-lg">{quiz.name}</p>
                </div>

                <div className="hidden md:flex justify-start items-center ml-11 space-x-2 overflow-hidden">
                  {
                    quiz.tags.map((i: string) => {
                      return <p className="text-lg bg-pink-300/80 border-pink-400 border-[1px] rounded-xl px-2 text-black" key={i}>{i}</p>
                    })
                  }
                </div>
              </Link>
            ))
          )}
        </div>
      ))}
    </div>
  </div>
}