import cefrEn from '@/app/data/cefr_en.json';
import cefrEs from '@/app/data/cefr_es.json';

type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type CefrDictionary = Record<CefrLevel, string[]>;

const dictEn: CefrDictionary = cefrEn as CefrDictionary;
const dictEs: CefrDictionary = cefrEs as CefrDictionary;

export const getCefrLevel = (word: string, lang: 'en' | 'es'): CefrLevel | null => {
    const dict = lang === 'en' ? dictEn : dictEs;
    const normalized = word.toLowerCase();

    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CefrLevel[]) {
        if (dict[level].includes(normalized)) {
            return level;
        }
    }

    return null;
};
