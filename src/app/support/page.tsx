import Link from "next/link";

export default function Support() {
  return <div className="w-screen h-screen overflow-hidden flex flex-col gap-4 items-center justify-center">
    <h2 className="text-5xl">Support</h2>
    <p className="text-2xl">Support isn't finished - check back soon.</p>

    <Link href="/" className="underline mt-6 text-lg">Back to app</Link>
  </div>
}