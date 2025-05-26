"use client";

import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { LayoutDashboard, Calculator, Cpu, TestTube, Book, Sword, BookType, Music, Sparkle, Settings, CircleX, Menu, Expand } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AppTopNavbar({enabled_item}: {enabled_item?: "overview" | "maths" | "cs" | "science" | "english" | "history" | "french" | "music" | "rs" | "account"}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mShowAll, setMShowAll] = useState(true);

  return (
    <header className="w-full z-50 bg-white/10">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start gap-8 items-center h-16 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              <span className="text-purple-400">Quizly</span>
              <span className="text-white/80 hidden xl:inline-block">: GCSEs</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 text-white/80 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-white transition text-xl hidden xl:flex flex-row gap-2"><LayoutDashboard strokeWidth={enabled_item === "overview" ? 3 : 2} />Overview</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Calculator strokeWidth={enabled_item === "maths" ? 3 : 2} />Maths</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Cpu strokeWidth={enabled_item === "cs" ? 3 : 2} />CS</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><TestTube strokeWidth={enabled_item === "science" ? 3 : 2} />Science</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Book strokeWidth={enabled_item === "english" ? 3 : 2} />English</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Sword strokeWidth={enabled_item === "history" ? 3 : 2} />History</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><BookType strokeWidth={enabled_item === "french" ? 3 : 2} />French</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Music strokeWidth={enabled_item === "music" ? 3 : 2} />Music</Link>
            <Link href="#" className="hover:text-white transition text-xl flex flex-row gap-2"><Sparkle strokeWidth={enabled_item === "rs" ? 3 : 2} />RS</Link>
          </nav>

          <div className="hidden xl:flex items-center space-x-4 flex-1 justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/account" className="text-white hover:text-purple-400">
                    <Settings strokeWidth={enabled_item === "account" ? 3 : 2} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-purple-400 p-2 rounded-sm text-lg text-black">Account Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-1 items-center flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? (
                <CircleX className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 pt-4 space-y-4 flex-1 h-fit bg-black/40 backdrop-blur-md text-white/80">
          <Link href="/dashboard" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><LayoutDashboard />Overview</Link>
          <Link href="/account" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Settings />Account</Link>
          <div className="w-full flex flex-row gap-2 items-center">
            <h3>Subjects</h3>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setMShowAll(!mShowAll)} className="text-white hover:text-purple-400">
                    <Expand />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-purple-400 p-2 rounded-lg text-lg text-black">Show/hide subjects</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="w-full border-white border-[2px]"></div>
          </div>

          {mShowAll && (<>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Calculator />Maths</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Cpu />Computer Science</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><TestTube />Science</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Book />English</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Sword />History</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><BookType />French</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Music />Music</Link>
          <Link href="#" className="hover:text-white w-full flex flex-row gap-2 text-2xl"><Sparkle />RS</Link>
          </>)}
        </div>
      )}
    </header>
  );
}
