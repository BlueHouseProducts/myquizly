import { subjectType } from "@/lib/dbCompData";

export default function PdfPage({ pdf_id, subject }: { pdf_id: string, subject: subjectType }) {
  return <p>PDF ID: {pdf_id}</p>;
}