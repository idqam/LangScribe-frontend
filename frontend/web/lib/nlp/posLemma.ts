import nlp from 'compromise';
// @ts-ignore
import nlpEs from 'es-compromise';
import { Token } from './tokenize';

nlp.plugin(nlpEs);

export const enrichTokens = (tokens: Token[], lang: 'en' | 'es'): Token[] => {
    // Since we already have tokens from compromise in tokenize.ts, 
    // we can just return them or refine them if we re-process.
    // But to keep it simple and consistent, we'll re-process the text if needed, 
    // or just trust the tags we got.

    // However, for lemmatization, compromise does a decent job.
    // Let's refine the lemma if possible.

    // In a real scenario, we might want to use the 'compute' method for root forms.

    // For this implementation, we will assume the tokens passed in are already reasonably tagged.
    // We can add specific logic here if we need to manually fix some tags based on lang.

    return tokens.map(token => {
        let lemma = token.normal;

        // Simple heuristic for lemmas if compromise didn't give a root (it usually gives 'normal')
        // For verbs, we might want the infinitive. 
        // Compromise 'normal' is often the root, but let's stick with it for now.

        return {
            ...token,
            lemma
        };
    });
};

export const getPosTags = (text: string, lang: 'en' | 'es') => {
    const doc = nlp(text);
    if (lang === 'es') {
        // ensure spanish plugin is active/used if needed
    }
    doc.compute('root'); // Compute root forms/lemmas
    return doc.json();
};
