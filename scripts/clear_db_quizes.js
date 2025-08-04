const readline = require('readline');
require('dotenv').config();

const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.API_KEY);

const databases = new Databases(client);
let databaseId = process.argv[2];

if (databaseId === "$default$" || databaseId === "@default@") {
  databaseId = "68358fde0037593b1096"
}

if (!databaseId) {
    console.error(`
Missing databaseId field, use %default% or @default@ to use default id instead
(e.g. npm run clear:quizes %default%)

Usage:
  npm run clear:quizes <DATABASE_ID>

Example:
  npm run clear:quizes 64d4a12ab9

Hint:
  Make sure your environment variables for Appwrite are set correctly.
    - NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT
    - NEXT_PUBLIC_APPWRITE_PROJECT_ID
    - API_KEY
`);
    process.exit(1);
}

console.log(`Using database id ${databaseId}\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const deleteAllDocuments = async () => {
  try {
    // Step 1: Get all collections in the database
    const collections = await databases.listCollections(databaseId);

    for (const collection of collections.collections) {
      const collectionId = collection.$id;
      console.log(`Processing collection: ${collectionId}`);

      // Step 2: Get all documents in the collection (with pagination if needed)
      let documents = [];
      let offset = 0;
      const limit = 100;

      while (true) {
        const result = await databases.listDocuments(databaseId, collectionId, [ 
          // Optional: add filters, limits, etc.
        ]);
        if (result.documents.length === 0) break;

        documents = documents.concat(result.documents);
        if (result.documents.length < limit) break;
        offset += limit;
      }

      // Step 3: Delete each document
      for (const doc of documents) {
        await databases.deleteDocument(databaseId, collectionId, doc.$id);
        console.log(`Deleted document ${doc.$id} from ${collectionId}`);
      }
    }

    console.log('All documents deleted.');
  } catch (err) {
    console.error('Error deleting documents: ', err.message || err);
  }
};


rl.question('Do you want to continue? (y/N): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    console.log('Deleting documents...');
    rl.close();
    deleteAllDocuments();
  } else {
    console.log('Aborted.');
    rl.close();
    process.exit(0);
  }
});
