import { account } from "@/lib/appwriteClient";
import { redirect } from "next/navigation";

export default async function Root() {
  // for now, just redirect to /onboarding
  let user;
  try { user = await account.get() } catch { user = null };

  if (user) {
    return redirect("/dashboard");
  }

  return redirect("/onboarding");
}
