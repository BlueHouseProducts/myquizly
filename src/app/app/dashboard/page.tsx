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
    <div className="max-w-3xl mx-auto px-6 py-8">
      

      {/* Placeholder content box */}
      <div className="bg-white dark:bg-zinc-900 rounded shadow-md p-6 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Hey, {userName}!
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
    </div>
  );
}
