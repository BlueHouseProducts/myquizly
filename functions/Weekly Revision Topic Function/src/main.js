import { Client, Databases, ID, Permission, Role, Users } from 'node-appwrite';
//import { validSubjects, subjectData } from "../../../src/lib/dbCompData";

const subjectData = {
  cs: {
    systems: {
      
    }
  },

  maths: {
    algebra: {
      
    },
  },

  //science: {
  //  bio_cell: {
  //    name: "Bio - Cell Biology",
  //    id: "bio_cell",
  //    icon: CircleUser,
  //    subtopics: [
  //      {
  //        codes: setCodes(["4.1.1.1"]),
  //        name: "Cell structure"
  //      }
  //    ]
  //  }
  //},

  biology: {
    cellbio: {
      
    }
  },

  chemistry: {

  },

  physics: {

  },

  english: {
    lang_exploration: {
      
    }
  },

  history: {
    // life in nazi -- pg 49
    crime_and_punishment: {
      
    }
  },

  french: {
    theme_identity_culture: {
      
    }
  },

  music: {
    
  },

  rs: {

  }
}; // REMEMBER ALSO UPDATE FUNCTIONS

const validSubjects = [
  "maths",
  "cs",
  "history",
  "french",
  "english",
  "rs",
  "music",

  "biology",
  "chemistry",
  "physics"
]; // REMEMBER ALSO UPDATE FUNCTIONS

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  if (req.path !== "/") {
    return res.empty();
  }

  const client = new Client()
    .setEndpoint("http://host.docker.internal/v1")
  //? "http://appwrite/v1" : process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  //log("k: " + req.headers['x-appwrite-key']); // correct
  //log("ep: " + process.env.APPWRITE_FUNCTION_API_ENDPOINT); // correct http://localhost/v1

  const databases = new Databases(client);

  let docs;

  const validSubjectsItem = validSubjects[Math.floor(Math.random() * validSubjects.length)];
  const subItems = Object.keys(subjectData[validSubjectsItem]);
  let subItemsItem = subItems[Math.floor(Math.random() * subItems.length)];

  if (subItemsItem === "") {
    subItemsItem = "empty";
  }

  log(validSubjectsItem);
  log(subItems);
  log(subItemsItem)

  try {
    docs = await databases.listDocuments("68358fde0037593b1096", "6877caed00204de1c72f")
  } catch (e) {
    error("Failed listing documents");
    error(e.message);
    return res.json({
      success: false
    });
  }

  if (docs.total === 0) {
    try { await databases.createDocument("68358fde0037593b1096", "6877caed00204de1c72f", ID.unique(), {
        subjectName: validSubjectsItem,
        topicName: subItemsItem
      }, [
        Permission.read(Role.users())
      ]) }
    catch (e) {
      error("Failed creating new document");
      error(e.message);
      return res.json({
        success: false
      });
    }
  } else {
    const doc = docs.documents[0];

    try {
      await databases.updateDocument("68358fde0037593b1096", "6877caed00204de1c72f", doc.$id, {
        subjectName: validSubjectsItem,
        topicName: subItemsItem
      })
    } catch (e) {
      error("Failed updating document");
      error(e.message);
      return res.json({
        success: false
      });
    }
  }

  return res.json({
    success: true
  });
};
