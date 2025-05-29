"use client";

import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { databases } from "@/lib/appwriteClient";
import { dbData, subjectType } from "@/lib/dbCompData";
import { Models, Query } from "appwrite";
import { ChevronDown, ChevronRight, ChevronUp, CloudAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListTablePage({subject, name, exam_board, subtopics}: {name: string, subject: subjectType, exam_board: "edexcel", subtopics: {codes: string[], name: string}[]}) {
  const [quizes, setQuizes] = useState<any[] | null>();
  const [loaded, setLoaded] = useState(false);

  const [openedSubTopics, setOpenedSubTopics] = useState([]);

  const db: string = dbData.quiz_db.collections[subject];
  
  useEffect(() => {
    try {if (dbData) {
      let promise = databases.listDocuments("68358fde0037593b1096", db,
        [ 
          Query.equal('topic', name.toLowerCase())
        ]
      );

      promise.then((response) => {
        setQuizes(response.documents);
        setLoaded(true);
      })
    } else {
      setQuizes(null);
      setLoaded(true);
    } } catch (e) {
      console.log(e);

      setQuizes(null);
      setLoaded(true);
    }
  }, []);

  if (quizes && quizes.length === 0) {
    return <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
        <CloudAlert size={40} />
        <h2 className="text-xl">We didn't find any quizzes with this topic!</h2>
      </div>
      <Link href="." className="underline">Back to all topics...</Link></>
  }

  if (!quizes && loaded) {
    return <><div className="flex flex-row items-center gap-2 justify-start my-4 overflow-hidden">
      <CloudAlert size={40} />
      <h2 className="text-xl">Something failed getting quizzes. Try again later.</h2>
    </div>
    <Link href="." className="underline">Back to all topics...</Link></>
  }

  if (!loaded) {
    return <p>Loading quizzes...</p>
  }
  
  const quizzesBySubtopic = subtopics
  .map((subtopic) => {   
    if (!quizes) return null;

    return {
      subtopicName: subtopic.name,
      quizzes: quizes
        .filter((quiz) =>
          subtopic.codes.includes((quiz.label || "").toLowerCase())
        )
        .sort((a, b) =>
          subtopic.codes.indexOf((a.label || "").toLowerCase()) -
          subtopic.codes.indexOf((b.label || "").toLowerCase())
        )
    };
  })
  .filter((subtopic): subtopic is { subtopicName: string, quizzes: Models.Document[] } => !!subtopic); // removes nulls

  const colour = exam_board === "edexcel" ?
    "pink-400" : ""

  return <div>
    <div className="overflow-x-hidden overflow-y-auto">
      {quizzesBySubtopic.map((subtopic, idx) => (
        subtopic.quizzes.length > 0 ? (
          <div key={`${subtopic.quizzes.toString()}.${idx.toString()}`} className="mb-6">
            <div className="flex flex-col">
              
              <button
                onClick={() => {
                  if (openedSubTopics.includes(subtopic.subtopicName as never)) {
                    // Remove the subtopic from the list (closing)
                    setOpenedSubTopics(prev =>
                      prev.filter(name => name !== subtopic.subtopicName)
                    );
                  } else {
                    // Add the subtopic to the list (opening)
                    setOpenedSubTopics(prev => [...prev, subtopic.subtopicName as never]);
                  }
                }}
                className="flex flex-row items-center space-x-4 transition-colors hover:bg-pink-400/30 dark:hover:bg-blue-400/30 p-2 rounded-l-xl"
              >
                {openedSubTopics.includes(subtopic.subtopicName as never) ? <ChevronDown /> : <ChevronRight />}
                <h2 className="text-xl font-bold">
                  {subtopic.subtopicName}
                  
                </h2>
                <p className={`mx-2 px-2 rounded-full bg-pink-400 text-black text-md`}>
                  ({subtopics[idx].codes[0].toUpperCase()}{" – "}{subtopics[idx].codes.slice(-1)[0].toUpperCase()})
                </p>
              </button>
              
              { openedSubTopics.includes(subtopic.subtopicName as never) && (
              <div className="flex flex-col gap-2 mt-2 transition-colors hover:bg-pink-500/10 dark:hover:bg-blue-500/10 p-2 rounded-l-xl">
                {subtopic.quizzes.map((quiz) => (
                  <Link href={`/app/${subject.toLowerCase()}/q/${quiz.$id}`} className="flex flex-row gap-2 rounded-full py-2 px-4 ml-10 mr-10 bg-pink-600/30 dark:bg-blue-800" key={quiz.$id}>
                    <span className={`px-2 rounded-full bg-pink-400 text-black`}>{quiz.label.toUpperCase()}</span>
                    {quiz.name}
                  </Link>
                ))}
              </div> )}
            </div>
          </div>
        ) : null
      ))}
    </div>
  </div>
}