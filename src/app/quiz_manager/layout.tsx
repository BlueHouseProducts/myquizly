import { getUserServerCurrent } from "@/comp/ssr/auth";
import { account, client } from "@/lib/appwriteClient";
import { Account } from "appwrite";
import { redirect } from "next/navigation";

export default async function QuizLayout({ children }: { children: React.ReactNode }) { 
  const u = await getUserServerCurrent();

  if (!u) {
    redirect("/onboarding");
    return null;
  }
  
  return (
    <main className="flex flex-col h-full">
      {children}
    </main>
  );
}