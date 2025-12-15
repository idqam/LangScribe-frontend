// export interface GrammarError {
//   rule: string;
//   message: string;
//   match: string;
// }

// export const checkGrammar = (
//   tokens: Token[],
//   text: string,
//   lang: "en" | "es"
// ): GrammarError[] => {
//   const errors: GrammarError[] = [];

//   // 1. Double spaces
//   if (/\s{2,}/.test(text)) {
//     errors.push({
//       rule: "double_space",
//       message: "Avoid double spaces",
//       match: "  ",
//     });
//   }

//   // 2. Repeated words
//   const words = tokens.map((t) => t.normal);
//   for (let i = 0; i < words.length - 1; i++) {
//     if (words[i] === words[i + 1] && /^[a-z]+$/.test(words[i])) {
//       errors.push({
//         rule: "repeated_word",
//         message: `Repeated word: ${words[i]}`,
//         match: `${words[i]} ${words[i + 1]}`,
//       });
//     }
//   }

//   if (lang === "en") {
//     // English Rules

//     // Incorrect infinitive "to + V-ed"
//     for (let i = 0; i < tokens.length - 1; i++) {
//       if (
//         tokens[i].normal === "to" &&
//         tokens[i + 1].tags.includes("PastTense")
//       ) {
//         errors.push({
//           rule: "incorrect_infinitive",
//           message: "Incorrect infinitive form (to + past)",
//           match: `${tokens[i].text} ${tokens[i + 1].text}`,
//         });
//       }
//     }

//     // Missing third-person -s (heuristic: "he go")
//     for (let i = 0; i < tokens.length - 1; i++) {
//       if (
//         ["he", "she", "it"].includes(tokens[i].normal) &&
//         tokens[i + 1].tags.includes("PresentTense") &&
//         !tokens[i + 1].text.endsWith("s") &&
//         ![
//           "is",
//           "has",
//           "was",
//           "does",
//           "can",
//           "will",
//           "should",
//           "could",
//           "would",
//           "may",
//           "might",
//           "must",
//         ].includes(tokens[i + 1].normal)
//       ) {
//         // Very rough heuristic, false positives possible
//         errors.push({
//           rule: "missing_third_person_s",
//           message: "Possible missing third-person -s",
//           match: `${tokens[i].text} ${tokens[i + 1].text}`,
//         });
//       }
//     }

//     // Subject-verb number mismatch (heuristic: "he are")
//     for (let i = 0; i < tokens.length - 1; i++) {
//       if (
//         ["he", "she", "it"].includes(tokens[i].normal) &&
//         tokens[i + 1].normal === "are"
//       ) {
//         errors.push({
//           rule: "subject_verb_mismatch",
//           message: "Subject-verb mismatch",
//           match: `${tokens[i].text} ${tokens[i + 1].text}`,
//         });
//       }
//     }
//   } else {
//     // Spanish Rules

//     // Gender agreement: article + noun mismatch (very basic check)
//     for (let i = 0; i < tokens.length - 1; i++) {
//       const t1 = tokens[i];
//       const t2 = tokens[i + 1];

//       if (t1.tags.includes("Determiner") && t2.tags.includes("Noun")) {
//         const isFem1 =
//           t1.normal.endsWith("a") ||
//           t1.normal === "la" ||
//           t1.normal === "las" ||
//           t1.normal === "una" ||
//           t1.normal === "unas";
//         const isMasc1 =
//           t1.normal.endsWith("o") ||
//           t1.normal === "el" ||
//           t1.normal === "los" ||
//           t1.normal === "un" ||
//           t1.normal === "unos";

//         const isFem2 =
//           t2.normal.endsWith("a") ||
//           t2.normal.endsWith("as") ||
//           t2.normal.endsWith("ción") ||
//           t2.normal.endsWith("dad");
//         const isMasc2 = t2.normal.endsWith("o") || t2.normal.endsWith("os");

//         if ((isFem1 && isMasc2) || (isMasc1 && isFem2)) {
//           // High chance of mismatch, but many exceptions exist
//           // Only flag obvious ones
//           errors.push({
//             rule: "gender_mismatch",
//             message: "Possible gender mismatch",
//             match: `${t1.text} ${t2.text}`,
//           });
//         }
//       }
//     }

//     // Common accent errors (past tense)
//     // Heuristic: words ending in 'o' that look like verbs but might need 'ó'
//     // This is hard without a full dictionary, skipping for now to avoid noise.

//     // Missing question marks
//     if (
//       ["qué", "quién", "cómo", "cuándo", "dónde", "por qué"].some((w) =>
//         text.toLowerCase().includes(w)
//       ) &&
//       !text.includes("¿")
//     ) {
//       errors.push({
//         rule: "missing_opening_question",
//         message: "Missing opening question mark (¿)",
//         match: "?",
//       });
//     }
//   }

//   return errors;
// };
