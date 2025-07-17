import { TopicItem, TopicList } from "@/comp/subjects/topics_items";
import { Book, BookType, Calculator, Cpu, Music, Sparkle, Sword, TestTube } from "lucide-react";

export default function DashboardSubjects() {
  return <div>
    <h1 className="text-3xl md:text-4xl font-bold">Subjects</h1>
    
    <TopicList>
      <TopicItem Title="Maths" Url="../../maths/topics/" ImageLogo={Calculator} Badge="0%" />
      <TopicItem Title="CS" Url="../../cs/topics/" ImageLogo={Cpu} Badge="0%" />
      <TopicItem Title="Science" Url="../../science/" ImageLogo={TestTube} Badge="0%" />
      <TopicItem Title="English" Url="../../english/topics/" ImageLogo={Book} Badge="0%" />
      <TopicItem Title="History" Url="../../history/topics/" ImageLogo={Sword} Badge="0%" />
      <TopicItem Title="French" Url="../../french/topics/" ImageLogo={BookType} Badge="0%" />
      <TopicItem Title="Music" Url="../../music/topics/" ImageLogo={Music} Badge="0%" />
      <TopicItem Title="RS" Url="../../rs/topics/" ImageLogo={Sparkle} Badge="0%" />
    </TopicList>
  </div>
}