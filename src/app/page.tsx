import { redirect } from "next/navigation";

export default function Root() {
    // for now, just redirect to /onboarding
    return redirect("/onboarding");
}