"use client";

import { AppTopNavbar } from "@/comp/navs/app_top_nav";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, BookType, Calculator, CircleX, Cpu, Expand, History, Languages, LayoutDashboard, Menu, Music, Settings, Sparkle, Sword, TestTube } from "lucide-react";
import Link from "next/link";

import { useState } from 'react';



export default function Dashboard() {
  return <div>

    <AppTopNavbar enabled_item="overview" />
    
    <main className="flex mt-4 flex-row gap-4 pl-4 sm:pl-6 lg:pl-8">
      <nav className="border-r-white border-r-[1px] pr-4 hidden lg:block">
        <ul className="flex flex-col">
          <li className="w-full mb-2">
            <Link className="text-3xl" href="/dashboard/">Your Overview</Link>
          </li>

          <li className="w-full mb-2 flex justify-end">
            <Link className="text-xl text-end underline" href="/dashboard/">All quizes</Link>
          </li>
        </ul>
      </nav>

      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>
    </main>
  </div>
}