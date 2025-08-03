require('dotenv').config();
const fs = require('fs');
const { Client, Databases, ID } = require('node-appwrite');

const databaseId = process.argv[2];
const outputPath = process.argv[3] || 'export.json';

if (!databaseId) {
    console.error(`
Missing databaseId field

Usage:
  npm run push:quizes <DATABASE_ID> [inputPath (export.json)]

Example:
  npm run push:quizes 64d4a12ab9 export-quizzes.json

Hint:
  Make sure your environment variables for Appwrite are set correctly.
    - NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT
    - NEXT_PUBLIC_APPWRITE_PROJECT_ID
    - API_KEY
`);
    process.exit(1);
}

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.API_KEY);

const databases = new Databases(client);

async function pushQuizes(databaseId, inputPath = 'export.json') {
    try {
        const rawData = fs.readFileSync(inputPath);
        const data = JSON.parse(rawData);

        for (const [collectionId, documents] of Object.entries(data)) {
            for (const doc of documents) {
                const { $id, $databaseId, $collectionId, ...payload } = doc;

                try {
                    await databases.createDocument(databaseId, $collectionId, ID.custom($id), payload);
                    console.log(`Imported document ${$id} into collection ${collectionId}`);
                } catch (err) {
                    console.error(`Failed to import document ${$id}:`, err.message);
                }
            }
        }

        console.log('Import complete.');
    } catch (err) {
        console.error('Error importing documents:', err);
    }
}

pushQuizes(databaseId, outputPath);
