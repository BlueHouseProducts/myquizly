import { AppTopNavbar } from "@/comp/navs/app_top_nav";
import Link from "next/link";

export default function AccountPage() {
  return <div>

    <AppTopNavbar enabled_item="account" />
    
    <main className="flex mt-4 flex-row gap-4 pl-4 sm:pl-6 lg:pl-8">
      <nav className="border-r-white border-r-[1px] pr-4 hidden lg:block">
        <ul className="flex flex-col">
          <li className="w-full mb-2">
            <Link className="text-3xl" href="/dashboard/">Settings</Link>
          </li>

          <li className="w-full mb-2 flex justify-end">
            <Link className="text-xl text-end underline" href="/dashboard/">Account</Link>
          </li>
        </ul>
      </nav>

      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
      </div>
    </main>
  </div>
}