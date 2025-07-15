"use client";

import { client } from "@/lib/appwriteClient";
import { GetRevisionList } from "@/lib/dbRevisionList";
import { Account, Models } from "appwrite";
import { BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [revisionList, setRevisionList] = useState<Models.DocumentList<Models.Document> | null>(null);

  const account = new Account(client);

  useEffect(() => {
    account.get()
      .then((user) => {
        setUserName(user.name || user.email.toString().split("@")[0] || "User");
        GetRevisionList().then(list => setRevisionList(list))

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
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
            : <p className="text-gray-700 block">You have no items here! Click the <BookmarkPlus className="inline-block" /> icon on a subtopic to add to your Revision List.</p>
            : <p className="text-gray-700 block">You have no items here! Click the <BookmarkPlus className="inline-block" /> icon on a subtopic to add to your Revision List.</p> }
          </ul>
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
