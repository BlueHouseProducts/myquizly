import { subjectType } from "@/lib/dbCompData";
import { GetQuizletDataV2 } from "@/lib/dbQuiz";
import { validateSubjectOrRedirect } from "@/lib/utils";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import Link from "next/link";

export default async function PdfPage({ pdf_id, subject }: { pdf_id: string, subject: subjectType }) {
  const validateSubject = validateSubjectOrRedirect(subject);
  const quizlet = await GetQuizletDataV2(pdf_id, validateSubject);

  if (quizlet === "ERR") {
    window.location.href = ".";
    return <></>;
  }

  if (!quizlet || !quizlet.quiz_data) {
    window.location.href = ".";
    return <></>;
  }

  const data = JSON.parse(quizlet.quiz_data); // Ensure quiz_data is parsed, if needed

  if (!data) {
    window.location.href = ".";
    return <></>;
  }
  
 return (
  <div className="flex flex-col min-h-screen p-4">
    <div className="flex-1">
      <object
        className="w-full h-[80vh] border rounded"
        data={data.url}
        type="application/pdf"
      >
        <p className="text-center mt-4">
          Unable to display PDF.{" "}
          <Link className="underline inline-flex items-center gap-1" download href={data.url}>
            <DownloadIcon size={16} />
            Download
          </Link>
        </p>
      </object>

      <Link
      className="mt-4 inline-flex items-center gap-1 text-sm px-3 py-2 w-fit bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition"
      href={`../topics/${quizlet.topic}`}
    >
      <ArrowLeft size={16} />
      Back to {quizlet.topic}
    </Link>
    </div>
  </div>
);

}