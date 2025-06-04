"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion, AnimatePresence } from "framer-motion";
import { ExamQ, FillIn, FinalComponent, Flipcards, MultipleChoice, QuizCard, QuizItem } from "./quiz_components";

function CreateDefaultValues(
  quiz_data: { q_id: string; type: string; [key: string]: object | string }[]
) {
  return Object.fromEntries(quiz_data.map((item) => [item.q_id, ""]));
}

export default function QuizBuilder({
  data,
  quiz,
}: {
  data: Array<any>;
  quiz: any;
}) { 
  const defaults = CreateDefaultValues(data);
  const form = useForm({
    defaultValues: defaults,
    onSubmit: ({ value }) => {
      // your submit logic here
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Called when an answer is chosen for the current question to reveal the next
  const handleAnswered = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      const e = document.getElementById("_MAIN_CONTROL_FORM");
      
      setTimeout(() => {if (e) {
        e.scrollTo({top: e.scrollHeight, behavior: "smooth"})
      }}, 850)
    }, 200); // slight delay for animation smoothness
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 mr-4 h-full">
      <QuizCard>
        <h2 className="text-2xl">
          {quiz.name}{" "}
          <span className="px-2 ml-2 rounded-full bg-pink-400">
            {quiz.label.toUpperCase()}
          </span>{" "}
        </h2>
        <p>Part of {quiz.topic}</p>
      </QuizCard>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        id="_MAIN_CONTROL_FORM"
        className="w-full mt-2 mb-8 flex flex-col items-center justify-start gap-4 overflow-x-hidden overflow-y-auto flex-1 h-full"
      >
        <AnimatePresence mode="wait">
          {data.slice(0, currentIndex + 1).map((quizItem, index) => {
            const type = quizItem.type;
            const id = quizItem.q_id;

            if (type === "multiple_choice") {
              return (
                <QuizItem key={id}>
                  <form.Field name={id}>
                    {(field) => (
                      <MultipleChoice
                        formObject={field}
                        title={quizItem.multiple_choice.title}
                        options={quizItem.multiple_choice.options}
                        onAnswered={handleAnswered}
                        questionid={id}
                        quizid={quiz.id}
                        subject={quiz.subject}
                      />
                    )}
                  </form.Field>
                </QuizItem>
              );
            }

            if (type === "fill_in") {
              return (
                <QuizItem key={id}>
                  <form.Field name={id}>
                    {(field) => (
                      <FillIn
                        formObject={field}
                        onAnswered={handleAnswered}
                        questionData={quizItem}
                        quizData={quiz}
                      />
                    )}
                  </form.Field>
                </QuizItem>
              );
            }

            if (type === "flipcard") {
              return (
                <QuizItem key={id}>
                  <form.Field name={id}>
                    {(field) => (
                      <Flipcards
                        formObject={field}
                        onAnswered={handleAnswered}
                        questionData={quizItem}
                        quizData={quiz}
                      />
                    )}
                  </form.Field>
                </QuizItem>
              );
            }

            if (type === "examq") {
              return (
                <QuizItem key={id}>
                  <form.Field name={id}>
                    {(field) => (
                      <ExamQ
                        formObject={field}
                        onAnswered={handleAnswered}
                        questionData={quizItem}
                        quizData={quiz}
                      />
                    )}
                  </form.Field>
                </QuizItem>
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
            <FinalComponent topic={quiz.topic} />
          )}
        </AnimatePresence>

        <p>Quiz is part of the Quizly Trademarks ©2025 BHP</p>
      </form>
    </div>
  );
}
