import { GetQuizletDataV2 } from "@/lib/dbQuiz";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function LinkPage({params}: {params: Promise<{subject: string, link_id: string}>}) {
  const { subject, link_id } = await params;

  const realSubject = validateSubjectOrRedirect(subject);
  const quizlet = await GetQuizletDataV2(link_id, realSubject);

  if (quizlet === "ERR") {
    return <p>Failed to GET quizlet {link_id} under {subject}</p>
  }

  if (!quizlet) {
    return <p>Quizlet {link_id} under {subject} not found</p>
  }

  const data = JSON.parse(quizlet.quiz_data);

  if (!data || !data.url) {
    return <p>Quizlet {link_id} under {subject} has no URL</p>
  }

  // Redirect to the main page of the subject
  redirect(data.url);
}