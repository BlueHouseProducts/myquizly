import { subjectType } from "@/lib/dbCompData";
import { GetQuizletDataV2 } from "@/lib/dbQuiz";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function VideoPage({ params }: { params: Promise<{ subject: string; video_id: string }> }) {
  const { subject, video_id } = await params;

  const realSubject = validateSubjectOrRedirect(subject);

  if (!realSubject) {
    return <div>Invalid page...</div>;
  }

  const item = await GetQuizletDataV2(video_id, realSubject);

  if (item === "ERR") {
    return <div>Error loading video...</div>;
  }

  const data = JSON.parse(item.quiz_data);

  if (!data) {
    return <div>Error loading video data...</div>;
  }
  
  return <div><video controls>
    <source src={data.url} type="video/mp4" />
    Your browser does not support the video tag.
  </video><Link className="flex items-center gap-1 text-sm px-3 py-1 w-fit h-fit mt-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition" href={"../topics/"+item.topic}> <ArrowLeft /> Back to {item.topic}</Link></div>
}