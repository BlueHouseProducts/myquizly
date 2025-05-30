import { TopicError, TopicPage } from "@/comp/subjects/subtopic_items";
import ListTablePage from "@/comp/topic_list/list_table_page";
import { subjectData } from "@/lib/dbCompData";

const topics = subjectData.english;
const subject = "English"
const s = "english"

export default async function CSTopicPage({params} : {params: Promise<{topic: string}>}) {
  const topic_given = (await params).topic;

  if (!topics) {
    return <TopicError error="An error occured." topic={topic_given} />
  }

  const topic = topics[topic_given];

  if (!topic) {
    return <TopicError error="We don't think that topic exists!" topic={topic_given} />
  }
  
  return <TopicPage topic={topic.name} suject_full_name={subject}>
    <ListTablePage subject={s} name={topic.id} subtopics={topic.subtopics} />
  </TopicPage>
}
