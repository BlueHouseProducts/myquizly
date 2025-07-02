import { redirect } from "next/navigation";

export default async function QuizPage({ params }: { params: Promise<{ subject: string }> }) {
  redirect(`${(await params).subject}/topics`);
}