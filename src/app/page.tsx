"use client";

import { account } from "@/lib/appwriteClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Root() {  
  const r = useRouter();
  
  useEffect(() => {
    // This effect runs on the client side to handle redirection
    const user = account.get();
    user.then((user) => {
      if (user) {
        // If the user is logged in, redirect to the dashboard
        r.push("/dashboard");
      } else {
        r.push("/onboarding");
      }
    }).catch(() => {
      r.push("/onboarding");
    });
  });

  return <p>Redirecting...</p>;
}
