"use client";

import { AppTopNavbar } from "@/comp/navs/app_top_nav";
import { account, client } from "@/lib/appwriteClient";
import { usePathname, useRouter } from "next/navigation";
import path from "path";

export default function Layout({ children }: { children: React.ReactNode }) {
  const r = useRouter();
  
  try {
    account.get();
  } catch (error) {
    try {window.location.href = "/onboarding"; } catch (e) {
      r.push("/onboarding");
    }
  }
  
  const pathname = usePathname();
  
  const enabled_item = 
    pathname.startsWith("/app/dashboard") ? "overview" : 
    pathname.startsWith("/app/settings") ? "account" :
    pathname.startsWith("/app/maths") ? "maths" :
    pathname.startsWith("/app/cs") ? "cs" :
    pathname.startsWith("/app/science") ? "science" :
    pathname.startsWith("/app/history") ? "history" :
    pathname.startsWith("/app/music") ? "music" :
    pathname.startsWith("/app/rs") ? "rs" :
    pathname.startsWith("/app/french") ? "french" :
    pathname.startsWith("/app/english") ? "english" :
    "overview"; // Default to overview if no specific item is matched

  return (
    <div className="h-full flex flex-col bg-pink-200 dark:bg-blue-950/50">
      <AppTopNavbar enabled_item={enabled_item} />
      {children}
    </div>
  )
}