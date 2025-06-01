"use client";

import { animate } from "motion";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

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
};

export function MultipleChoice({ options, title, formObject, onAnswered }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function ChooseItem(o_id: string, e: React.MouseEvent<HTMLButtonElement>) {
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

    const correct = o_id === "1";
    setIsCorrect(correct);
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