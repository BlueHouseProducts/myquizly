import { Calculator } from "lucide-react";
import Link from "next/link";

export default function Maths_Topics() {
  return <>
    <h1 className="text-3xl md:text-4xl font-bold">Maths Topics</h1>

    <ul className="w-full">
      <div className="gap-2 px-4 md:px-0 mt-4 flex flex-col md:flex-row md:justify-start md:items-start md:flex-wrap items-center place-content-center w-full">
        <Link href="topics/algebra" className="hover:scale-105 rounded-2xl hover:rounded-3xl hover:bg-pink-200 dark:hover:bg-blue-800 transition-all flex w-full p-3 gap-2 md:gap-0 flex-row md:flex-col items-center justify-start md:justify-center text-center md:h-40 md:w-40">
          <Calculator className="size-7 md:size-36" />
          <p className="md:mt-4 text-md transition-all select-none">Algebra</p>
        </Link>
      </div>
    </ul>
  </>
}