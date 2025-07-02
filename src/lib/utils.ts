import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { validSubjects, subjectType } from "@/lib/dbCompData";
import { redirect } from "next/navigation";

export function validateSubjectOrRedirect(subject: string): subjectType {
  if (!validSubjects.includes(subject as subjectType)) {
    redirect("/app/dashboard");
  }
  
  return subject as subjectType;
}
