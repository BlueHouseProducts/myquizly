"use server";

import { Account, Client, Databases, ID, Models, Permission, Query, Role } from "node-appwrite";

import { dbData, subjectData, subjectType } from "./dbCompData";
import { getUserServerCurrent } from "@/comp/ssr/auth";

type AddOrRemoveSubtopicType = {success: true, type: "created", document: any} | {success: true, type: "destroyed"} | {success: false, error: string}

export async function AddOrRemoveSubtopic(subject: subjectType, topic: string, subtopic: string, exists: boolean): Promise<AddOrRemoveSubtopicType> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  const db = new Databases(client);

  const user = await getUserServerCurrent();

  if (!user) { return {
    success: false,
    error: "An error occured getting current user"
  } }

  const attempted = await db.listDocuments(dbData.users_db.id, dbData.users_db.collections.revision_list, [
    Query.equal("user_id", user.$id),
    Query.equal("subject", subject),
    Query.equal("topic", topic),
    Query.equal("subtopic", subtopic),
  ]);

  if (!subjectData[subject]) {
    return {
      success: false,
      error: `Subject '${subject}' not found`
    }
  }

  if (!subjectData[subject][topic]) {
    return {
      success: false,
      error: `Topic '${topic}' not found`
    }
  }

  if (!subjectData[subject][topic].subtopics.some(item => item.name === subtopic)) {
    return {
      success: false,
      error: `Subtopic '${subtopic}' not found`
    }
  }

  async function create(userid: string) {    
    if (!user) { return }
    
    const d = await db.createDocument(dbData.users_db.id, dbData.users_db.collections.revision_list, ID.unique(), {
      user_id: userid,
      subject: subject,
      topic: topic,
      subtopic: subtopic
    }, [      
      Permission.read(Role.user(user.$id))
    ]);

    return d;
  }

  async function destroy(userid: string) {
    await db.deleteDocuments(dbData.users_db.id, dbData.users_db.collections.revision_list, [
      Query.equal("user_id", userid),
      Query.equal("subject", subject),
      Query.equal("topic", topic),
      Query.equal("subtopic", subtopic),
    ]);
  }

  if (attempted.total === 0 && !exists) {
    const d = await create(user.$id);

    return {
      success: true,
      type: "created",
      document: d
    }
  }

  if (attempted.total >= 1 && exists) {
    await destroy(user.$id);

    return {
      success: true,
      type: "destroyed"
    }
  }

  return {
    success: false,
    error: "Attempted to create/destroy when document existed/did not exist"
  }
}

export async function SubtopicHasItem(subject: string, topic: string, subtopic: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  const db = new Databases(client);

  const user = await getUserServerCurrent();

  if (!user) { return false }

  const attempted = await db.listDocuments(dbData.users_db.id, dbData.users_db.collections.revision_list, [
    Query.equal("user_id", user.$id),
    Query.equal("subject", subject),
    Query.equal("topic", topic),
    Query.equal("subtopic", subtopic),
  ]);

  return attempted.total !== 0;
}
