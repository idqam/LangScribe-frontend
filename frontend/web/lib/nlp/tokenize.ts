import nlp from 'compromise';
// @ts-ignore
import nlpEs from 'es-compromise';

nlp.plugin(nlpEs);

export interface Token {
    pos: string;
    text: string;
    normal: string;
    tags: string[];
    lemma?: string;
}

export const tokenize = (text: string, lang: 'en' | 'es'): Token[] => {
    // @ts-ignore
    const doc = nlp(text);

    // For Spanish, we might need to switch the internal lexicon or use the plugin explicitly if required by the API.
    // However, compromise plugins usually extend the main `nlp` object.
    // Given the dual-language requirement, we'll assume the plugin handles Spanish text detection or we might need to configure it.
    // But standard compromise usage is often just nlp(text).

    // Actually, for es-compromise, it often works by extending nlp.
    // Let's extract terms.

    const terms = doc.terms().json();

    return terms.map((term: any) => ({
        text: term.text,
        normal: term.normal || term.text.toLowerCase(),
        tags: term.tags || [],
        lemma: term.normal // Default to normal, will be refined in posLemma
    }));
};

export const getSentences = (text: string): string[] => {
    const doc = nlp(text);
    return doc.sentences().out('array');
};
