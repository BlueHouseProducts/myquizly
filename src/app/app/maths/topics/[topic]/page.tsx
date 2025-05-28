import { TopicPage } from "@/comp/subjects/subtopic_items";
import ListTablePage from "@/comp/topic_list/list_table_page";
import { subjectData } from "@/lib/dbCompData";

const topics: {[key: string]: { codes: string[], name: string }[]} = subjectData.maths;

export default async function MathsTopicPage({params} : {params: Promise<{topic: string}>}) {
  const topic = (await params).topic;
  
  return <TopicPage topic_={topic} topics={topics}>
    <ListTablePage exam_board="edexcel" subject="maths" name={topic} subtopics={topics[topic.toLowerCase()]} />
  </TopicPage>

}
