"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
      className="relative flex md:flex-row flex-col items-center justify-center md:justify-start min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100vw", height: "100vh" }}
    >

      <svg
        className="absolute inset-0 z-10"
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

      <div className="mx-8 mt-4 md:mt-0 *:z-20 text-center flex justify-center md:justify-start md:text-start mr-24 flex-col flex-1 select-none">
        <h1 className=" text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg max-w-4xl leading-tight">
          Welcome to QuizlyGCSE
        </h1>

        <h2 className="text-3xl mt-2 drop-shadow-sm">My revision platform - maybe also useful for you.</h2>

        <div className="flex md:hidden flex-col justify-center items-center">
          <Link className="w-fit m-2 p-4 text-2xl bg-blue-300 text-black mt-4 rounded-md z-40" href="/account/create">Create an account</Link>
          <Link className="w-fit m-2 text-2xl z-40 bg-white p-2 text-black rounded-md" href="/account/login">Login instead</Link>
        </div>
      </div>

      <div className="hidden md:w-1/2 md:h-full w-full select-text bg-white md:flex flex-col justify-center items-start pl-8 gap-4">
        <h1 className="text-4xl text-black">Let's get started <b>now</b></h1>
        <Link className="w-fit text-3xl z-40 bg-white text-black rounded-md underline" href="/account/login">Create account</Link>
        <Link className="w-fit text-3xl z-40 bg-white text-black rounded-md underline" href="/account/login">Login instead</Link>

        <footer className="bottom-0 absolute mb-4">
          <Link className="flex flex-row gap-1 *:z-40" href="https://github.com/BlueHouseProducts/quizly-mygcse"><SiGithub color="black" /> <p className="text-black">View on Github</p></Link>
        </footer>
      </div>
    </div>
  );
}
