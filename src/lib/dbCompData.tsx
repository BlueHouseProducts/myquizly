import { Calculator, Cpu } from "lucide-react";
import { ReactElement } from "react";

type subjectType = "maths" | "cs" | "science" | "history" | "french" | "english" | "rs" | "music";

const dbData : {quiz_db: {id: string, collections: {[key in subjectType]: string}}} = {
  quiz_db: {
    id: "68358fde0037593b1096",

    collections: {
      maths: "68358ff6000ec3022f90",
      cs: "6836fbb9000f0443a907",
      science: "",
      history: "",
      french: "",
      english: "",
      rs: "",
      music: ""
    }
  }
}


///////////////////// TODO remove `?`
const subjectData: {[key in subjectType]?: {[key: string]: {id: string, name: string, icon: React.ElementType, subtopics: {codes: string[], name: string}[]}}} = {
  cs: {
    systems: {
      name: "Systems Architecture",
      id: "systems",
      icon: Cpu,
      subtopics: [
        {
          codes: ["1.1.1"].map((s) => s.toLowerCase()),
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
          codes: ["a1", "a2", "a3", "a4", "a5", "a6", "a7"].map((s) => s.toLowerCase()),
          name: "Notation, vocabulary and manipulation",
        }
      ]
    },
  },
};


export {dbData, subjectData};
export type {subjectType};
