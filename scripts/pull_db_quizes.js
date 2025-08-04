const fs = require("fs");
require("dotenv").config();
const { Client, Databases } = require("node-appwrite");

let databaseId = process.argv[2];
const outputPath = process.argv[3] || "export.json";

const flags = process.argv.slice(2);

if (databaseId === "%default%" || databaseId === "@default@") {
  databaseId = "68358fde0037593b1096"
}

if (!databaseId) {
  console.error(`
Missing databaseId field, use %default% or @default@ to use default id instead
(e.g. npm run pull:quizes %default%)

Usage:
  npm run pull:quizes <DATABASE_ID> [outputPath (export.json)]

Example:
  npm run pull:quizes 64d4a12ab9 export-quizzes.json

Hint:
  Make sure your environment variables for Appwrite are set correctly.
    - NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT
    - NEXT_PUBLIC_APPWRITE_PROJECT_ID
    - API_KEY
`);
  process.exit(1);
}

console.log(`Using database id ${databaseId}\n`);

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.API_KEY);

const databases = new Databases(client);

async function pullQuizzes(databaseId, outputPath) {
  try {
    const collections = await databases.listCollections(databaseId);
    const data = {};

    for (const collection of collections.collections) {
      const documents = await databases.listDocuments(
        databaseId,
        collection.$id,
        [],
        100
      );
      data[collection.$id] = documents.documents;
    }

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("Completed");
  } catch (err) {
    console.error("Errored: ", err.message || err);
  }
}

pullQuizzes(databaseId, outputPath);
