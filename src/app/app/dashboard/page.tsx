"use client";

import { client } from "@/lib/appwriteClient";
import { dbData, subjectData, subjectType } from "@/lib/dbCompData";
import { Account, Databases, Models } from "appwrite";
import { BookmarkPlus, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [revisionList, setRevisionList] = useState<Models.DocumentList<Models.Document> | null>(null);

  const [weeklyTopic, setWeeklyTopic] = useState<{subject: string, topic: string} | null>(null);

  const account = new Account(client);

  useEffect(() => {
    account.get()
      .then((user) => {
        setUserName(user.name || user.email.toString().split("@")[0] || "User");
        
        async function GetRevisionItems() {
          const db = new Databases(client);

          return (await db.listDocuments(dbData.users_db.id, dbData.users_db.collections.revision_list));
        }
        
        GetRevisionItems().then(list => setRevisionList(list));

        const d = new Databases(client);
        d.listDocuments(dbData.quiz_db.id, "6877caed00204de1c72f").then(item => {
          const i = item.documents[0];
          setWeeklyTopic({ subject: i.subjectName, topic: i.topicName });
        }).catch(() => {
          console.error("Error getting weekly topic.");
        })

      })
      .catch(() => {
        console.error("An error occurred while fetching user data.");
      });
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto sm:px-6 sm:py-8">
      

      {/* Placeholder content box */}
      <div className="bg-white dark:bg-zinc-900 rounded shadow-md p-6 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Hey, {userName}! Revise Next:
        </h1>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Your Revision List
          </h2>
          <ul className="list-disc list-inside dark:text-gray-400">
            { revisionList ? 
              revisionList.total > 0 ?
              <>
                {revisionList.documents.map(document => {
                  return <li key={document.$id}><Link className="underline" href={`/app/${document.subject}/topics/${document.topic}`}><span className=" text-blue-600">{document.subtopic}</span><span> in {document.subject}/{document.topic}</span></Link></li>
                })}
              </>
            : <p className="text-gray-700 dark:text-gray-400 block">You have no items here! Click the <BookmarkPlus className="inline-block" /> icon on a subtopic to add to your Revision List.</p>
            : <p className="text-gray-700 dark:text-gray-400 block">You have no items here! Click the <BookmarkPlus className="inline-block" /> icon on a subtopic to add to your Revision List.</p> }
          </ul>

           { weeklyTopic && <><h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1 mt-5">
            The Weekly Topic is <Link className="underline" href={`/app/${weeklyTopic.subject}/topics/${weeklyTopic.topic}`}>{(subjectData[weeklyTopic.subject as subjectType][weeklyTopic.topic] || {name: "Unknown name"}).name} from {weeklyTopic.subject}</Link>
          </h2>            <p className="text-gray-700 dark:text-gray-400 block"><RefreshCcw className="inline-block m-1" />There is a new weekly topic every Monday at 5AM.</p> 
            </> }


        </section>


        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Useful Links
          </h2>
          <ul className="list-disc list-inside text-blue-600 dark:text-blue-400 underline cursor-pointer space-y-1">
            <Link href="/app/dashboard/subjects">View All Subjects</Link>
          </ul>
        </section>
      </div>

      <div className="text-gray-500 dark:text-gray-400 text-sm mt-6 bg-white dark:bg-zinc-900 rounded shadow-md p-6 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold px-8 pt-8 text-gray-800 dark:text-gray-100">Your progress</h2>
        <p className="px-8">Aim for 4 quizes a day.</p>

        <div className="px-8">
          <span className="flex flex-row gap-2"><div className="w-4 h-4 bg-red-300"></div> You didnt take enough quizes. (Less than half the target) </span>
          <span className="flex flex-row gap-2"><div className="w-4 h-4 bg-blue-300"></div> Getting close... </span>
          <span className="flex flex-row gap-2"><div className="w-4 h-4 bg-green-300"></div> You did it! </span>
          <span className="flex flex-row gap-2"><div className="w-4 h-4 bg-yellow-300"></div> Outstanding! </span>
        </div>

        <div className="w-full overflow-y-hidden">
          <div className="flex flex-row items-center m-8 justify-start space-x-6 min-w-[600px] h-[250px] overflow-x-auto">
            <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
              <p className="w-full text-center">Yesturday</p>
              <div className="w-[3/4] h-[50%] bg-blue-300 rounded shadow-md p-1">
                <p className="h-full text-center w-full align-middle justify-center text-gray-900">2 completed quizes</p>
              </div>
            </div>

            <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
              <p className="w-full text-center">2 days ago</p>
              <div className="w-[3/4] h-[75%] bg-blue-300 rounded shadow-md p-1">
                <p className="h-full text-center w-full align-middle justify-center text-gray-900">3 completed quizes</p>
              </div>
            </div>

            <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
              <p className="w-full text-center">3 days ago</p>
              <div className="w-[3/4] h-[100%] bg-yellow-500 rounded shadow-md p-1">
                <p className="h-full text-center w-full align-middle justify-center text-gray-900">5 completed quizes</p>
              </div>
            </div>

            <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
              <p className="w-full text-center">4 days ago</p>
              <div className="w-[3/4] h-[100%] bg-green-300 rounded shadow-md p-1">
                <p className="h-full text-center w-full align-middle justify-center text-gray-900">4 completed quizes</p>
              </div>
            </div>

            <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
              <p className="w-full text-center">5 days ago</p>
              <div className="w-[3/4] h-[25%] bg-red-300 rounded shadow-md p-1">
                <p className="h-full text-center w-full align-middle justify-center text-gray-900">1 completed quiz</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    
  );
}
