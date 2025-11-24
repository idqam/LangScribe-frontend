import { Token } from './tokenize';
import { getCefrLevel } from './cefrDictionary';

export interface Features {
    vocab: {
        cefrCounts: Record<string, number>;
        cefrProportions: Record<string, number>;
        pctUnknownWords: number;
        typeTokenRatio: number;
    };
    syntax: {
        avgSentenceLength: number;
        clauseEstimate: number;
        conjunctionRate: number;
    };
    morph: {
        verbTenseVariety: number;
        morphComplexityScore: number;
    };
    cohesion: {
        discourseMarkerCount: number;
    };
}

export const extractFeatures = (tokens: Token[], sentences: string[], lang: 'en' | 'es'): Features => {
    // 1. Vocab Features
    const cefrCounts = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
    let unknownCount = 0;
    const uniqueWords = new Set<string>();

    tokens.forEach(token => {
        const word = token.lemma || token.normal;
        uniqueWords.add(word);
        const level = getCefrLevel(word, lang);
        if (level) {
            cefrCounts[level]++;
        } else {
            // Only count as unknown if it's a word (not punctuation/number)
            if (token.tags.includes('Noun') || token.tags.includes('Verb') || token.tags.includes('Adjective') || token.tags.includes('Adverb')) {
                unknownCount++;
            }
        }
    });

    const totalTokens = tokens.length || 1;
    const cefrProportions = {
        A1: cefrCounts.A1 / totalTokens,
        A2: cefrCounts.A2 / totalTokens,
        B1: cefrCounts.B1 / totalTokens,
        B2: cefrCounts.B2 / totalTokens,
        C1: cefrCounts.C1 / totalTokens,
        C2: cefrCounts.C2 / totalTokens,
    };

    const pctUnknownWords = unknownCount / totalTokens;
    const typeTokenRatio = uniqueWords.size / totalTokens;

    // 2. Syntax Features
    const avgSentenceLength = totalTokens / (sentences.length || 1);

    // Clause estimate: count commas + conjunctions
    let clauseMarkers = 0;
    let conjunctions = 0;
    tokens.forEach(token => {
        if (token.text === ',') clauseMarkers++;
        if (token.tags.includes('Conjunction')) {
            clauseMarkers++;
            conjunctions++;
        }
    });
    const clauseEstimate = clauseMarkers;
    const conjunctionRate = conjunctions / totalTokens;

    // 3. Morphological Features
    const verbTenses = new Set<string>();
    let inflectedForms = 0;

    tokens.forEach(token => {
        if (token.tags.includes('Verb')) {
            // Heuristic for tenses based on tags
            if (token.tags.includes('PastTense')) verbTenses.add('Past');
            if (token.tags.includes('PresentTense')) verbTenses.add('Present');
            if (token.tags.includes('FutureTense')) verbTenses.add('Future');
            if (token.tags.includes('Gerund')) verbTenses.add('Gerund');
            if (token.tags.includes('Participle')) verbTenses.add('Participle');

            // Simple inflection check (length diff between text and normal/lemma)
            if (token.text.length !== token.normal.length) inflectedForms++;
        }
        if (token.tags.includes('Adjective')) {
            // Comparative/Superlative often adds length or changes form
            if (token.tags.includes('Comparative') || token.tags.includes('Superlative')) inflectedForms++;
        }
    });

    const verbTenseVariety = verbTenses.size;
    const morphComplexityScore = inflectedForms / totalTokens;

    // 4. Cohesion Features
    const markersEn = ['however', 'therefore', 'although', 'meanwhile', 'additionally'];
    const markersEs = ['sin embargo', 'por lo tanto', 'aunque', 'además'];
    const markers = lang === 'en' ? markersEn : markersEs;

    let discourseMarkerCount = 0;
    const textLower = tokens.map(t => t.normal).join(' '); // simplified reconstruction for matching

    markers.forEach(marker => {
        if (textLower.includes(marker)) discourseMarkerCount++;
    });

    return {
        vocab: { cefrCounts, cefrProportions, pctUnknownWords, typeTokenRatio },
        syntax: { avgSentenceLength, clauseEstimate, conjunctionRate },
        morph: { verbTenseVariety, morphComplexityScore },
        cohesion: { discourseMarkerCount }
    };
};
