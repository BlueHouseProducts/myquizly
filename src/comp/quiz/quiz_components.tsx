"use client";

import { subjectType } from "@/lib/dbCompData";
import {
  CheckFillInItem,
  CheckMultipleChoice,
  GetFillInItem,
  GetMultipleChoiceAnswer,
} from "@/lib/dbQuiz";
import { CirclePlay, Fullscreen } from "lucide-react";
import { animate } from "motion";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

//w-full bg-pink-300 dark:bg-blue-300 text-black px-6 py-8 rounded-xl shadow-lg shadow-pink-400/35 dark:shadow-blue-400/35
export function QuizCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={className || "text-black w-full"}>
      {children}
    </div>
  );
}

export function QuizItem({ children, useMotion = true }: { children: React.ReactNode, useMotion?: boolean }) {
  return ( useMotion ?
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {children}
    </motion.div> : <div className="w-full">
      {children}
    </div>
  );
}

type Option = {
  o_id: string;
  media_type: "text" | "image" | "audio";
  media: any;
};

type MultipleChoiceProps = {
  options: Option[];
  title: string;
  formObject: any;
  onAnswered: (s: boolean) => void;
  quizid: string;
  subject: subjectType;
  questionid: string;
  quizData: any;
  ME: boolean;

  correctAnswer: React.RefObject<HTMLAudioElement | null>;
  incorrectAnswer: React.RefObject<HTMLAudioElement | null>;
};

function AudioOption({ option, selected, isCorrect, correctAnswerMedia, ME, ChooseItem }: any) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering ChooseItem
    if (!audioRef.current || selected) return;
    audioRef.current.play();
  };

  let bgColor = selected
    ? "bg-blue-100 dark:bg-white text-xl text-black"
    : "bg-blue-100 dark:bg-white text-xl text-black";

  const isThisSelected = selected === option.o_id;
  if (isThisSelected && isCorrect !== null) {
    bgColor = isCorrect
      ? "bg-green-400 text-black border-2 border-black"
      : "bg-red-400 text-black border-2 border-black";
  }

  return (
    <div
    key={option.o_id}
    className={`flex-1 gap-4 flex flex-col items-center justify-center rounded-3xl border-2 ${
      selected && !isCorrect && option.o_id === correctAnswerMedia
        ? "border-green-800/40"
        : "border-transparent"
    } ${bgColor} p-4 sm:p-6 md:p-8 transition-all duration-300 ease-in-out text-center shadow-sm ${
      ME ? "activatable-button-motion" : ""
    }`}
  >
    {/* Audio Button */}
    <div className="flex flex-row gap-1 items-center justify-center">
    <button
      type="button"
      onClick={playAudio}
      className="bg-purple-200 text-black gap-2 px-4 py-4 sm:py-2 rounded-full border-2 border-black hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg md:text-xl"
      aria-label="Play audio"
    >
      <CirclePlay size={24} className="shrink-0 inline-block" />
      Play Audio
    </button>

    <Link className="bg-pink-200 hover:border-black border-2 border-transparent group m-4 p-1 lg:p-2 rounded-2xl" onClick={(e) => e.stopPropagation()} href={option.media} aria-label="View Image fullscreen" target="_blank"><Fullscreen /></Link>
    </div>
    <audio ref={audioRef} className="hidden">
      <source src={option.media} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    {/* Choose Button */}
    <button
      type="button"
      onClick={(e) => ChooseItem(option.o_id, e)}
      className="bg-blue-400 text-black text-sm sm:text-base md:text-lg font-semibold px-6 py-4 sm:py-2 rounded-full border border-black hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
    >
      Choose This
    </button>
  </div>

  );
}


