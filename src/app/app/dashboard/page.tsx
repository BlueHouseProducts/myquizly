"use client";

import { NavItem } from "@/comp/navs/app_left_nav";
import { AppTopNavbar } from "@/comp/navs/app_top_nav";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, BookA, BookType, Calculator, CircleX, Cpu, Expand, History, Languages, LayoutDashboard, Menu, Music, Settings, Sparkle, Sword, TestTube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from 'react';

export default function Dashboard() {
  const pathname = usePathname();
  
  return <div className="flex flex-col h-full">

    <AppTopNavbar enabled_item="overview" />
    
    <main className="flex flex-row flex-1 bg-pink-200 dark:bg-blue-950/50">
      <nav className="sm:w-64 bg-pink-200 dark:bg-transparent p-4">
        <ul className="flex flex-col gap-3">
          <h3 className="w-full text-center text-xl border-b-[1px] border-b-black dark:border-b-white pb-2">Overview</h3>
          
          <NavItem href="/app/dashboard/" icon={<LayoutDashboard size={20} />} label="Your Overview" active={pathname === "/dashboard"} />
          <NavItem href="/app/dashboard/history" icon={<History size={20} />} label="Quiz History" active={pathname === "/dashboard/history"} />
        </ul>
      </nav>

      <div className="pt-4 flex-1 pl-4 bg-pink-100 dark:bg-blue-950 rounded-tl-[8px]">
        <h1 className="text-3xl md:text-4xl font-bold">Overview</h1>
      </div>
    </main>
  </div>
}