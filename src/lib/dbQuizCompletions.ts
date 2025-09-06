"use server";

import { Client, Databases, ID, Models, Permission, Query, Role, Users } from "node-appwrite";
import { dbData, subjectType } from "./dbCompData";
import { UserAdmin } from "./dbQuiz";
import { getUserServerCurrent } from "@/comp/ssr/auth";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.API_KEY!);

const db = new Databases(client);
const users = new Users(client);


async function doesUserExist(userId: string):  Promise<[true, Models.User<Models.Preferences>] | [false]> {
  try {
    const user = await users.get(userId);
    return [true, user]; // User exists
  } catch (error: any) {
    if (error.code === 404) {
      return [false]; // User not found
    }
    console.error("Error checking user existence:", error);
    throw error; // Other errors (e.g. auth issues)
  }
}

async function doesQuizExist(quizId: string, subject: subjectType) {
  try {
    const quiz = await db.getDocument(dbData.quiz_db.id, dbData.quiz_db.collections[subject], quizId);
    return !!quiz; // Returns true if quiz exists
  } catch (error: any) {
    if (error.code === 404) {
      return false; // Quiz not found
    }
    console.error("Error checking quiz existence:", error);
    throw error; // Other errors (e.g. auth issues)
  }
}

export async function createUserCompletion(userId: string, quizId: string, subject: subjectType, score: number) {
  
  // check if userId and quizId are valid
  if (!userId || !quizId) {
    return {
      error: "Invalid userId or quizId"
    }
  }

  // check if user exists
  try {
    const userExists = await doesUserExist(userId);
    if (!userExists[0]) {
      return {
        error: "User does not exist"
      }
    }

    const loggedUser = await getUserServerCurrent();

    if (!loggedUser) {
      return {
        error: "Invalid userId or quizId"
      }
    }

    if (loggedUser.$id !== userExists[1].$id) {
      return {
        error: "Invalid userId or quizId"
      }
    }

    const quizExists = await doesQuizExist(quizId, subject);
    if (!quizExists) {
      return {
        error: "Quiz does not exist"
      }
    }
  } catch (error) {
    return {
      error: "Error verifying ids given"
    }
  }

  if (score < 0 || score > 100) {
    return {
      error: "Score must be between 0 and 100"
    }
  }

  // check score is int
  if (!Number.isInteger(score)) {
    return {
      error: "Score must be an integer"
    }
  }

  const date = new Date();

  // check date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return {
      error: "Invalid date"
    }
  }

  try {
    const completion = {
      user_id: userId,
      quiz_id: quizId,
      score: score,
      date: date.toISOString()
    };

    const d = await db.createDocument(
      dbData.users_db.id,
      dbData.users_db.collections.quiz_answers,
      ID.unique(),
      completion,
      [
        Permission.read(Role.user(userId))
      ]
    );

    if (d) {
      return {
        documentId: d.$id,
      }
    } else {
      return {
        error: "Failed to recieve document"
      }
    }

  } catch (error) {
    console.error("Error creating user completion:", error);
    return {
      error: "Failed to create user completion"
    }
  }

}

export async function getConsoleUrlForQuizlet(quizId: string, subject: subjectType) {
  if (!UserAdmin()) {
    return "";
  }
  
  return process.env.APP_CONSOLE! + `databases/database-${dbData.quiz_db.id}/collection-${dbData.quiz_db.collections[subject]}/document-${quizId}`
}
