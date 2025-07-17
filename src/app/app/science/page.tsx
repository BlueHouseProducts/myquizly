import { TopicItem, TopicList } from "@/comp/subjects/topics_items";
import { Atom, Dog, FlaskConical } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return <>
    <h2 className="text-3xl md:text-4xl">Science</h2>

    <TopicList>
      <TopicItem Title="Biology" Url="../../app/biology" ImageLogo={Dog} Badge="0%" />
      <TopicItem Title="Physics" Url="../../app/physics" ImageLogo={Atom} Badge="0%" />
      <TopicItem Title="Chemistry" Url="../../app/chemistry" ImageLogo={FlaskConical} Badge="0%" />
    </TopicList>
  </>
}