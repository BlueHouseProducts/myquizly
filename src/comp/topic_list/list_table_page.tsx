"use client";

import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { databases } from "@/lib/appwriteClient";
import { dbData, subjectType } from "@/lib/dbCompData";
import { GetQuizesFromTopic } from "@/lib/dbQuiz";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Models, Query } from "appwrite";
import { ChevronDown, ChevronRight, ChevronUp, CloudAlert, File, FileQuestion, FileSpreadsheetIcon, Rabbit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListTablePage({subject, name, subtopics}: {name: string, subject: subjectType, subtopics: {codes: string[], name: string}[]}) {
  const [quizes, setQuizes] = useState<any[] | null>();
  const [loaded, setLoaded] = useState(false);

  const [openedSubTopics, setOpenedSubTopics] = useState([]);
  
  useEffect(() => {
    try {if (dbData) {
      let promise = GetQuizesFromTopic(subject, name);

      promise.then((response) => {
        setQuizes(response);
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
              <div className="flex flex-col gap-2 mt-2 p-2 rounded-l-xl">
                {subtopic.quizzes.map((quiz) => (
                  quiz.type === "quick_quiz" ? <Link href={`/app/${subject.toLowerCase()}/q/${quiz.$id}`} className="group flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800" key={quiz.$id}>
                    
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:px-6 transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><Rabbit /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">Quick Quiz</TooltipContent>
                    </Tooltip></TooltipProvider>
                    
                    
                    
                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black`}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                    </div>
                    
                  </Link> : quiz.type === "pdf" ? <Link href={`/app/${subject.toLowerCase()}/p/${quiz.$id}`} className="group flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800" key={quiz.$id}>
                    
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:px-6 transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><FileSpreadsheetIcon /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">PDF</TooltipContent>
                    </Tooltip></TooltipProvider>
                    
                    
                    
                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black`}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                    </div>
                    
                  </Link> : <p>Item type not recognised: {quiz.type}</p>

                  
                ))}
              </div> )}
            </div>
          </div>
        ) : null
      ))}
    </div>
  </div>
}