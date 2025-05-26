"use client";

import { Onboarding_AccountForm } from "@/comp/onboarding/create_form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const gridSize = 80;
  const { width, height } = windowSize;

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    setMousePos({ x: e.clientX, y: e.clientY });
  }
  function handleMouseLeave() {
    setMousePos({ x: -1000, y: -1000 });
  }

  function strokeWidthForLine(linePos: number, isVertical: boolean) {
    const mouseCoord = isVertical ? mousePos.x : mousePos.y;
    const dist = Math.abs(linePos - mouseCoord);
    return dist > 150 ? 1 : 1 + (150 - dist) / 30;
  }

  const verticalLines = Array.from({ length: Math.ceil(width / gridSize) }, (_, i) => i * gridSize);
  const horizontalLines = Array.from({ length: Math.ceil(height / gridSize) }, (_, i) => i * gridSize);

  return (
    <div
      className="relative min-h-screen w-screen bg-gradient-to-br from-purple-700/50 to-blue-600/50 overflow-hidden flex items-center justify-center px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid Background */}
      <svg className="absolute inset-0 -z-10" width={width} height={height}>
        {verticalLines.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="rgba(255,255,255,0.15)"
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
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={strokeWidthForLine(y, false)}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="w-full max-w-3xl z-30 text-center flex flex-col items-center justify-center space-y-8">
        <h1 className="text-white text-3xl md:text-6xl font-extrabold drop-shadow-lg max-w-4xl leading-tight">
          Login to QuizlyGCSE
        </h1>

        <motion.div
          initial={{ y: -5, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-transparent rounded-2xl p-8 md:p-10 w-full"
        >
          <Onboarding_AccountForm type="login" />

          <Link
            href="/onboarding"
            className="text-white mt-6 inline-flex items-center gap-2 text-lg md:text-xl hover:underline"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
