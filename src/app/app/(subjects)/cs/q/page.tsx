import { redirect } from "next/navigation";

export default function MQ() {
  redirect(".")
  return <p>Redirecting</p>
}