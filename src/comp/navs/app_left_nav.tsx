import { motion } from "motion/react";
import Link from "next/link";

export function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center justify-center sm:justify-start gap-3 px-4 py-2 rounded-xl transition-colors duration-200 ${
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

export function AppLeftNav({title, children}: {title: string, children?: React.ReactNode}) {
  return <motion.nav initial={{x: -8}} animate={{x: 0}} className="min-w-32 sm:w-64 bg-pink-200 dark:bg-transparent p-4">
    <ul className="flex flex-col gap-3">
      <h3 className="w-full text-center text-xl border-b-[1px] border-b-black dark:border-b-white pb-2">{title}</h3>
      
      {children}
    </ul>
  </motion.nav>
}

export function AppLeftContents({children}: {children: React.ReactNode}) {
  return <motion.div initial={{scale: 0.99, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 0.3, easings: ["easeInOut"], delay: 0.2}} className="pt-4 flex-1 pl-4 bg-pink-100 dark:bg-blue-950 rounded-tl-[8px]">
    {children}
  </motion.div>
}
