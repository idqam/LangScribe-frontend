// import { Features } from "./features";
// import { GrammarError } from "./grammarRules";

// export interface ScoreResult {
//   cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
//   score: number;
//   subscores: {
//     vocab: number;
//     syntax: number;
//     morph: number;
//     grammar: number;
//   };
// }

// export const calculateScore = (
//   features: Features,
//   errors: GrammarError[],
//   totalTokens: number
// ): ScoreResult => {
//   // 1. Vocab Score (0-1)
//   // Weighted average of CEFR proportions
//   const { cefrProportions, typeTokenRatio } = features.vocab;

//   // Weights for each level
//   const levelWeights = { A1: 0.1, A2: 0.2, B1: 0.4, B2: 0.6, C1: 0.8, C2: 1.0 };

//   let vocabWeightedSum =
//     cefrProportions.A1 * levelWeights.A1 +
//     cefrProportions.A2 * levelWeights.A2 +
//     cefrProportions.B1 * levelWeights.B1 +
//     cefrProportions.B2 * levelWeights.B2 +
//     cefrProportions.C1 * levelWeights.C1 +
//     cefrProportions.C2 * levelWeights.C2;

//   // Boost for type-token ratio (diversity)
//   const vocabScore = Math.min(1, vocabWeightedSum + typeTokenRatio * 0.2);

//   // 2. Syntax Score (0-1)
//   // Based on sentence length and complexity
//   const { avgSentenceLength, conjunctionRate } = features.syntax;

//   // Normalize avg sentence length (assume 20 words is max complexity ~ 1.0)
//   const lenScore = Math.min(1, avgSentenceLength / 20);
//   // Normalize conjunction rate (assume 0.1 is high ~ 1.0)
//   const conjScore = Math.min(1, conjunctionRate / 0.1);

//   const syntaxScore = lenScore * 0.6 + conjScore * 0.4;

//   // 3. Morph Score (0-1)
//   const { verbTenseVariety, morphComplexityScore } = features.morph;

//   // Normalize tense variety (assume 4 tenses is max ~ 1.0)
//   const tenseScore = Math.min(1, verbTenseVariety / 4);
//   // Normalize morph complexity (assume 0.3 is high ~ 1.0)
//   const morphScoreRaw = Math.min(1, morphComplexityScore / 0.3);

//   const morphScore = tenseScore * 0.5 + morphScoreRaw * 0.5;

//   // 4. Grammar Score (0-1)
//   // 1 - error rate
//   const errorRate = errors.length / (totalTokens || 1);
//   const grammarScore = Math.max(0, 1 - errorRate * 5); // Penalize errors heavily

//   // 5. Final Weighted Score
//   // score = 0.4 * vocab + 0.3 * syntax + 0.2 * morph + 0.1 * grammar
//   const finalScore =
//     0.4 * vocabScore +
//     0.3 * syntaxScore +
//     0.2 * morphScore +
//     0.1 * grammarScore;

//   // Map to CEFR Level
//   let cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" = "A1";

//   if (finalScore >= 0.8) cefrLevel = "C2";
//   else if (finalScore >= 0.65) cefrLevel = "C1";
//   else if (finalScore >= 0.5) cefrLevel = "B2";
//   else if (finalScore >= 0.35) cefrLevel = "B1";
//   else if (finalScore >= 0.2) cefrLevel = "A2";
//   else cefrLevel = "A1";

//   return {
//     cefrLevel,
//     score: finalScore,
//     subscores: {
//       vocab: vocabScore,
//       syntax: syntaxScore,
//       morph: morphScore,
//       grammar: grammarScore,
//     },
//   };
// };
