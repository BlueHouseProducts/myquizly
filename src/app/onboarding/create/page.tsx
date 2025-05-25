"use client";

import { Onboarding_AccountForm } from "@/comp/onboarding/create_form";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Account } from "appwrite";
import {
  ChevronLeft,
  ChevronLeftCircle,
  CircleChevronLeftIcon,
  CircleChevronRightIcon,
  LogIn,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [isCreating, setIsCreating] = useState(false);

  // Track window size for full viewport grid
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMouseMove(e: any) {
    setMousePos({ x: e.clientX, y: e.clientY });
  }
  function handleMouseLeave() {
    setMousePos({ x: -1000, y: -1000 });
  }

  const gridSize = 80;
  const { width, height } = windowSize;

  const verticalLines = [];
  for (let x = 0; x <= width; x += gridSize) verticalLines.push(x);
  const horizontalLines = [];
  for (let y = 0; y <= height; y += gridSize) horizontalLines.push(y);

  function strokeWidthForLine(linePos: number, isVertical: boolean) {
    const mouseCoord = isVertical ? mousePos.x : mousePos.y;
    const dist = Math.abs(linePos - mouseCoord);
    if (dist > 150) return 1;
    return 1 + (150 - dist) / 30;
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-blue-600/50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100vw", height: "100vh" }}
    >
      <svg
        className="absolute inset-0 -z-10"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {verticalLines.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={strokeWidthForLine(x, true)}
          />
        ))}
        {horizontalLines.map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={strokeWidthForLine(y, false)}
          />
        ))}
      </svg>

      <div className="mx-8e mt-4 z-30 md:mt-0 *:z-20 text-center flex justify-center items-center mr-24 flex-col flex-1 select-none">
        <h1 className=" text-white text-3xl md:text-6xl font-extrabold drop-shadow-lg max-w-4xl leading-tight">
          Welcome to QuizlyGCSE
        </h1>

        <motion.div
          initial={{ y: -5, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white flex flex-col justify-center items-center rounded-md px-12 py-4 mt-12 flex-shrink-0"
        >
          <Onboarding_AccountForm />
          <Link
            href="/onboarding"
            className="text-black w-full mt-2 text-start text-xl"
          >
            Back
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
