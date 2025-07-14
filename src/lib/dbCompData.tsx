import { Axe, BookA, Calculator, CircleUser, Cpu, FileWarning, Flag, Globe } from "lucide-react";
import { ReactElement } from "react";

type subjectType = "maths" | "cs" | "history" | "french" | "english" | "rs" | "music" | "biology" | "chemistry" | "physics";

const dbData : {quiz_db: {id: string, collections: {[key in subjectType]: string}}, users_db: {id: string, collections: {[key in "quiz_answers"]: string}}} = {
  quiz_db: {
    id: "68358fde0037593b1096",

    collections: {
      maths: "68358ff6000ec3022f90",
      cs: "6836fbb9000f0443a907",
      history: "6838605c003214655265",
      french: "68386e6800017e81c56a",
      english: "68385d2d000d96fc007f",
      rs: "68387118000f1802d0ad",
      music: "68386f840015553c0b2e",

      chemistry: "68752ce400034041ab16",
      physics: "68752d2a000237a02a78",
      biology: "68752c790024f56bb436"
    }
  },

  users_db: {
    id: "68397faa0004a771ad72",

    collections: {
      quiz_answers: "68397fb0000897fb3503"
    }
  }
}

function setCodes(codes: string[]): string[] {
  return codes.map((s) => s.toLowerCase());
}

const subjectData: {[key in subjectType]: {[key: string]: {id: string, name: string, icon: React.ElementType, subtopics: {codes: string[], name: string}[]}}} = {
  cs: {
    systems: {
      name: "Systems Architecture",
      id: "systems",
      icon: Cpu,
      subtopics: [
        {
          codes: setCodes(["1.1.1"]),
          name: "Architecture of the CPU",
        }
      ]
    }
  },

  maths: {
    algebra: {
      name: "Algebra",
      id: "algebra",
      icon: Calculator,
      subtopics: [
        {
          codes: setCodes(["a1", "a2", "a3", "a4", "a5", "a6", "a7"]),
          name: "Notation, vocabulary and manipulation",
        }
      ]
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
      name: "Cell Biology",
      id: "cellbio",
      icon: FileWarning,
      subtopics: [
        {
          codes: setCodes(["4.1.1.1"]),
          name: "Cell structure"
        }
      ]
    }
  },

  chemistry: {

  },

  physics: {

  },

  english: {
    lang_exploration: {
      name: "Language - Explorations in Creative Reading and Writing",
      id: "lang_exploration",
      icon: Globe,
      subtopics: [
        {
          // PAPER.SECTION
          codes: setCodes(["1.A"]),
          name: "Reading"
        }
      ]
    }
  },

  history: {
    // life in nazi -- pg 49
    crime_and_punishment: {
      name: "Crime and Punishment",
      id: "crime_and_punishment",
      icon: Axe,
      subtopics: [
        {
          codes: setCodes([]),
          name: ""
        }
      ]
    }
  },

  french: {
    theme_identity_culture: {
      name: "Identity and Culture",
      id: "theme_identity_culture",
      icon: BookA,
      subtopics: [
        {
          codes: setCodes([]),
          name: "",
        }
      ]
    }
  },

  music: {
    
  },

  rs: {

  }
};

export const validSubjects: subjectType[] = [
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
];

export const validQuizletTypes: string[] = [
  "web_link",
  "quick_quiz",
  "video",
  "pdf"
];

export {dbData, subjectData};
export type {subjectType};
