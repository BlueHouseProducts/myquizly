"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { AnimatePresence } from "framer-motion";
import { QuizCard, QuizItem } from "./quiz_components";

import {
  Brain,
  History,
  Trophy,
  Printer,
  BookOpenCheck,
  ListChecks,
  PlayCircle,
  ArrowLeft,
} from "lucide-react"
import React from "react";
import { AnswerHolder, ExamQHolder, FillInHolder, FlipcardHolder, MultipleChoiceHolder, FinalComponent } from "./quiz_top_components";
import Link from "next/link";


function CreateDefaultValues(
  quiz_data: { q_id: string; type: string; [key: string]: object | string }[]
) {
  return Object.fromEntries(quiz_data.map((item) => [item.q_id, ""]));
}

export default function QuizBuilder({
  data,
  quiz,
  desc
}: {
  data: Array<any>;
  quiz: any;
  desc?: string;
}) { 
  const defaults = CreateDefaultValues(data);
  const form = useForm({
    defaultValues: defaults,
    onSubmit: ({ value }) => {
      // your submit logic here
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  // Called when an answer is chosen for the current question to reveal the next
  const handleAnswered = () => {
    const x = document.getElementById("SLIDER_PROGRESS");

    if (x) {
      const percentage = ((currentIndex + 1) / data.length) * 100;
      x.style.width = `${percentage}%`;
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      const e = document.getElementById("_MAIN_CONTROL_FORM");
      
      setTimeout(() => {if (e) {
        e.scrollTo({top: e.scrollHeight, behavior: "smooth"})
      }}, 850)
    }, 200); // slight delay for animation smoothness
  };

  if (!started) {
    return <div className="flex flex-col items-center justify-start gap-4 mr-4 h-full">
      <QuizCard className="w-full p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-pink-500" />
            {quiz.name}
            <span className="px-2 py-0.5 ml-2 text-sm rounded-full bg-pink-400 text-black">
              {quiz.label.toUpperCase()}
            </span>
          </h2>

          <button
            className={ started ? "flex items-center gap-1 text-sm px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded " : "flex items-center gap-1 text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"}
          >
            <Printer className="w-4 h-4" />
            Example button
          </button>
        </div>

        {
          desc && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {desc}
            </p>
          )
        }

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Part of <span className="font-medium">{quiz.topic}</span> • Type:{" "}
          <span className="italic">Quick Quiz</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-pink-500" />
            Memory: <span className="font-semibold">72%</span>
          </div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-pink-500" />
            Last beaten: <span className="font-semibold">2 days ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-pink-500" />
            Last score: <span className="font-semibold">8/10</span>
          </div>
        </div>
      </QuizCard>

      <div className="flex flex-row gap-2">
      <button
        onClick={() => {
          setStarted(true)
        }}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-md"
      >
        <PlayCircle className="w-5 h-5" />
        <span className="font-medium text-base">Start Quick Quiz</span>
      </button>

      <Link
        href={`../topics/${quiz.topic}`}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-pink-500/50 hover:bg-pink-600/50 text-white dark:bg-blue-600/50 dark:hover:bg-blue-700/50 transition-all shadow-md"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium text-base">Back to {quiz.topic}</span>
      </Link></div>
    </div>
  }

  return (
    <div className="flex flex-col items-center overflow-y-auto overflow-x-hidden justify-start gap-4 mr-4 h-full">
      <QuizCard className="w-full p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-pink-500" />
            {quiz.name}
            <span className="px-2 py-0.5 ml-2 text-sm rounded-full bg-pink-400 text-black">
              {quiz.label.toUpperCase()}
            </span>
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Part of <span className="font-medium">{quiz.topic}</span> • Type:{" "}
          <span className="italic">Quick Quiz</span>
        </p>

        <div className="w-full rounded-full overflow-hidden border-pink-400 border-2 border-solid">
          <div id="SLIDER_PROGRESS" className="bg-pink-400 w-[0%] transition-all h-4"></div>
        </div>
      </QuizCard>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        id="_MAIN_CONTROL_FORM"
        className="w-full mt-2 mb-8 flex flex-col items-center justify-start gap-4 overflow-x-hidden flex-1 h-full"
        >
          <AnimatePresence mode="wait">
            {data.slice(0, currentIndex + 1).map((quizItem, index) => {
              const type = quizItem.type;
              const id = quizItem.q_id;
              const questionNumber = index + 1;

              if (type === "multiple_choice") { 
                return (
                  <MultipleChoiceHolder key={questionNumber} id={id} form={form} handleAnswered={handleAnswered} questionNumber={index + 1} quiz={quiz} quizItem={quizItem} />
                );
              }

              if (type === "fill_in") {
                return (
                  <FillInHolder key={questionNumber} id={id} form={form} handleAnswered={handleAnswered} quizItem={quizItem} quiz={quiz} questionNumber={questionNumber} />
                );
              }

              if (type === "flipcard") {
                return (
                 <FlipcardHolder key={questionNumber} id={id} handleAnswered={handleAnswered} quizItem={quizItem} quiz={quiz} form={form} questionNumber={questionNumber} />
                );
              }

              if (type === "examq") {
                return (
                  <ExamQHolder key={questionNumber} id={id} handleAnswered={handleAnswered} quizItem={quizItem} quiz={quiz} form={form} questionNumber={questionNumber} />
                );
              }

              if (type === "answer") {
                return (
                  <AnswerHolder key={questionNumber} id={id} handleAnswered={handleAnswered} quizItem={quizItem} form={form} questionNumber={questionNumber} />
                );
              }

              return (
                <QuizItem key={id}>
                  <QuizCard>
                    <p>Quiz build error: Type {type} does not exist.</p>
                  </QuizCard>
                </QuizItem>
              );
            })}

            {/* ✅ Add this block AFTER all questions */}
            {currentIndex >= data.length && (
              <FinalComponent quiz={quiz} />
            )}
          </AnimatePresence>
      </form>
      
    </div>
  );
}
