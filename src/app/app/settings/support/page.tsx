"use client";

import React, { useState, useEffect, useRef } from "react";
import { Account, Client } from "appwrite";
import { ArrowLeftCircle, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function PrivacySettingsPage() {
 

  return (
    <><nav className="w-fit ml-4 mb-2 mt-4 bg-blue-500/20 py-2 px-4 rounded-xl"><HelpCircle /></nav>
    <div className="w-full flex flex-row-reverse">
      <Link className="mr-7 px-4 py-2 rounded-full flex flex-row gap-1 bg-blue-400 text-black" href={"."}>Back <ArrowLeftCircle /></Link>
    </div>
    <div className="max-w-md p-6 mt-2">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Help & Support
      </h2>

      <div className="h-screen">
        <p>Welcome to the Quizly: MyGCSE support center!</p>
      </div>

      
    </div></>
  );
}
