import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Entry {
    id: string;
    timestamp: number;
    text: string;
    analysis: any; // Using 'any' for now to match the complex analysis result object
}

interface PersistenceState {
    entries: Entry[];
    addEntry: (entry: Entry) => void;
    getEntries: () => Entry[];
    clearEntries: () => void;
}

export const usePersistenceStore = create<PersistenceState>()(
    persist(
        (set, get) => ({
            entries: [],
            addEntry: (entry) => set((state) => ({ entries: [entry, ...state.entries] })),
            getEntries: () => get().entries,
            clearEntries: () => set({ entries: [] }),
        }),
        {
            name: 'langscribe-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
