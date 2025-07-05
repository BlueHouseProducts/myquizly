import { TopicError, TopicPage } from "@/comp/subjects/subtopic_items";
import ListTablePage from "@/comp/topic_list/list_table_page";
import { subjectData, subjectType } from "@/lib/dbCompData";
import { validateSubjectOrRedirect } from "@/lib/utils";

export default async function MathsTopicPage({params} : {params: Promise<{topic: string, subject: string}>}) {
  const subject = validateSubjectOrRedirect((await params).subject);
  const topics = subjectData[subject as subjectType];
  
  const topic_given = (await params).topic;

  if (!topics) {
    return <TopicError error="An error occured." topic={topic_given} />
  }

  const topic = topics[topic_given];

  if (!topic) {
    return <TopicError error="We don't think that topic exists!" topic={topic_given} />
  }
  
  return <TopicPage topic={topic.name} suject_full_name={subject}>
    <ListTablePage subject={subject as subjectType} name={topic.id} subtopics={topic.subtopics} />
  </TopicPage>
}
