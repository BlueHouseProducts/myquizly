"use client";

import { subjectData, subjectType } from "@/lib/dbCompData";
import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

function searchSubjects(search: string) {
  const normalizedSearch = search.toLowerCase().trim();

  const matches: {
    subjects: any,
    topics: any,
    subtopics: any
  } = {
    subjects: [],
    topics: [],
    subtopics: [],
  };

  for (const subjectKey in subjectData) {
    const subject = subjectData[subjectKey as subjectType];

    // Match subject key or name (if a name field is ever added)
    if (subjectKey.toLowerCase().includes(normalizedSearch)) {
      matches.subjects.push({
        type: "subject",
        subjectKey,
        displayName: subject.name ?? subjectKey,
        match: subject,
      });
    }

    for (const topicKey in subject) {
      const topic = subject[topicKey];

      const topicName = topic.name ?? topicKey;

      // Match topic key OR topic.name
      if (
        topicKey.toLowerCase().includes(normalizedSearch) ||
        topicName.toLowerCase().includes(normalizedSearch)
      ) {
        matches.topics.push({
          type: "topic",
          subjectKey,
          topicKey,
          displayName: topicName,
          match: topic,
        });
      }

      if (Array.isArray(topic.subtopics)) {
        for (const sub of topic.subtopics) {
          if (
            sub.name &&
            sub.name.toLowerCase().includes(normalizedSearch)
          ) {
            matches.subtopics.push({
              type: "subtopic",
              subjectKey,
              topicKey,
              subtopicName: sub.name,
              displayName: sub.name,
              match: sub,
            });
          }
        }
      }
    }
  }

  return matches;
}

export function SearchClient() {
  const [items, setItems] = useState<{
    subjects: any[],
    topics: any[],
    subtopics: any[]
  } | null>(null);

  
  const form = useForm({
    defaultValues: {
      search: ""
    },
    onSubmit: async ({ value }) => {
      const search = value.search;
      const results = searchSubjects(search);
      setItems(results);
    }

  });

  useEffect(() => {
    form.handleSubmit()
  }, []);

  return <>
    <form onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}>
      <form.Field name="search" children={(field) => (
        <>
          <div className="w-full flex items-center flex-row px-2 gap-1 bg-white">
            <Search className="w-fit h-full dark:text-black" />
            <input
              placeholder="I need to revise..."
              className="flex-1 p-2 dark:text-black/90 dark:placeholder:text-black/60"

              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
          
        </>
      )} />
    </form>

    {items && (
      <div className="p-4 space-y-2">
        {items.subjects.length > 0 && (
          <>
            <div className="font-semibold">Subjects</div>
            <ul>
              {items.subjects.map((item, index) => (
                <li key={`subject-${index}`}>
                  <a
                    href={`/app/${item.subjectKey}/topics`}
                    className="text-blue-600 dark:text-blue-300 hover:underline"
                  >
                    {item.displayName}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {items.topics.length > 0 && (
          <>
            <div className="font-semibold">Topics</div>
            <ul>
              {items.topics.map((item, index) => (
                <li key={`topic-${index}`}>
                  <a
                    href={`/app/${item.subjectKey}/topics/${item.topicKey}`}
                    className="text-blue-600 dark:text-blue-300 hover:underline"
                  >
                    {item.displayName}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {items.subtopics.length > 0 && (
          <>
            <div className="font-semibold">Subtopics</div>
            <ul>
              {items.subtopics.map((item, index) => (
                <li key={`subtopic-${index}`}>
                  <a
                    href={`/app/${item.subjectKey}/topics/${item.topicKey}`}
                    className="text-blue-600 dark:text-blue-300 hover:underline"
                  >
                    {item.displayName}
                  </a>{" "}
                  <span className="text-sm text-gray-700 dark:text-gray-200">(in {item.topicKey})</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )}<p className="text-sm text-gray-700 dark:text-gray-200 mt-2">Only searches for subjects, topics and subtopics. Does not search quizlets.</p>
  </>

}
