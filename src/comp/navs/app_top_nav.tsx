"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { account } from "@/lib/appwriteClient";
import { subjectType } from "@/lib/dbCompData";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { AppwriteException } from "appwrite";
import { LayoutDashboard, Calculator, Cpu, TestTube, Book, Sword, BookType, Music, Sparkle, Settings, CircleX, Menu, Expand, User, LogOut, HelpCircle, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AppTopNavbar({enabled_item}: {enabled_item?: subjectType | "overview" | "account"}) {
  const [isOpen, setIsOpen] = useState(false);

  async function Logout() {
    try {
      await account.deleteSession("current");
      window.location.href = "/";
    } catch (error) {
      if (error instanceof AppwriteException) {
        alert("An error occurred while logging out: " + error.message);
      }
    }
  }

  return (
    <header className={!isOpen ? "w-screen overflow-hidden z-50 bg-pink-200 dark:bg-blue-950/50" : "w-screen overflow-hidden z-50 xl:bg-pink-200 xl:dark:bg-blue-950/50 bg-pink-300 dark:bg-blue-900/50"}>
      {/* Top Navbar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:justify-start gap-8 items-center h-16 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/app/dashboard" className="text-2xl font-bold text-blue-400 dark:text-white">
              <span className="text-purple-900 dark:text-purple-400">Quizly</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex lg:flex-grow space-x-8 text-white/80 text-sm font-medium">
            <Link href="/app/dashboard" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl hidden xl:flex flex-row gap-2"><LayoutDashboard strokeWidth={enabled_item === "overview" ? 3 : 2} />Overview</Link>
            <Link href="/app/maths" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Calculator strokeWidth={enabled_item === "maths" ? 3 : 2} />Maths</Link>
            <Link href="/app/cs" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Cpu strokeWidth={enabled_item === "cs" ? 3 : 2} />CS</Link>
            <Link href="/app/science" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><TestTube strokeWidth={enabled_item === "science" ? 3 : 2} />Science</Link>
            <Link href="/app/english" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Book strokeWidth={enabled_item === "english" ? 3 : 2} />English</Link>
            <Link href="/app/history" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Sword strokeWidth={enabled_item === "history" ? 3 : 2} />History</Link>
            <Link href="/app/french" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><BookType strokeWidth={enabled_item === "french" ? 3 : 2} />French</Link>
            <Link href="/app/music" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Music strokeWidth={enabled_item === "music" ? 3 : 2} />Music</Link>
            <Link href="/app/rs" className="text-black dark:text-white hover:text-purple-800 dark:hover:text-pink-300 transition text-xl flex flex-row gap-2"><Sparkle strokeWidth={enabled_item === "rs" ? 3 : 2} />RS</Link>
          </nav>

          <div className="hidden xl:flex items-center space-x-4 flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Settings className="text-black dark:text-white" strokeWidth={enabled_item === "account" ? 3 : 2} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent style={{perspective: "1px"}} className="w-56 bg-blue-200 dark:bg-blue-950 mx-2 rounded-[8px] border-separate text-lg my-2">
                <DropdownMenuLabel className="text-lg font-bold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => window.location.href = "/app/dashboard"} className="focus:bg-purple-400/50 focus:underline text-lg focus:px-4 transition-all">
                    <User />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = "/app/settings"} className="focus:bg-purple-400/50 focus:underline text-lg focus:px-4 transition-all">
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = "/quiz_manager"} className="focus:bg-purple-400/50 focus:underline text-lg focus:px-4 transition-all">
                    <Terminal />
                    Quizlet Manager
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-purple-400/50 focus:underline focus:px-4 transition-all text-lg" onClick={() => window.location.href = "https://github.com/BlueHouseProducts/quizly-mygcse"}> <SiGithub /> GitHub</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-purple-400/50 focus:underline focus:px-4 transition-all text-lg" onClick={() => window.location.href = "/support"}>
                  <HelpCircle />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={Logout} className="focus:bg-red-300 dark:focus:bg-red-400/50 focus:px-4 transition-all focus:text-red-700 dark:focus:text-red-300 text-lg">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-1 items-center flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
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
        <div className="lg:hidden absolute w-full flex-1 h-fit bg-black/40 backdrop-blur-md text-white/80">
          <Link href="/app/dashboard" onClick={() => setIsOpen(false)} className="hover:text-white w-full flex items-center flex-row gap-2 text-2xl transition-all hover:bg-pink-300/5 px-4 py-2"><LayoutDashboard />Overview</Link>
          <Link href="/app/settings" onClick={() => setIsOpen(false)} className="hover:text-white w-full flex items-center flex-row gap-2 text-2xl transition-all hover:bg-pink-300/5 px-4 py-2"><Settings />Settings</Link>
          <Link href="#" onClick={() => {setIsOpen(false); Logout()}} className="hover:text-red-200 text-red-500 w-full flex items-center flex-row gap-2 text-2xl transition-all hover:bg-red-500/50 px-4 py-2"><LogOut />Logout</Link>
        </div>
      )}
    </header>
  );
}
