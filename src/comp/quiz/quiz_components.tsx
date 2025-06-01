"use client";

import { subjectType } from "@/lib/dbCompData";
import { CheckFillInItem, CheckMultipleChoice, GetFillInItem } from "@/lib/dbQuiz";
import { animate } from "motion";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChangeEventHandler, useEffect, useState } from "react";

export function QuizCard({children}: {children: React.ReactNode}) {
  return <div className="w-full bg-pink-300 dark:bg-blue-300 text-black px-6 py-8 rounded-xl shadow-lg shadow-pink-400/35 dark:shadow-blue-400/35">
    {children}
  </div>
}

export function QuizItem({children}: {children: React.ReactNode}) {
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="w-full"
  >
    {children}
  </motion.div>
}

type Option = {
  o_id: string;
  media_type: "text" | "image";
  media: any;
};

type MultipleChoiceProps = {
  options: Option[];
  title: string;
  formObject: any;
  onAnswered: () => void;
  quizid: string;
  subject: subjectType;
  questionid: string;
};

export function MultipleChoice({ options, title, formObject, onAnswered, quizid, subject, questionid }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  async function ChooseItem(o_id: string, e: React.MouseEvent<HTMLButtonElement>) {
    if (formObject.getValue() !== "") return;

    const button = e.currentTarget;

    animate(button, { scale: 0.6 }, { duration: 0.2, type: 'spring', bounceStiffness: 400, bounceDamping: 10 }).finished
    .then(() =>
      animate(button, { scale: 1.6 }, { duration: 0.1, type: 'spring', bounceStiffness: 1000, bounceDamping: 60 }).finished
    )
    .then(() =>
      animate(button, { scale: 1 }, { duration: 0.2 })
    );

    setTimeout(() => {
      onAnswered();
    }, 2000)

    setSelected(o_id);
    formObject.setValue(o_id);

    let correct = await CheckMultipleChoice(o_id, quizid, subject, questionid);

    if (correct === "ERR") {
      alert("A quiz error occured.");
      correct = false;
    }

    setIsCorrect(correct as boolean);

    formObject.setValue(correct.toString());
  }

  return (
    <QuizCard>
      <p className="text-center text-xl pb-4 p-2">{title}</p>
      <div className="flex flex-row gap-2 items-stretch justify-between">
        {options.map(option => {
          const isThisSelected = selected === option.o_id;
          let bgColor = selected ? "bg-white/50 text-black" : "bg-white/50 text-black hover:bg-fuchsia-200";

          if (isThisSelected && isCorrect !== null) {
            bgColor = isCorrect
              ? "bg-green-400 text-black border-2 border-black"
              : "bg-red-400 text-black border-2 border-black";
          }

          return (
            <button
              key={option.o_id}
              onClick={(e) => ChooseItem(option.o_id, e)}
              className={`flex-1 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out cursor-pointer text-center activatable-button-motion ${bgColor}`}
            >
              <div className="w-full h-full flex items-center justify-center px-4 py-2">
                {option.media_type === "text"
                  ? option.media
                  : option.media_type === "image"
                    ? <Image src={option.media} alt="Answer" width={200} height={50} />
                    : null}
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            key="feedback"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className={`mt-6 text-center text-xl font-semibold p-4 rounded-full w-full ${
              isCorrect ? "bg-green-400 text-black border-2 border-black" : "bg-red-400 text-black border-2 border-black"
            }`}
          >
            {isCorrect ? <>
            Correct!
            <motion.p initial={{ y: 100, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}}>
              You got it right!!
            </motion.p>
            </> : <>
            Incorrect!
            <motion.p initial={{ y: 100, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}}>
              You got it wrong!!
            </motion.p>
            </>}
          </motion.div>
        )}
      </AnimatePresence>
    </QuizCard>
  );
}

export function FillIn({ formObject, onAnswered, questionData, quizData }: { formObject: any, onAnswered: any, questionData: any, quizData: any }) {
  const [answeredElms, setAE] = useState<any>([]);
  const [isCorrect, setCorrect] = useState<boolean | null>(null);

  const [answered, setAnswered] = useState(false);
  const [filledValues, setFilledValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const load = async () => {
      const newVals: { [key: number]: string } = {};
      questionData.fill_in.text.forEach(async (item: string, idx: number) => {
        if (item === '__GAP__') {
          const val = await GetFillInItem(idx, quizData.id, quizData.subject, questionData.q_id);
          setFilledValues(prev => ({ ...prev, [idx]: val }));
        }
      });
    };
    load();
  }, []);

  function StateAnsweredAll(val: string) {
    if (val === "true") {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    
    if (formObject.getValue() === "true" || formObject.getValue === "false") {
      return
    }
    
    formObject.setValue(val);
    setAnswered(true);
    onAnswered();
  }
  
  return (
    <QuizCard>
      <p className="text-center text-xl pb-4 p-2">{questionData.fill_in.title}</p>

      <div className="flex flex-row space-x-0 flex-wrap">
        { 
          questionData.fill_in.text.map((item: string, idx: number) => {
            if (item === "__GAP__") {
              const inputKey = answered ? `filled-${idx}` : `unfilled-${idx}`;

              return (
                <input
                  key={inputKey}
                  id={`${questionData.q_id}_${idx}`}
                  name={idx.toString()}
                  className={
                    answered
                      ? (answeredElms[idx] === true
                        ? "text-lg bg-transparent text-black w-16 border-b-green-300 border-b-[4px] focus:ring-0 focus:outline-0 select-none cursor-default"
                        : isCorrect
                          ? "cursor-default text-lg border-b-[4px] focus:outline-0 border-b-fuchsia-300 bg-fuchsia-100 text-black w-16"
                          : "text-lg border-b-[4px] focus:outline-0 border-b-fuchsia-300 bg-fuchsia-100 text-red-700 w-16 cursor-default")
                      : (answeredElms[idx] === true
                        ? "text-lg bg-transparent text-black w-16 border-b-green-300 border-b-[4px] focus:ring-0 focus:outline-0 select-none"
                        : "text-lg border-b-[4px] border-b-fuchsia-300 bg-fuchsia-100 text-black w-16")
                  }
                  defaultValue={answered ? (filledValues[idx] ?? "") : undefined}
                  readOnly={answered || answeredElms[idx] === true}
                  onChange={
                    answered
                      ? undefined
                      : async (event: React.ChangeEvent<HTMLInputElement>) => {
                          if (answeredElms[idx] === true || answered) return;

                          const isTrue = await CheckFillInItem(idx, event.currentTarget.value, quizData.id, quizData.subject, questionData.q_id);
                          const updated = [...answeredElms];
                          updated[idx] = isTrue;
                          setAE(updated);

                          const totalGaps = questionData.fill_in.text.filter(t => t === '__GAP__').length;
                          const correctCount = updated.filter(Boolean).length;

                          if (correctCount === totalGaps) {
                            StateAnsweredAll("true");
                          }
                        }
                  }
                  autoComplete="off"
                  spellCheck={false}
                />
              );
            }

            return <p className="text-lg text-black" key={idx}>{item}</p>;
          })
        }
      </div>

      <div className="flex flex-row-reverse items-center mt-4">
        <button onClick={() => {
          if (answered) { return }
          StateAnsweredAll("false");
        }} className={!answered ? "bg-red-400 text-black hover:bg-red-300 transition-colors p-2 rounded-xl" : !isCorrect ? 'bg-red-300 text-black p-2 rounded-2xl cursor-default border-2 border-black' : 'bg-red-300 text-black p-2 rounded-2xl cursor-default'}>Give up!</button>
      </div>

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            key="feedback"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className={`mt-6 text-center text-xl font-semibold p-4 rounded-full w-full ${
              isCorrect ? "bg-green-400 text-black border-2 border-black" : "bg-red-400 text-black border-2 border-black"
            }`}
          >
            {isCorrect ? <>
            Correct!
            <motion.p initial={{ y: 100, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}}>
              You got it right!!
            </motion.p>
            </> : <>
            Incorrect!
            <motion.p initial={{ y: 100, opacity: 0 }} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}}>
              You got it wrong!!
            </motion.p>
            </>}
          </motion.div>
        )}
      </AnimatePresence>
    </QuizCard>
  )
}
