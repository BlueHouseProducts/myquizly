import { redirect } from "next/navigation";

// export default function Home() {
//   const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   const [isCreating, setIsCreating] = useState(false);

//   // Track window size for full viewport grid
//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     }
//     handleResize(); // init
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   function handleMouseMove(e: any) {
//     setMousePos({ x: e.clientX, y: e.clientY });
//   }
//   function handleMouseLeave() {
//     setMousePos({ x: -1000, y: -1000 });
//   }

//   const gridSize = 80;
//   const { width, height } = windowSize;

//   const verticalLines = [];
//   for (let x = 0; x <= width; x += gridSize) verticalLines.push(x);
//   const horizontalLines = [];
//   for (let y = 0; y <= height; y += gridSize) horizontalLines.push(y);

//   function strokeWidthForLine(linePos: number, isVertical: boolean) {
//     const mouseCoord = isVertical ? mousePos.x : mousePos.y;
//     const dist = Math.abs(linePos - mouseCoord);
//     if (dist > 150) return 1;
//     return 1 + (150 - dist) / 30;
//   }

//   return (
//     <div
//       className={`relative flex md:flex-row flex-col items-center justify-center md:justify-start min-h-screen overflow-hidden transition-colors duration-700 ease-in-out bg-gradient-to-br
//     ${isCreating
//           ? " from-purple-700/50 to-green-400/50"
//           : "from-purple-700/50 to-blue-600/50"}
//     `}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ width: "100vw", height: "100vh" }}
//     >

//       <svg
//         className="absolute inset-0 -z-10"
//         width={width}
//         height={height}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         {verticalLines.map((x) => (
//           <line
//             key={`v-${x}`}
//             x1={x}
//             y1={0}
//             x2={x}
//             y2={height}
//             stroke="rgba(255,255,255,0.2)"
//             strokeWidth={strokeWidthForLine(x, true)}
//           />
//         ))}
//         {horizontalLines.map((y) => (
//           <line
//             key={`h-${y}`}
//             x1={0}
//             y1={y}
//             x2={width}
//             y2={y}
//             stroke="rgba(255,255,255,0.2)"
//             strokeWidth={strokeWidthForLine(y, false)}
//           />
//         ))}
//       </svg>

//       <div className="mx-8 mt-4 z-30 md:mt-0 *:z-20 text-center flex justify-center md:justify-start md:text-start mr-24 flex-col flex-1 select-none">
//         <h1 className=" text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg max-w-4xl leading-tight">
//           Welcome to QuizlyGCSE
//         </h1>

//         <h2 className="text-3xl mt-4 drop-shadow-sm">My revision platform - maybe also useful for you.</h2>

//         <div className="flex md:hidden flex-col justify-center items-center">
//           <Link className="w-fit m-2 p-4 text-2xl bg-blue-300 text-black mt-4 rounded-md z-40" href="/onboarding/create">Create an account</Link>
//           <Link className="w-fit m-2 text-2xl z-40 bg-white p-2 text-black rounded-md" href="/onboarding/login">Login instead</Link>
//         </div>
//       </div>

//       <div className="hidden md:w-1/2 z-30 md:h-full w-full select-text bg-white md:flex flex-col justify-center items-start pl-8 gap-4">
//         <AnimatePresence mode="wait">
//           {!isCreating && <motion.div key="_notIsCreating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <h1 className="text-4xl text-black">Let's get started <b>now</b></h1>
//             <div className="flex flex-col gap-2 mt-4"><Link className="w-fit text-3xl z-40 bg-white text-black rounded-md underline flex flex-row gap-2 items-center justify-center" href="#" onClick={() => setIsCreating(true)}><User />Create account</Link>
//               <Link className="w-fit mt-2 text-3xl z-40 bg-white text-black rounded-md underline flex flex-row gap-2 items-center justify-center" href="/onboarding/login"><LogIn />Login instead</Link>
//             </div>
//           </motion.div>} {isCreating &&
//             <motion.div className="w-full" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} key="isCreating">
//               <div className="flex flex-col gap-2 mt-4 max-w-3xl w-full">
//                 <Onboarding_AccountForm type="create" />

//                 <button className="text-black w-full mt-2 text-2xl underline text-center flex flex-row justify-center items-center" onClick={() => setIsCreating(false)}> <ChevronLeft /> Back</button>
//               </div>
//             </motion.div>}
//         </AnimatePresence>

//         <footer className="bottom-0 absolute mb-4 z-30">
//           <Link className="flex flex-row gap-1 *:z-40" href="https://github.com/BlueHouseProducts/quizly-mygcse"><SiGithub color="blue" /> <p className="text-black">Check the project out on Github</p></Link>
//         </footer>
//       </div>
//     </div>
//   );
// }

export default function OnboardingPage() {
  redirect("/onboarding/create");
}
