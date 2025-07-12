"use client";

import { useState } from "react";
import { Answer, ExamQ, FillIn, Flipcards, MultipleChoice, QuizItem } from "./quiz_components";
import { ArrowLeftCircle, Check, CheckSquare, FlipVertical, FolderOutput, ListChecks, MinusSquare, NotepadText, RefreshCcw, SquareStack } from "lucide-react";
import Link from "next/link";
import { subjectData, subjectType } from "@/lib/dbCompData";


export function MultipleChoiceHolder({
  quizItem,
  id,
  questionNumber,
  form,
  handleAnswered,
  quiz,
  ME
}: {
  quizItem: any;
  id: string;
  questionNumber: number;
  form: any;
  handleAnswered: () => void;
  quiz: any;
  ME: boolean;
}) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnsweredLocal = (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);
    handleAnswered();
  };

  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        Question {questionNumber} • <span className="capitalize">{label}</span>
      </h3>
    </div>
  );

  return (
    <QuizItem useMotion={ME} key={id}>
      <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
        {renderQuestionHeader(<ListChecks className="text-pink-500" />, quizItem.text_title || "Multiple Choice")}
        <form.Field name={id}>
          {(field: any) =>
            answered ? (
              correct ? <p className="flex flex-row gap-2"><CheckSquare /> You got this correct</p> : <><p className="flex flex-row gap-2"><MinusSquare /> You got this incorrect</p>{ quizItem.explanation && <p className="mt-2 text-black/80 dark:text-white/80"><b>Explanation:</b> {quizItem.explanation}</p> }</>
            ) : (
              <MultipleChoice
                formObject={field}
                title={quizItem.multiple_choice.title}
                options={quizItem.multiple_choice.options}
                onAnswered={handleAnsweredLocal}
                questionid={id}
                quizid={quiz.id}
                subject={quiz.subject}
                quizData={quizItem}
                ME={ME}
              />
            )
          }
        </form.Field>
      </div>
    </QuizItem>
  );
}

export function FillInHolder({id, handleAnswered, quizItem, quiz, form, questionNumber, ME}: {id: string, handleAnswered: () => void, quizItem: any, quiz: any, form: any, questionNumber: number, ME: boolean}) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnsweredLocal = (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);
    handleAnswered();
  };

  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        Question {questionNumber} • <span className="capitalize">{label}</span>
      </h3>
    </div>
  );
  
  return <QuizItem useMotion={ME} key={id}>
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {renderQuestionHeader(<SquareStack className="text-pink-500" />, quizItem.text_title || "Gap Fill")}
      <form.Field name={id}>
          {(field: any) =>
            answered ? (
              correct ? <p className="flex flex-row gap-2"><CheckSquare /> You got this correct</p> : <><p className="flex flex-row gap-2"><MinusSquare /> You got this incorrect</p>{ quizItem.explanation && <p className="mt-2 text-black/80 dark:text-white/80"><b>Explanation:</b> {quizItem.explanation}</p> }</>
            ) : (
              <FillIn
                formObject={field}
                onAnswered={handleAnsweredLocal}
                questionData={quizItem}
                quizData={quiz}
              />
            )
          }
        </form.Field>
    </div>
  </QuizItem>
}

export function FlipcardHolder({id, handleAnswered, quizItem, quiz, form, questionNumber, ME}: {id: string, handleAnswered: () => void, quizItem: any, quiz: any, form: any, questionNumber: number, ME: boolean}) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnsweredLocal = (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);
    handleAnswered();
  };

  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        Question {questionNumber} • <span className="capitalize">{label}</span>
      </h3>
    </div>
  );
  
  return <QuizItem useMotion={ME} key={id}>
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {renderQuestionHeader(<FlipVertical className="text-pink-500" />, quizItem.text_title || "Flip card")}
      <form.Field name={id}>
          {(field: any) =>
            answered ? (
              correct ? <p className="flex flex-row gap-2"><CheckSquare /> You got this correct</p> : <><p className="flex flex-row gap-2"><MinusSquare /> You got this incorrect</p>{ quizItem.explanation && <p className="mt-2 text-black/80 dark:text-white/80"><b>Explanation:</b> {quizItem.explanation}</p> }</>
            ) : (
              <Flipcards
                ME={ME}
                formObject={field}
                onAnswered={handleAnsweredLocal}
                questionData={quizItem}
                quizData={quiz}
              />
            )
          }
        </form.Field>
    </div>
  </QuizItem>
}