export function MultipleChoice({
  options,
  title,
  formObject,
  onAnswered,
  quizid,
  subject,
  questionid,
  quizData,
  ME,
  correctAnswer,
  incorrectAnswer
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswerMedia, setCorrectAnswerMedia] = useState<any>(null);

  async function ChooseItem(
    o_id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    if (formObject.getValue()) return;

    const button = e.currentTarget;

    animate(
      button,
      ME ? { scale: 0.6 } : {},
      ME ? { duration: 0.2, type: "spring", bounceStiffness: 400, bounceDamping: 10 } : {}
    )
      .finished.then(
        () =>
          animate(
            button,
            ME ? { scale: 1.6 } : {},
            ME ? {
              duration: 0.1,
              type: "spring",
              bounceStiffness: 1000,
              bounceDamping: 60,
            } : {}
          ).finished
      )
      .then(() => animate(button, ME ? { scale: 1 } : {}, ME ? { duration: 0.2 } : {}));

    setSelected(o_id);
    formObject.setValue(o_id);


    let correct = await CheckMultipleChoice(o_id, quizid, subject, questionid);

    if (correct === "ERR") {
      alert("A quiz error occured.");
      correct = false;
    }

    if (correct === true) {
      correctAnswer.current?.play();
    } else {
      incorrectAnswer.current?.play();
    }

    setIsCorrect(correct as boolean);

    setTimeout(() => {
      onAnswered(correct as boolean);
    }, ME ? 3500 : 3000);

    formObject.setValue(correct.toString());
  }
  useEffect(() => {
    if (isCorrect === false) {
      // Only fetch the correct answer when the answer is incorrect
      GetMultipleChoiceAnswer(quizid, subject, questionid).then((result) => {
        setCorrectAnswerMedia(result || "Unknown");
      });
    }
  }, [isCorrect, quizid, subject, questionid]);

  return (
    <QuizCard>
      {quizData.multiple_choice.title_media === "text" ? (
        <p className="text-center text-xl pb-4 p-2">{title}</p> //////// todo change colours to work
      ) : quizData.multiple_choice.title_media === "image" ? (
        <Image
          src={title}
          alt="Quiz Title Image"
          width={200}
          height={50}
          className="mx-auto mb-4"
        />
      ) : null}
      <div className="w-full border-b-[1px] border-black sm:border-transparent block sm:hidden h-[1px] my-4 sm:my-0"></div>
      <div className="flex flex-col md:flex-row gap-2 items-stretch justify-between">
        {(options ?? []).map((option) => {
          const isThisSelected = selected === option.o_id;
          let bgColor = selected
            ? "bg-blue-100 dark:bg-white text-xl text-black"
            : "bg-blue-100 dark:bg-white text-xl text-black hover:bg-blue-200";

          if (isThisSelected && isCorrect !== null) {
            bgColor = isCorrect
              ? "bg-green-400 text-black border-2 border-black"
              : "bg-red-400 text-black border-2 border-black ";
          }

          if (option.media_type === "audio") {
            return <AudioOption
              key={option.o_id}
              option={option}
              selected={selected}
              isCorrect={isCorrect}
              correctAnswerMedia={correctAnswerMedia}
              ME={ME}
              ChooseItem={ChooseItem}
            />
          }

          return (
            <button
              type="button"
              key={option.o_id}
              onClick={(e) => ChooseItem(option.o_id, e)}
              className={
                selected && !isCorrect && option.o_id === correctAnswerMedia
                  ? `flex-1 p-2 sm:p-0 flex items-center justify-center rounded-3xl ${ME && "transition-all"} duration-300 ease-in-out cursor-pointer text-center ${ME && "activatable-button-motion"} ${bgColor} border-2 border-green-800/40`
                  : `flex-1 p-2 sm:p-0 flex items-center justify-center rounded-3xl ${ME && "transition-all"} duration-300 ease-in-out cursor-pointer text-center ${ME && "activatable-button-motion"} ${bgColor}`
              }
            >
              <div className="w-full h-full flex items-center justify-center px-4 py-2">
                {option.media_type === "text" ? (
                  option.media
                ) : option.media_type === "image" ? (
                  <><Image
                    src={option.media}
                    alt="Answer"
                    width={200}
                    height={50}
                  /><Link className="bg-pink-200 hover:border-black border-2 border-transparent group lg:m-4 p-1 lg:p-2 rounded-2xl" onClick={(e) => e.stopPropagation()} href={option.media} aria-label="View Image fullscreen" target="_blank"><Fullscreen /></Link></>
                ) : option.media_type === "audio" ? (
                  (() => {
                    const audioRef = useRef<HTMLAudioElement>(null);

                    const playAudio = (e: React.MouseEvent) => {
                      if (!audioRef.current) return;
                      if (selected) return; // prevent playing audio if an option is already selected
                      e.stopPropagation(); // prevents triggering ChooseItem when just playing audio
                      if (audioRef.current) {
                        audioRef.current.play();
                      }
                    };

                    return (
                      <div className="mb-10 sm:mb-2">
                        <Link
                          href={"#"}
                          onClick={playAudio}
                          className=" bg-purple-200 text-black text-2xl flex flex-row gap-2 px-2 py-1 m-5 rounded-full hover:bg-purple-300 border-2 border-black"
                        >
                          <CirclePlay size={30} />(Play)
                        </Link>
                        <audio ref={audioRef}>
                          <source src={option.media} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    );
                  })()
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
      {/*<AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            key="feedback"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className={`mt-6 text-center text-xl font-semibold p-4 rounded-full w-full ${
              isCorrect
                ? "bg-green-400 text-black border-2 border-black"
                : "bg-red-400 text-black border-2 border-black"
            }`}
          >
            {isCorrect ? (
              <>
                Correct!
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {quizData.explanation}
                </motion.p>
              </>
            ) : (
              <>
                Incorrect!
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  The correct answer was option {correctAnswerMedia}
                  <span className="block">{quizData.explanation}</span>
                </motion.p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>*/}
    </QuizCard>
  );
}

export function FillIn({
  formObject,
  onAnswered,
  questionData,
  quizData,
  correctAnswer,
  incorrectAnswer
}: {
  formObject: any;
  onAnswered: any;
  questionData: any;
  quizData: any;
  correctAnswer: React.RefObject<HTMLAudioElement | null>;
  incorrectAnswer: React.RefObject<HTMLAudioElement | null>;
}) {
  const [answeredElms, setAE] = useState<any>([]);
  const [isCorrect, setCorrect] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [filledValues, setFilledValues] = useState<{ [key: number]: string }>(
    {}
  );

  // ADD: Refs to each input
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    const load = async () => {
      questionData.fill_in.text.forEach(async (item: string, idx: number) => {
        if (item === "__GAP__") {
          const val = await GetFillInItem(
            idx,
            quizData.id,
            quizData.subject,
            questionData.q_id
          );
          setFilledValues((prev) => ({ ...prev, [idx]: val }));
        }
      });
    };
    load();
  }, []);

  function StateAnsweredAll(val: string) {
    if (val === "true") {
      correctAnswer.current?.play();
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    if (formObject.getValue() === "true" || formObject.getValue === "false") {
      return;
    }

    formObject.setValue(val);
    setAnswered(true);

    setTimeout(() => onAnswered(val === "true"), 2000);
  }

  return (
    <QuizCard>
      <p className="text-black dark:text-white text-center text-xl pb-4 p-2">
        {questionData.fill_in.title}
      </p>

      <div className="flex flex-row space-x-0 flex-wrap">
        {questionData.fill_in.text.map((item: string, idx: number) => {
          if (item === "__GAP__") {
            const inputKey = answered ? `filled-${idx}` : `unfilled-${idx}`;

            return (
              <input
                style={{textTransform: "lowercase"}}
                key={inputKey}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                id={`${questionData.q_id}_${idx}`}
                name={idx.toString()}
                className={
                  answered
                    ? answeredElms[idx] === true
                      ? "text-lg bg-transparent w-16 border-b-green-300 border-b-[4px] focus:ring-0 text-black dark:text-white focus:outline-0 select-none cursor-default"
                      : isCorrect
                      ? "cursor-default text-black dark:text-white focus:ring-0 text-lg border-b-[4px] focus:outline-0 border-b-fuchsia-300 bg-transparen w-16"
                      : "select-non focus:ring-0 text-lg border-b-[4px] focus:outline-0 border-b-fuchsia-300 bg-transparent text-red-700 w-16 cursor-default"
                    : answeredElms[idx] === true
                    ? "text-lg bg-transparent text-black dark:text-white w-16 border-b-green-300 border-b-[4px] focus:ring-0 focus:outline-0 select-none"
                    : "select-none text-black dark:text-white text-lg border-b-[4px] border-b-fuchsia-300 bg-transparent w-16 focus:ring-0 focus:outline-0"
                }
                defaultValue={answered ? filledValues[idx] ?? "" : undefined}
                readOnly={answered || answeredElms[idx] === true}
                onChange={
                  answered
                    ? undefined
                    : async (event: React.ChangeEvent<HTMLInputElement>) => {
                        if (answeredElms[idx] === true || answered) return;

                        const isTrue = await CheckFillInItem(
                          idx,
                          event.currentTarget.value,
                          quizData.id,
                          quizData.subject,
                          questionData.q_id
                        );
                        const updated = [...answeredElms];
                        updated[idx] = isTrue;
                        setAE(updated);

                        const totalGaps = questionData.fill_in.text.filter(
                          (t: any) => t === "__GAP__"
                        ).length;
                        const correctCount = updated.filter(Boolean).length;

                        // FOCUS NEXT INPUT
                        if (isTrue) {
                          const nextIdx = questionData.fill_in.text
                            .map((t: any, i: any) => ({ type: t, i }))
                            .filter((t: any) => t.type === "__GAP__")
                            .map((t: any) => t.i)
                            .find((i: any) => i > idx && !updated[i]);

                          if (
                            nextIdx !== undefined &&
                            inputRefs.current[nextIdx]
                          ) {
                            inputRefs.current[nextIdx]?.focus();
                          }
                        }

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

          return (
            <p className="text-lg text-black dark:text-white" key={idx}>
              {item}
            </p>
          );
        })}
      </div>

      <div className="flex flex-row-reverse items-center mt-4">
        <button
          type="button"
          onClick={() => {
            incorrectAnswer.current?.play();
            if (answered) {
              return;
            }
            StateAnsweredAll("false");
          }}
          className={
            !answered
              ? "bg-red-400 text-black hover:bg-red-300 transition-colors p-2 rounded-xl"
              : !isCorrect
              ? "bg-red-300 text-black p-2 rounded-2xl cursor-default border-2 border-black"
              : "bg-red-300 text-black p-2 rounded-2xl cursor-default"
          }
        >
          Give up!
        </button>
      </div>

      {/*
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
          key="feedback"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
          className={`mt-6 text-center text-xl font-semibold p-4 rounded-full w-full ${
            isCorrect
              ? "bg-green-400 text-black border-2 border-black"
              : "bg-red-400 text-black border-2 border-black"
          }`}
            >
          {isCorrect ? (
            <>
              Correct!
              <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
              >
            You got it right!!
              </motion.p>
            </>
          ) : (
            <>
              Incorrect!
              <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
              >
            You got it wrong!!
              </motion.p>
            </>
          )}
            </motion.div>
          )}
        </AnimatePresence>
      */}
    </QuizCard>
  );
}

export function Flipcards({
  formObject,
  onAnswered,
  questionData,
  quizData,
  ME,

  correctAnswer,
  incorrectAnswer
}: {
  formObject: any;
  onAnswered: any;
  questionData: any;
  quizData: any;
  ME: boolean;

  correctAnswer: React.RefObject<HTMLAudioElement | null>;
  incorrectAnswer: React.RefObject<HTMLAudioElement | null>;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cont, setContinue] = useState(false);

  const flipCard = useRef<HTMLDivElement>(null);
  const pItem = useRef<HTMLParagraphElement>(null);

  function Flip() {
    if (isFlipped) {
      return;
    }
    setTimeout(() => setIsFlipped(true), 500);

    if (flipCard.current) {
      animate(
        flipCard.current,
        ME ? { scaleX: 0, opacity: 0.7 } : {},
        ME ? { duration: 0.3 } : {}
      ).finished.then(() => {
        if (flipCard.current) {
          if (pItem.current) {
            pItem.current.textContent = questionData.flipcard.a;
          }

          animate(
            flipCard.current,
            { scaleX: 1, opacity: 1 },
            { duration: 0.3 }
          );
        } else {
          if (pItem.current) {
            pItem.current.textContent = questionData.flipcard.a;
          }
        }
      });
    }
  }

  function Continue(correct: boolean) {
    if (!isFlipped) {
      return;
    }
    if (cont) {
      return;
    }

    if (correct) {
      correctAnswer.current?.play();
    } else {
      incorrectAnswer.current?.play();
    }

    formObject.setValue(correct.toString());

    setContinue(true);
    setTimeout(() => onAnswered(correct as boolean), 500);
  }

  return (
    <QuizCard>
      <div className="flex flex-col gap-4 items-center justify-center">
        <motion.div
          onClick={Flip}
          ref={flipCard}
          className={
            isFlipped
              ? "dark:bg-white bg-pink-300 w-3/4 p-5 rounded-xl"
              : "dark:bg-white bg-pink-300 w-3/4 p-5 rounded-xl cursor-pointer"
          }
          initial={ME && { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.5 }}
          animate={ME && { scale: 1, opacity: 1 }}
        >
          <p className="text-center" ref={pItem}>
            {questionData.flipcard.q}
          </p>
        </motion.div>

        {!isFlipped ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
            animate={{ opacity: 1 }}
            onClick={Flip}
            className="p-5 rounded-full bg-green-300 hover:bg-green-100 transition-colors"
          >
            View Answer
          </motion.button>
        ) : (
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => Continue(true)}
              className={
                cont
                  ? "p-5 rounded-full bg-white/20 cursor-default"
                  : "p-5 rounded-full bg-green-300 hover:bg-green-100 transition-colors"
              }
            >
              I was correct
            </button>
            <button
              type="button"
              onClick={() => Continue(false)}
              className={
                cont
                  ? "p-5 rounded-full bg-white/20 cursor-default"
                  : "p-5 rounded-full bg-red-300 hover:bg-red-100 transition-colors"
              }
            >
              I was incorrect
            </button>
          </div>
        )}
      </div>
    </QuizCard>
  );
}

export function ExamQ({
  formObject,
  onAnswered,
  questionData,
  quizData,

  correctAnswer,
  incorrectAnswer
}: {
  formObject: any;
  onAnswered: any;
  questionData: any;
  quizData: any;

  correctAnswer: React.RefObject<HTMLAudioElement | null>;
  incorrectAnswer: React.RefObject<HTMLAudioElement | null>;
  
}) {
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);

  const [text, setText] = useState<string | undefined>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function ShowMarkScheme() {
    if (shown) {
      return;
    }
    if (done) {
      return;
    }

    setText(textareaRef.current?.value);
    setShown(true);
  }

  function Continue(correct: boolean) {
    if (done) {
      return;
    }
    if (!shown) {
      return;
    }

    if (textareaRef.current) {
      textareaRef.current.readOnly = true; // Make the textarea read-only
    }

    if (correct) {
      correctAnswer.current?.play();
      formObject.setValue("true");
    } else {
      incorrectAnswer.current?.play();
      formObject.setValue("false");
    }

    setDone(correct);
    setTimeout(() => onAnswered(correct as boolean), 500);
  }

  function AutoGrowingTextarea({ i }: { i: boolean }) {
    const handleInput = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
      }
    };

    useEffect(() => {
      handleInput(); // Initial adjustment
    }, []);

    const baseClasses = "bg-blue-300/50 dark:bg-white text-center sm:text-start w-full max-w-full h-fit my-2 text-lg p-2 resize-none overflow-auto rounded-xl box-border";
    const readOnlyClasses = "focus:outline-none focus:ring-0 focus:cursor-default";

    return (
      <textarea
        ref={textareaRef}
        className={`${baseClasses} ${i ? readOnlyClasses : ''}`}
        autoComplete="off"
        spellCheck={false}
        readOnly={i}
        value={i ? text : undefined}
        name={`_quizcard_question_${questionData.qid}_answer`}
        onInput={handleInput}
        rows={1}
      />
    );
  }

  return (
    <QuizCard>
      <div className="w-full max-w-full sm:flex sm:flex-col sm:items-center px-2">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-black dark:text-white/90">Exam question</h3>
          <p className="text-black dark:text-white/80 break-words">{questionData.examq.q}</p>
          <AutoGrowingTextarea i={shown} />
        </div>

        {shown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-xl m-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white w-full p-2 break-words"
          >
            <h3 className="font-bold">Mark Scheme</h3>
            <p className="break-words">{questionData.examq.a}</p>
          </motion.div>
        )}

        {!shown ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
            animate={{ opacity: 1 }}
            onClick={ShowMarkScheme}
            className="p-5 rounded-full bg-green-300 hover:bg-green-100 transition-colors mx-auto"
          >
            Show mark scheme
          </motion.button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              type="button"
              onClick={() => Continue(true)}
              className={
                done
                  ? "p-5 rounded-full bg-white/20 cursor-default"
                  : "p-5 rounded-full bg-green-300 hover:bg-green-100 transition-colors"
              }
            >
              I was correct
            </button>
            <button
              type="button"
              onClick={() => Continue(false)}
              className={
                done
                  ? "p-5 rounded-full bg-white/20 cursor-default"
                  : "p-5 rounded-full bg-red-300 hover:bg-red-100 transition-colors"
              }
            >
              I was incorrect
            </button>
          </div>
        )}
      </div>
    </QuizCard>
  );
}

export function Answer({
  formObject,
  onAnswered,
  questionData,
  correctAnswer,
  incorrectAnswer
}: {
  formObject: any;
  onAnswered: any;
  questionData: any;

  correctAnswer: React.RefObject<HTMLAudioElement | null>;
  incorrectAnswer: React.RefObject<HTMLAudioElement | null>;
}) {
  const [answered, setAnswered] = useState(false);
  const [value, setValue] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const RealAnswer = questionData.answer_.a;
  const Answers = questionData.answer_.sa;

  return (
    <QuizCard>
      <div className="flex flex-col items-center w-full">
        <h4 className="text-2xl text-black dark:text-white">{questionData.answer_.q}</h4>

        <input
          type="text"
          autoComplete="off"
          value={value}
          readOnly={answered}
          spellCheck={false}
          className={
            " bg-blue-300/50 dark:bg-white max-w-full w-80 h-fit my-2 text-lg p-2 resize-none overflow-hidden rounded-xl focus:outline-none focus:ring-0 focus:cursor-default " +
            (isCorrect === false && "text-red-700")
          }
          name={`_quizcard_question_${questionData.qid}_answer`}
          onChange={(e) => {
            const inputValue = e.currentTarget.value.toLowerCase();
            setValue(inputValue);

            if (
              inputValue === RealAnswer.toLowerCase() ||
              Answers.map((a: string) => a.toLowerCase()).includes(inputValue)
            ) {
              if (answered) return;
              correctAnswer.current?.play();
              setIsCorrect(true);

              setValue(RealAnswer);
              setAnswered(true);
              formObject.setValue("true");
              setTimeout(() => onAnswered(true), 2000);
            }
          }}
        />

        <div className="flex flex-row-reverse items-center mt-4">
          <button
            type="button"
            onClick={() => {
              if (answered) {
                return;
              }

              incorrectAnswer.current?.play();
              setIsCorrect(false);

              setValue(RealAnswer);
              setAnswered(true);
              formObject.setValue("false");
              setTimeout(() => onAnswered(false), 2000);

            }}
            className={
              !answered
                ? "bg-red-400 text-black hover:bg-red-300 transition-colors p-2 rounded-xl"
                : !isCorrect
                ? "bg-red-300 text-black p-2 rounded-2xl cursor-default border-2 border-black"
                : "bg-red-300 text-black p-2 rounded-2xl cursor-default"
            }
          >
            Give up!
          </button>
        </div>
      </div>
    </QuizCard>
  );
}
