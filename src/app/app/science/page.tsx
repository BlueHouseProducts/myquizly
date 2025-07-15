import Link from "next/link";

export default function Page() {
  return <>
    <h2 className="text-3xl">Science</h2>

    <div className="mt-2 flex flex-row gap-6">
      <Link className="text-lg underline" href="/app/biology/topics">Biology</Link>
      <Link className="text-lg underline" href="/app/physics/topics">Physics</Link>
      <Link className="text-lg underline" href="/app/chemistry/topics">Chemistry</Link>
    </div>
  </>
}