export function ExamQHolder({id, handleAnswered, quizItem, quiz, form, questionNumber, ME}: {id: string, handleAnswered: () => void, quizItem: any, quiz: any, form: any, questionNumber: number, ME: boolean}) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnsweredLocal = (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);
    handleAnswered();
  };

  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        Question {questionNumber} • <span className="capitalize">{label}</span>
      </h3>
    </div>
  );
  
  return <QuizItem key={id} useMotion={ME}>
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {renderQuestionHeader(<NotepadText className="text-pink-500" />, quizItem.text_title || "Exam Style Question")}
      <form.Field name={id}>
          {(field: any) =>
            answered ? (
              correct ? <p className="flex flex-row gap-2"><CheckSquare /> You got this correct</p> : <><p className="flex flex-row gap-2"><MinusSquare /> You got this incorrect</p>{ quizItem.examq.a && <p className="mt-2 text-black/80 dark:text-white/80"><b>Explanation:</b> {quizItem.examq.a}</p> }</>
            ) : (
              <ExamQ
                formObject={field}
                onAnswered={handleAnsweredLocal}
                questionData={quizItem}
                quizData={quiz}
              />
            )
          }
        </form.Field>
    </div>
  </QuizItem>
}

export function AnswerHolder({id, handleAnswered, quizItem, form, questionNumber, ME}: {id: string, handleAnswered: () => void, quizItem: any, form: any, questionNumber: number, ME: boolean}) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnsweredLocal = (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);
    handleAnswered();
  };

  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        Question {questionNumber} • <span className="capitalize">{label}</span>
      </h3>
    </div>
  );
  
  return <QuizItem useMotion={ME} key={id}>
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {renderQuestionHeader(<NotepadText className="text-pink-500" />, quizItem.text_title || "Word Answer")}
      <form.Field name={id}>
          {(field: any) =>
            answered ? (
              correct ? <p className="flex flex-row gap-2"><CheckSquare /> You got this correct</p> : <><p className="flex flex-row gap-2"><MinusSquare /> You got this incorrect</p>{ quizItem.explanation && <p className="mt-2 text-black/80 dark:text-white/80"><b>Explanation:</b> {quizItem.explanation}</p> }</>
            ) : (
              <Answer
                formObject={field}
                onAnswered={handleAnsweredLocal}
                questionData={quizItem}
              />
            )
          }
        </form.Field>
    </div>
  </QuizItem>
}

export function FinalComponent({ quiz, ME }: { quiz: any, ME: boolean }) {
  const renderQuestionHeader = (icon: any, label: string) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
      {icon}
      <h3 className="text-lg font-semibold">
        <span className="capitalize">{label}</span>
      </h3>
    </div>
  );
  
  return (
    <QuizItem useMotion={ME} key={"QuizCompleted"}>
      <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {renderQuestionHeader(<Check className="text-pink-500" />, "Task Completed!")}
      <p className="text-xl mb-2">You completed {(quiz as any).name}</p>
      
      <div className="flex flex-row gap-2">
        <Link
          href={`#`}
          onClick={() => window.location.reload()}
          className={ "flex items-center gap-1 text-lg w-fit px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"}
        >
          <RefreshCcw className="w-4 h-4" />
          Restart Quick Quiz
        </Link>
        <Link
          href={`../topics/${(quiz as any).topic}`}
          className={ "flex items-center gap-1 text-lg w-fit px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"}
        >
          <FolderOutput className="w-4 h-4" />
          All Items from {subjectData[quiz.subject as subjectType][(quiz as any).topic].name}
        </Link>
        <Link
          href={`../topics`}
          className={ "flex items-center gap-1 text-lg w-fit px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"}
        >
          <ArrowLeftCircle className="w-4 h-4" />
          All Topics from {quiz.subject}
        </Link>
      </div>
      </div>
    </QuizItem>
  );
}
