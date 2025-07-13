"use client";

import { client } from "@/lib/appwriteClient";
import { subjectData, subjectType, validSubjects } from "@/lib/dbCompData";
import { CreateQuizletDEV, UserAdmin } from "@/lib/dbQuiz";
import { Account } from "appwrite";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function QuizManager({ setPage }: { setPage: (page: string) => void }) {
  return <Link href="/app">Return to /app</Link>;
}


function QuizEditor({ setPage }: { setPage: (page: string) => void }) {
  const Acc = new Account(client);
  
  const [quizletType, setQuizletType] = useState("NOT_CHOSEN");
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [data, setData] = useState("");
  const [topic, setTopic] = useState("");
  const [label, setLabel] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  function CreateItem() {
    Acc.get().then(user => {
      if (!user) {
        alert("You must be logged in to create a quizlet item.");
        return;
      }

      Acc.createJWT().then(jwt => {
        if (!jwt) {
          alert("You must be logged in to create a quizlet item.");
          return;
        }

        if (!validSubjects.includes(subject as subjectType)) {
          alert("Invalid subject. Please choose a valid subject.");
          return;
        }
    
        CreateQuizletDEV(subject as subjectType, data, name, topic, label, quizletType, description, jwt).then((res) => {
          if (res === "ERR") {
            alert("Error creating item. Please check your data.");
          } else {
            alert("Item created successfully!");
            setPage("quiz_manager");
          }
        }).catch(err => {
          console.error("Error creating item:", err);
          alert("An error occurred while creating the item. Please try again.");
        });
    }).catch(err => {
      console.error("Error fetching user:", err);
      alert("You must be logged in to create a quizlet item.");
    });
  })};

  useEffect(() => {
    if (quizletType !== "quick_quiz") {
      setData("{\n  \"url\": \"\"\n}");
    } else {
      setData("{\n  \n}")
    }
  }, [quizletType]);

  useEffect(() => {
    Acc.get().then(user => {
      Acc.createJWT().then(jwt => {
        if (!user || !jwt) {
          setIsAdmin(false);
          return;
        }
        UserAdmin(jwt).then(isAdmin => {
          setIsAdmin(isAdmin);
        }).catch(err => {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        })}).catch(err => {
          console.error("Error creating JWT:", err);
          setIsAdmin(false);
        });
    }).catch(err => {
      console.error("Error fetching user:", err);
      setIsAdmin(false);
    });
  }, []);

  if (!isAdmin) {
    return (
      <div className="p-4">
        <h3>Quizlet Item Creator</h3>
        <p>You must be an admin to create quizlet items. (if you are an admin, please wait a few seconds)</p>
        <button onClick={() => setPage("quiz_manager")} className="underline">Return to Manager</button>
      </div>
    );
  }

  return (
    <div className="">
      <h3>Quizlet Item Creator</h3>
      <div className="w-full my-2 border-2 h-px"></div>
      
      <div className="flex flex-col gap-4">
        { quizletType === "NOT_CHOSEN" ? <div>
          <h3>1. Enter Quizlet general data</h3>
          <div className="mt-2">
            <p>Name</p>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" className="w-full p-2 border-2 border-gray-300 bg-transparent rounded-md" />
          </div>
          <div className="mt-2">
            <p>Description</p>
            <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-2 border-2 border-gray-300 bg-transparent rounded-md" />
          </div>
          <div className="mt-2">
            <p>Subject</p>
            <input value={subject} onChange={e => setSubject(e.target.value)} type="text" placeholder="Subject" className={`w-full p-2 border-2 border-gray-300 bg-transparent rounded-md ${!(validSubjects.includes(subject as subjectType)) && subject !== "" && "border-red-600"}`} />
          </div>
          <div className="mt-2">
            <p>Topic</p>
            <input value={topic} onChange={e => setTopic(e.target.value.toLowerCase())} type="text" placeholder="Topic" className={`w-full p-2 border-2 border-gray-300 bg-transparent rounded-md ${!(subjectData[subject as subjectType] && subjectData[subject as subjectType][topic] ) && subject !== "" && "border-red-600"}`} />
          </div>
          <div className="mt-2">
            <p>Label</p>
            <input value={label} onChange={e => setLabel(e.target.value.toLowerCase())} type="text" placeholder="Label (e.g. a2)" className={"w-full p-2 border-2 border-gray-300 bg-transparent rounded-md"} />
          </div>
        </div> : <button className="text-start underline" onClick={() => setQuizletType("NOT_CHOSEN")}>Return to General data</button> }
        
        <div>
          <h3>2. Choose a quizlet type</h3>

          <div className="flex flex-row gap-4">
            <button onClick={() => setQuizletType("web_link")} className={ quizletType === "web_link" ? "text-green-400" : "underline" }>Link</button>
            <button onClick={() => setQuizletType("video")} className={ quizletType === "video" ? "text-green-400" : "underline" }>Video</button>
            <button onClick={() => setQuizletType("pdf")} className={ quizletType === "pdf" ? "text-green-400" : "underline" }>PDF</button>
            <button onClick={() => setQuizletType("quick_quiz")} className={ quizletType === "quick_quiz" ? "text-green-400" : "underline" }>Quick Quiz</button>
          </div>

          
        </div>

        { quizletType !== "NOT_CHOSEN" && quizletType !== "quick_quiz" ? (
          <div>
            <h3>2. Enter Data</h3>
            
            <div className="mt-2">
              <p>Data</p>
              <textarea
                rows={3}
                value={data}
                onChange={e => setData(e.target.value)}
                placeholder="Label (e.g. a2)"
                className={`w-full p-2 border-2 border-gray-300 bg-transparent rounded-md ${
                  (() => {
                    try {
                      const parsed = JSON.parse(data);
                      return parsed.url === "" ? "border-yellow-300" : parsed.url ? "" : "border-red-600";
                    } catch (error) {
                      return "border-red-600";
                    }
                  })()
                }`}
              />
            </div>

            <button onClick={() => CreateItem()}>Create Item</button>
          </div>
        ) : (
          <div>
            <h3>2. Enter Data</h3>
            
            <div className="mt-2">
              <p>Data</p>
              <textarea
                rows={3}
                value={data}
                onChange={e => setData(e.target.value)}
                placeholder="Label (e.g. a2)"
                className={`w-full p-2 border-2 border-gray-300 bg-transparent rounded-md ${
                  (() => {
                    try {
                      const parsed = JSON.parse(data);
                      return parsed ? "" : "border-red-600";
                    } catch (error) {
                      return "border-red-600";
                    }
                  })()
                }`}
              />
            </div>
            <button onClick={() => CreateItem()} className="mt-2">Create Item</button>
          </div>
        )}


      </div>
    </div>
  );
}

export default function QuizManagerPage() {
  const [page, setPage] = useState("quiz_manager");

  function handlePageChange(newPage: string) {
    setPage(newPage);
  }

  return (
    <div className="p-4">
      <h3>Quizlet Manager</h3>
      <div className="flex justify-start items-center gap-4">
        <button onClick={() => setPage("quiz_manager")} className="underline">Manager</button><button onClick={() => setPage("quiz_editor")} className="underline">Creator</button>
      </div>

      <div className="w-full my-2 border-2 h-px"></div>

      {page === "quiz_manager" ? (
        <QuizManager setPage={handlePageChange} />
      ) : page === "quiz_editor" ? (
        <QuizEditor setPage={handlePageChange} />
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}
