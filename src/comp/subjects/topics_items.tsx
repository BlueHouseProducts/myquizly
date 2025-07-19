import Link from "next/link";
import React from "react";

export function TopicItem({ImageLogo, Title, Url, Badge}: {ImageLogo: any, Title: string, Url: string, Badge?: string}) {
  return <Link href={`topics/${Url}`} className="active:bg-black/10 active:dark:bg-white/10 md:hover:scale-105 rounded-2xl md:hover:rounded-3xl md:hover:bg-pink-200 md:dark:hover:bg-blue-800 transition-all flex w-full p-3 gap-2 md:gap-0 flex-row md:flex-col items-center justify-start md:justify-center text-center md:h-40 md:w-40">
    <div className="hidden md:flex flex-row-reverse items-start w-full"><p className="items-end px-2 bg-pink-400 text-black rounded-full">{Badge}</p></div>
    <ImageLogo size={20} className="size-7 md:size-36 text-black dark:text-white" />
    <p className="md:mt-4 text-md transition-all select-none text-black dark:text-white">{Title}</p>
  </Link>
}

export function TopicList({children}: {children: React.ReactNode}) {
  return <div className="gap-2 px-4 md:px-0 mt-4 flex flex-col md:flex-row md:justify-start md:items-start md:flex-wrap items-center place-content-center w-full">
    {children}
  </div>
}

export function AutoTopicItems({topics}: {topics: {
  [key: string]: {
    id: string;
    name: string;
    icon: React.ElementType;
    subtopics: {
        codes: string[];
        name: string;
    }[];
};
}}) {

  const keys = Object.keys(topics);

  return <>
    {keys.map((key: string) => {
      const i = topics[key];

      return <TopicItem key={i.id} Title={i.name} Url={i.id} ImageLogo={i.icon} />
    })}
  </>
}
