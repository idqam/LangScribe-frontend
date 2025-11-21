import english from "../constants/englishPrompts.json";
import spanish from "../constants/spanishPrompts.json";

const promptsData = {
  languages: {
    en: {
      name: "English",
      categories: english.categories,
    },
    es: {
      name: "Spanish",
      categories: spanish.categories,
    },
  },
};

export default promptsData;
