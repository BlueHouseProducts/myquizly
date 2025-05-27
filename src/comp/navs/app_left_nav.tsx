import Link from "next/link";

export function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors duration-200 ${
          active
            ? "bg-pink-200 text-black font-semibold shadow-inner shadow-pink-300 dark:shadow-blue-500 dark:bg-blue-800 dark:text-white"
            : "hover:bg-blue-100 text-blue-950 dark:hover:bg-blue-950 dark:text-blue-300"
        }`}
      >
        {icon}
        <span className="hidden sm:inline-block">{label}</span>
      </Link>
    </li>
  );
}