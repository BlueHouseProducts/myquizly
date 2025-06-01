"use server";

import { Client, Databases, Query } from "node-appwrite";
import { dbData, subjectType } from "./dbCompData";

export async function GetQuizesFromTopic(subject: subjectType, topic: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey("standard_612670df39627ea636126ef36913cdef8e809cd2e54720a897b2b9d1e9a7faa655480910e4ee652fa9226a8a1c49ff5c60378bbfc12d65633013c3abc74c08014e9930702a62e14533b79ee50ae33d2becaa82f24d82fa693a37f2f2ed710c01697e12ee38a44bf1478beab431ec9ab2488af014e12ba589d8ab6cdfc40d324c");

  const db = new Databases(client);
  
  const x = await db.listDocuments(dbData.quiz_db.id, dbData.quiz_db.collections[subject], [ 
    Query.equal('topic', topic.toLowerCase())
  ]);

  const re: any[] = [];

  x.documents.forEach(q => {
    re.push({$id: q.$id, name: q.name, topic: q.topic, label: q.label});
  });

  return re;
}

const example_quiz_data = 
[
  {
    "q_id": "1",
    "type": "multiple_choice",
    "multiple_choice": {
      "options": [{
        "o_id": "1",
        "media_type": "text",
        "media": "hello!"
      }],
    },
    "answer": "1"
  }
]

export async function GetQuizData(quiz_id: string, subject: subjectType) {
  function stripAnswers(quizData: any[]) {
    return quizData.map(({ answer, ...rest }: {answer: any}) => rest);
  }
  
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey("standard_612670df39627ea636126ef36913cdef8e809cd2e54720a897b2b9d1e9a7faa655480910e4ee652fa9226a8a1c49ff5c60378bbfc12d65633013c3abc74c08014e9930702a62e14533b79ee50ae33d2becaa82f24d82fa693a37f2f2ed710c01697e12ee38a44bf1478beab431ec9ab2488af014e12ba589d8ab6cdfc40d324c");

  const db = new Databases(client);

  let quiz;
  
  try { 
    quiz = await db.getDocument(dbData.quiz_db.id, dbData.quiz_db.collections[subject], quiz_id);
  } catch (e) {
    return "ERR";
  }

  if (!quiz.quiz_data) {
    return "ERR";
  }

  const json_quiz_data = JSON.parse(quiz.quiz_data);

  if (!json_quiz_data) {
    return "ERR";
  }
  
  return [stripAnswers(json_quiz_data), {name: quiz.name, topic: quiz.topic, id: quiz.$id, created: quiz.$createdAt, label: quiz.label}];
}
