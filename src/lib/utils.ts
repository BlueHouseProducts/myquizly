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

export function timeAgo(date: Date | string): string {
  if (!(date instanceof Date)) {
    if (!date || typeof date !== "string") {
      throw new Error("Invalid date");
    }

    date = new Date(date);
  }



  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const eightMonths = 8 * month;

  if (seconds < minute) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (seconds < month) {
    const days = Math.floor(seconds / day);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (seconds < eightMonths) {
    const months = Math.floor(seconds / month);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return 'a long time ago';
  }
}

