import { cookies } from "next/headers";
import { Models } from "node-appwrite";

export async function getUserServerCurrent(): Promise<Models.User<Models.Preferences> | false> {
  try { const cookieHeader = (await cookies()).toString();

  if (!process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error("Missing required environment variables");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT! + "/account", {
    headers: {
      "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
      "Cookie": cookieHeader,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    console.log("ARE YOU USING THE SAME URL TO ACCESS AS EXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT")
  }

  if (!res.ok) return false;

  return await res.json() }
  catch (E) {
    return false;
  }
}