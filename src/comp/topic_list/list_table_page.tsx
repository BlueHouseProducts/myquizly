"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { databases } from "@/lib/appwriteClient";
import { dbData, subjectType } from "@/lib/dbCompData";
import { GetQuizesFromTopic, UserAdmin } from "@/lib/dbQuiz";
import { getConsoleUrlForQuizlet } from "@/lib/dbQuizCompletions";
import { AddOrRemoveSubtopic, SubtopicHasItem } from "@/lib/dbRevisionList";
import { timeAgo } from "@/lib/utils";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Account, Client, Databases, Models, Query } from "appwrite";
import { BookmarkPlus, ChevronDown, ChevronRight, ChevronUp, CloudAlert, Database, File, FileQuestion, FileSpreadsheetIcon, InfoIcon, LinkIcon, Menu, Rabbit, Star, Video } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { MouseEventHandler, Suspense, useEffect, useMemo, useState } from "react";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const db = new Databases(client);
const account = new Account(client);

function isMoreThanTwoMonthsAgo(dateString: string): boolean {
  const date = new Date(dateString);
  const time_now = new Date();

  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(time_now.getMonth() - 2);

  return date < twoMonthsAgo;
}


export default function ListTablePage({subject, name, subtopics, topicName}: {name: string, subject: subjectType, subtopics: {codes: string[], name: string}[], topicName: string}) {
  const [quizes, setQuizes] = useState<any[] | null>();
  const [tasksTodo, setTasksTodo] = useState<{[key: string]: boolean} | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [openedSubTopics, setOpenedSubTopics] = useState([]);

  const [completions, setCompletions] = useState<{ [quizId: string]: { score: number, date: string, max: number } }>({});
  const [admin, setAdmin] = useState(false);
  const [quizConsoleUrls, setQuizUrls] = useState<{ [quizId: string]: string }> ({});

  // async function handleQuizCompletionGet(quiz: any): Promise<{ score: number, date: string, max: number } | null> {
  //   const user = await account.get();

  //   const res = await db.listDocuments(
  //     dbData.users_db.id,
  //     dbData.users_db.collections.quiz_answers,
  //     [
  //       Query.equal("quiz_id", quiz.$id), // not $id
  //       Query.equal("user_id", user.$id),
  //       Query.orderDesc("date"),
  //       Query.limit(1)
  //     ]
  //   );

  //   if (res.documents.length === 0) {
  //     return null;
  //   }

  //   const { score, date } = res.documents[0];
  //   const max = Array.isArray(quiz.quiz_data) ? quiz.quiz_data.length : 0;

  //   return { score, date, max };
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!dbData) {
  //         setQuizes(null);
  //         setLoaded(true);
  //         return;
  //       }

  //       const response = await GetQuizesFromTopic(subject, name);
  //       setQuizes(response);

  //       // Fetch completions
  //       const result: { [quizId: string]: { score: number, date: string, max: number } } = {};

  //       await Promise.all(
  //         response
  //           .filter((quiz: any) => quiz.type === "quick_quiz")
  //           .map(async (quiz: any) => {
  //             const data = await handleQuizCompletionGet(quiz);
  //             if (data) {
  //               result[quiz.$id] = data;
  //             }
  //           })
  //       );

  //       setCompletions(result);
  //     } catch (e) {
  //       console.error("Failed to fetch quizzes or completions", e);
  //       setQuizes(null);
  //     } finally {
  //       setLoaded(true); // ✅ this must run no matter what
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (!quizes) { return }
  //   if (admin) { return }
  //   UserAdmin().then(answer => {
  //     if (answer === true && quizes) {
  //       setAdmin(true);
  //       async function fetchUrls() {
  //         let r: {[v: string]: string} = {};
  //         await Promise.all(
  //           quizes!.map(async (value) => {
  //             const url = await getConsoleUrlForQuizlet(value.$id, subject);
  //             r[value.$id] = url;
  //           })
  //         );
  //         setQuizUrls(r);
  //       }

  //       fetchUrls();
  //     }
  //   });
  // }, [quizes])

  // useEffect(() => {
  //   async function fetchStarred() {
  //     const entries = await Promise.all(
  //       subtopics.map(async (value) => {
  //         const has = await SubtopicHasItem(subject, topicName, value.name);
  //         return [value.name, has] as const; 
  //       })
  //     );

  //     const r = Object.fromEntries(entries);
  //     setTasksTodo(r);
  //   }

  //   fetchStarred();
  // }, [subject, topicName, subtopics]);

  // 1. Fetch quizzes and completions in parallel
  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [user, quizzesRes] = await Promise.all([
          account.get(),
          GetQuizesFromTopic(subject, name),
        ]);

        if (cancelled) return;

        const quizzes = quizzesRes || [];
        setQuizes(quizzes);

        const completionEntries = await Promise.all(
          quizzes
            .filter((quiz) => quiz.type === "quick_quiz")
            .map(async (quiz) => {
              const res = await db.listDocuments(
                dbData.users_db.id,
                dbData.users_db.collections.quiz_answers,
                [
                  Query.equal("quiz_id", quiz.$id),
                  Query.equal("user_id", user.$id),
                  Query.orderDesc("date"),
                  Query.limit(1),
                ]
              );

              if (res.documents.length === 0) return [quiz.$id, null];

              const { score, date } = res.documents[0];
              const max = Array.isArray(quiz.quiz_data) ? quiz.quiz_data.length : 0;
              return [quiz.$id, { score, date, max }];
            })
        );

        if (!cancelled) {
          setCompletions(
            Object.fromEntries(completionEntries.filter(([_, data]) => data !== null))
          );
        }
      } catch (e) {
        console.error("Failed to fetch quizzes or completions", e);
        setQuizes(null);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [subject, name]);


  // 2. Run UserAdmin immediately on mount
  useEffect(() => {
    let cancelled = false;
    async function checkAdmin() {
      try {
        const isAdmin = await UserAdmin();
        if (!cancelled && isAdmin) setAdmin(true);
      } catch (e) {
        console.error("Failed admin check", e);
      }
    }
    checkAdmin();
    return () => {
      cancelled = true;
    };
  }, []);


  // 3. If admin & quizzes are loaded, fetch console URLs (only once)
  useEffect(() => {
    if (!admin || !quizes || Object.keys(quizConsoleUrls).length > 0) return;

    let cancelled = false;

    async function fetchUrls() {
      try {
        const entries = await Promise.all(
          quizes!.map(async (quiz) => {
            const url = await getConsoleUrlForQuizlet(quiz.$id, subject);
            return [quiz.$id, url];
          })
        );
        if (!cancelled) {
          setQuizUrls(Object.fromEntries(entries));
        }
      } catch (e) {
        console.error("Error fetching quiz URLs", e);
      }
    }

    fetchUrls();
    return () => {
      cancelled = true;
    };
  }, [admin, quizes, subject, quizConsoleUrls]);


  // 4. Fetch starred subtopics
  useEffect(() => {
    let cancelled = false;

    async function fetchStarred() {
      try {
        const entries = await Promise.all(
          subtopics.map(async (subtopic) => {
            const has = await SubtopicHasItem(subject, topicName, subtopic.name);
            return [subtopic.name, has] as const;
          })
        );
        if (!cancelled) setTasksTodo(Object.fromEntries(entries));
      } catch (e) {
        console.error("Failed to fetch starred subtopics", e);
      }
    }

    fetchStarred();
    return () => {
      cancelled = true;
    };
  }, [subject, topicName, subtopics]);

  const quizzesBySubtopic = useMemo(() => {
    return subtopics
      .map((subtopic) => ({
        subtopicName: subtopic.name,
        quizzes: (quizes || []).filter(q => subtopic.codes.includes((q.label || "").toLowerCase()))
          .sort((a, b) =>
            subtopic.codes.indexOf((a.label || "").toLowerCase()) -
            subtopic.codes.indexOf((b.label || "").toLowerCase())
          )
      }))
      .filter(sub => sub.quizzes.length > 0);
  }, [quizes, subtopics]);

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

  function StarButton({subtopic, subject, topic}: {subtopic: string, subject: subjectType, topic: string}) {
    const [starred, setStarred] = useState<boolean | null>(null);

    useEffect(() => {
      if (!tasksTodo) { return }
      if (tasksTodo && subtopic in tasksTodo) {
        setStarred(!!tasksTodo[subtopic]);
      }
    }, [tasksTodo, subtopic]);

    if (tasksTodo === null) {
      return <p>Loading...</p>
    }
    
    async function starPress(event: React.MouseEvent<HTMLButtonElement>) {
      
      if (starred === null) { return }
      
      event.stopPropagation();

      const result = await AddOrRemoveSubtopic(subject, topic, subtopic, starred);

      if (!result.success) {
        console.error(result.error);
        alert("An error occured. View console for more info");
      } else {
        setStarred(!starred);
      }

      const entries = await Promise.all(
        subtopics.map(async (value) => {
          const has = await SubtopicHasItem(subject, topicName, value.name);
          return [value.name, has] as const; 
        })
      );

      const r = Object.fromEntries(entries);
      setTasksTodo(r);
    }

    return <button onClick={(e) => starPress(e)} className="z-10 hover:bg-purple-400/40 dark:hover:bg-blue-300/40 bg-black/10 dark:bg-white/10 transition-colors duration-200 rounded-full p-2">
      <BookmarkPlus fill={starred ? "gold" : "transparent"} className="text-black" />
    </button>
  }

  return <div>
    <div className="overflow-x-hidden overflow-y-auto">
      {quizzesBySubtopic.map((subtopic, idx) => (
        subtopic.quizzes.length > 0 ? (
          <div key={`${subtopic.quizzes.toString()}.${idx.toString()}`} className="mb-6">
            <div className="flex flex-col">
              
              <div
                role="button"
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

                <StarButton topic={topicName} subject={subject} subtopic={subtopic.subtopicName} />
              </div>
              
              { openedSubTopics.includes(subtopic.subtopicName as never) && (
              <motion.div initial={{scaleY: 0.95, x: -15}} animate={{scaleY: 1, x:0}} className="lg:w-fit mr-4 lg:mr-0 flex flex-col gap-2 mt-2 p-2 pr-8 rounded-l-xl"><TooltipProvider>
                {subtopic.quizzes.map((quiz) => <div key={quiz.$id}><Suspense fallback={<p>Loading</p>}>{admin && <Link href={quizConsoleUrls[quiz.$id] ? quizConsoleUrls[quiz.$id] : "#"}><Database /></Link>}</Suspense>{
                  quiz.type === "quick_quiz" ? <Link href={`/app/${subject.toLowerCase()}/q/${quiz.$id}`} className="group transition-colors hover:bg-pink-600/50 hover:dark:bg-blue-800/50 flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800 w-full" key={quiz.$id}>
                    
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:bg-pink-500 group-hover:scale-105 transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><Rabbit /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">Quick Quiz</TooltipContent>
                    </Tooltip>
                    
                    
                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black group-hover:bg-pink-500 transition-all `}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                      
                      { completions[quiz.$id] ? (
                      <Tooltip>
                        <TooltipTrigger className="ml-auto mr-2">
                          <span className="text-sm text-black/80 dark:text-gray-400 hidden md:block">
                            <span className={`text-sm text-black/80 dark:text-gray-400 hidden md:block ${
                              isMoreThanTwoMonthsAgo(completions[quiz.$id].date || "") ? "line-through" : ""
                            } `}>
                                {completions[quiz.$id].score}/{completions[quiz.$id].max}
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white dark:bg-gray-900 cursor-pointer text-black dark:text-white text-md rounded-xl">
                          <p>{timeAgo(completions[quiz.$id].date)}</p>
                        </TooltipContent>
                      </Tooltip>) : (
                      <span className="ml-auto mr-2 text-sm text-black/80 dark:text-gray-400 hidden md:block">
                        No completions <b>yet!</b></span>)}
                      
                    </div>

                    <Tooltip>
                      <TooltipTrigger className="ml-auto mr-2">
                        <InfoIcon />
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">
                        {quiz.description || "No description provided."}
                      </TooltipContent>
                      </Tooltip>                    
                  </Link> : quiz.type === "pdf" ? <Link href={`/app/${subject.toLowerCase()}/p/${quiz.$id}`} className="group transition-colors hover:bg-pink-600/50 hover:dark:bg-blue-800/50 flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800 w-full" key={quiz.$id}>
                   

                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:bg-pink-500 group-hover:scale-105  transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><FileSpreadsheetIcon /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">PDF</TooltipContent>
                    </Tooltip>
                    
                    
                    
                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black group-hover:bg-pink-500 transition-all `}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                    </div>

                    <Tooltip>
                      <TooltipTrigger className="ml-auto mr-2">
                        <InfoIcon />
                      </TooltipTrigger>

                      <TooltipContent onClick={e => {e.stopPropagation(); e.preventDefault();}} className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">
                        {quiz.description || "No description provided."}
                      </TooltipContent>
                      </Tooltip>
                    
                  </Link> :
                  quiz.type === "video" ? <Link href={`/app/${subject.toLowerCase()}/v/${quiz.$id}`} className="group transition-colors hover:bg-pink-600/50 hover:dark:bg-blue-800/50 flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800 w-full" key={quiz.$id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:bg-pink-500 group-hover:scale-105  transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><Video /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">Video</TooltipContent>
                    </Tooltip>

                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black group-hover:bg-pink-500 transition-all `}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                    </div>

                    <Tooltip>
                      <TooltipTrigger className="ml-auto mr-2">
                        <InfoIcon />
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">
                        {quiz.description || "No description provided."}
                      </TooltipContent>
                      </Tooltip>
                  </Link> :
                  quiz.type === "web_link" ? <Link href={`/app/${subject.toLowerCase()}/link/${quiz.$id}`} className="group transition-colors hover:bg-pink-600/50 hover:dark:bg-blue-800/50 flex flex-row gap-2 overflow-hidden rounded-full ml-10 bg-pink-600/30 dark:bg-blue-800 w-full" key={quiz.$id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="group-hover:bg-pink-500 group-hover:scale-105  transition-all h-full w-fit py-2 px-4 flex items-center justify-center text-black bg-pink-400"><LinkIcon /></div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">Link</TooltipContent>
                    </Tooltip>

                    <div className="flex flex-row gap-2 my-2 mx-4">
                      <span className={`px-2 rounded-full bg-pink-400 text-black group-hover:bg-pink-500 transition-all `}>{quiz.label.toUpperCase()}</span>
                      {quiz.name}
                      <span className="text-sm text-black/80 dark:text-gray-400 hidden md:block">({ quiz && quiz.quiz_data ? JSON.parse(quiz.quiz_data).url : "Failed to get URL"})</span>
                    </div>

                      <Tooltip>
                      <TooltipTrigger className="ml-auto mr-2">
                        <InfoIcon />
                      </TooltipTrigger>

                      <TooltipContent className="bg-white dark:bg-gray-900 text-black dark:text-white text-md rounded-xl">
                        {quiz.description || "No description provided."}
                      </TooltipContent>
                      </Tooltip>

                    
                  </Link>

                   : <p key={"N_R_"+idx.toString()}>Item type not recognised: {quiz.type}</p>

                  
                      }</div>)}
              </TooltipProvider ></motion.div> )}
            </div>
          </div>
        ) : null
      ))}
    </div>
  </div>
}