// import { detectLanguage } from "./languageDetect";

// import { extractFeatures } from "./features";
// import { checkGrammar } from "./grammarRules";
// import { calculateScore } from "./scoring";

// export const analyzeText = (text: string) => {
//   // 1. Language Detection
//   const lang = detectLanguage(text);

//   // 2. Tokenization & Sentences
// //   const rawTokens = tokenize(text, lang);
// //   const sentences = getSentences(text);

//   // 3. POS & Lemma
//   const tokens = enrichTokens(rawTokens, lang);

//   // 4. Feature Extraction
//   const features = extractFeatures(tokens, sentences, lang);

//   // 5. Grammar Check
//   const grammarErrors = checkGrammar(tokens, text, lang);

//   // 6. Scoring
//   const scoreResult = calculateScore(features, grammarErrors, tokens.length);

//   return {
//     lang,
//     tokens,
//     sentences,
//     features,
//     grammarErrors,
//     ...scoreResult,
//   };
// };
