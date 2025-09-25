"use client";

import { client } from "@/lib/appwriteClient";
import { dbData } from "@/lib/dbCompData";
import { Account, Databases, Query } from "appwrite";
import { useEffect, useState } from "react";

async function getQuizzesLast7Days() {
 
  const databases = new Databases(client);

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setUTCHours(0, 0, 0, 0); // start of the day
  sevenDaysAgo.setDate(now.getDate() - 7);

  // 1. Get all docs in last 7 days
  const response = await databases.listDocuments(
    dbData.users_db.id,
    dbData.users_db.collections.quiz_answers,
    [
      Query.greaterThan("$createdAt", sevenDaysAgo.toISOString()),
      Query.equal("user_id", (await new Account(client).get()).$id)
    ]
  );

  // 2. Prepare buckets for each day
  const counts: Record<string, number> = {};
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    d.setUTCHours(0, 0, 0, 0);
    counts[d.toISOString().split("T")[0]] = 0; // key like "2025-09-05"
  }

  // 3. Tally documents into buckets
  for (const doc of response.documents) {
    const createdAt = new Date(doc.$createdAt);
    createdAt.setUTCHours(0, 0, 0, 0);
    const dayKey = createdAt.toISOString().split("T")[0];

    if (counts[dayKey] !== undefined) {
      counts[dayKey] += 1;
    }
  }

  return counts;
}

function getRelativeDayLabel(dateStr: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // normalize

  const d = new Date(dateStr);
  d.setUTCHours(0, 0, 0, 0);

  const diffTime = today.getTime() - d.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export function QuizChart() {
  let [quizesData, setQD] = useState({} as Record<string, number>);

  useEffect(() => {
    getQuizzesLast7Days().then(data => {
      const labeledData: Record<string, number> = {};
      for (const [dateStr, value] of Object.entries(data)) {
        labeledData[getRelativeDayLabel(dateStr)] = value;
      }
      setQD(labeledData);
    });
  }, []);


  return <div className="text-gray-500 dark:text-gray-400 text-sm mt-6 bg-white dark:bg-zinc-900 rounded shadow-md p-6 space-y-6">
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
          <div style={{
            height: quizesData["Yesterday"] / 4 === 0 ? "100%" : `${quizesData["Yesterday"] / 4 * 100}%`
          }} className={`w-[3/4] ${ (quizesData["Yesterday"] / 4) < 0.5 ? "bg-red-500" : (quizesData["Yesterday"] / 4) < 1 ? "bg-blue-300" : (quizesData["Yesterday"] / 4) > 1 ? "bg-yellow-500" : "bg-green-300"} rounded shadow-md p-1`}>
            <p className="h-full text-center w-full align-middle justify-center text-gray-900">{quizesData["Yesterday"]} completed quizes</p>
          </div>
        </div>

        <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
          <p className="w-full text-center">2 days ago</p>
          <div style={{
            height: quizesData["2 days ago"] / 4 === 0 ? "100%" : `${quizesData["2 days ago"] / 4 * 100}%`
          }} className={`w-[3/4] ${(quizesData["2 days ago"] / 4) < 0.5 ? "bg-red-500" : (quizesData["2 days ago"] / 4) < 1 ? "bg-blue-300" : (quizesData["2 days ago"] / 4) > 1 ? "bg-yellow-500" : "bg-green-300"} rounded shadow-md p-1`}>
            <p className="h-full text-center w-full align-middle justify-center text-gray-900">{quizesData["2 days ago"]} completed quizes</p>
          </div>
        </div>

        <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
          <p className="w-full text-center">3 days ago</p>
          <div style={{
            height: quizesData["3 days ago"] / 4 === 0 ? "100%" : `${quizesData["3 days ago"] / 4 * 100}%`
          }} className={`w-[3/4] ${ (quizesData["3 days ago"] / 4) < 0.5 ? "bg-red-500" : (quizesData["3 days ago"] / 4) < 1 ? "bg-blue-300" : (quizesData["3 days ago"] / 4) > 1 ? "bg-yellow-500" : "bg-green-300"} rounded shadow-md p-1`}>
            <p className="h-full text-center w-full align-middle justify-center text-gray-900">{quizesData["3 days ago"]} completed quizes</p>
          </div>
        </div>

        <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
          <p className="w-full text-center">4 days ago</p>
          <div style={{
            height: quizesData["4 days ago"] / 4 === 0 ? "100%" : `${quizesData["4 days ago"] / 4 * 100}%`
          }} className={`w-[3/4] ${ (quizesData["4 days ago"] / 4) < 0.5 ? "bg-red-500" : (quizesData["4 days ago"] / 4) < 1 ? "bg-blue-300" : (quizesData["4 days ago"] / 4) > 1 ? "bg-yellow-500" : "bg-green-300"} rounded shadow-md p-1`}>
            <p className="h-full text-center w-full align-middle justify-center text-gray-900">{quizesData["4 days ago"]} completed quizes</p>
          </div>
        </div>

        <div className="w-30 flex flex-col-reverse gap-2 h-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md">
          <p className="w-full text-center">5 days ago</p>
          <div style={{
            height: quizesData["5 days ago"] / 4 === 0 ? "100%" : `${quizesData["5 days ago"] / 4 * 100}%`
          }} className={`w-[3/4] ${ (quizesData["5 days ago"] / 4) < 0.5 ? "bg-red-500" : (quizesData["5 days ago"] / 4) < 1 ? "bg-blue-300" : (quizesData["5 days ago"] / 4) > 1 ? "bg-yellow-500" : "bg-green-300"} rounded shadow-md p-1`}>
            <p className="h-full text-center w-full align-middle justify-center text-gray-900">{quizesData["5 days ago"]} completed quizes</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
}