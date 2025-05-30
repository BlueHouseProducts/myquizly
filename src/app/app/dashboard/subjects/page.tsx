import { TopicItem, TopicList } from "@/comp/subjects/topics_items";
import { Book, Calculator, Cpu, Music, Sparkle, Sword, TestTube } from "lucide-react";

export default function DashboardSubjects() {
  return <div>
    <h1 className="text-3xl md:text-4xl font-bold">Subjects</h1>
    
    <TopicList>
      <TopicItem Title="Maths" Url="../../maths" ImageLogo={Calculator} Badge="0%" />
      <TopicItem Title="CS" Url="../../cs" ImageLogo={Cpu} Badge="0%" />
      <TopicItem Title="Science" Url="../../science" ImageLogo={TestTube} Badge="0%" />
      <TopicItem Title="English" Url="../../english" ImageLogo={Book} Badge="0%" />
      <TopicItem Title="History" Url="../../history" ImageLogo={Sword} Badge="0%" />
      <TopicItem Title="Music" Url="../../music" ImageLogo={Music} Badge="0%" />
      <TopicItem Title="RS" Url="../../rs" ImageLogo={Sparkle} Badge="0%" />
    </TopicList>
  </div>
}