import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateSRS, getInitialCardState, SRSResult } from '@/lib/srs/srsAlgorithm';

export interface Flashcard {
    id: string;
    word: string;
    contextSentence: string;
    translation?: string;
    definition?: string;
    pos?: string;
    language: string;

    // SRS State
    interval: number;
    ease: number;
    repetitions: number;
    dueDate: number;

    createdAt: number;
}

interface VocabStore {
    cards: Flashcard[];

    addCard: (word: string, contextSentence: string, language: string, pos?: string) => void;
    submitReview: (cardId: string, quality: number) => void;
    getDueCards: () => Flashcard[];
    deleteCard: (cardId: string) => void;
}

export const useVocabStore = create<VocabStore>()(
    persist(
        (set, get) => ({
            cards: [],

            addCard: (word, contextSentence, language, pos) => {
                const { cards } = get();

                // Avoid duplicates
                if (cards.some(c => c.word.toLowerCase() === word.toLowerCase() && c.language === language)) {
                    return;
                }

                const initialState = getInitialCardState();

                const newCard: Flashcard = {
                    id: crypto.randomUUID(),
                    word,
                    contextSentence,
                    language,
                    pos,
                    ...initialState,
                    createdAt: Date.now()
                };

                set({ cards: [...cards, newCard] });
            },

            submitReview: (cardId, quality) => {
                const { cards } = get();
                const cardIndex = cards.findIndex(c => c.id === cardId);

                if (cardIndex === -1) return;

                const card = cards[cardIndex];
                const result = calculateSRS(quality, card.interval, card.ease, card.repetitions);

                const updatedCard = {
                    ...card,
                    ...result
                };

                const newCards = [...cards];
                newCards[cardIndex] = updatedCard;

                set({ cards: newCards });
            },

            getDueCards: () => {
                const { cards } = get();
                const now = Date.now();
                return cards.filter(c => c.dueDate <= now).sort((a, b) => a.dueDate - b.dueDate);
            },

            deleteCard: (cardId) => {
                set(state => ({
                    cards: state.cards.filter(c => c.id !== cardId)
                }));
            }
        }),
        {
            name: 'langscribe-vocab-store'
        }
    )
);
