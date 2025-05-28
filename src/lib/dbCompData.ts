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

const subjectData = {
  cs: {
    systems: [
      {
        codes: ["1.1.1"].map((s) => s.toLowerCase()),
        name: "Architecture of the CPU",
      }
    ]
  },

  maths: {
    algebra: [
      {
        codes: ["a1", "a2", "a3", "a4", "a5", "a6", "a7"].map((s) => s.toLowerCase()),
        name: "Notation, vocabulary and manipulation",
      }
    ],
  }
}

export {dbData, subjectData};
export type {subjectType};
