import { create } from 'zustand';

interface TempAnState {
    savedText: string;
    analysisResult: any | null;
    setSavedText: (text: string) => void;
    setAnalysisResult: (result: any) => void;
    reset: () => void;
}

export const useTempAnStore = create<TempAnState>((set) => ({
    savedText: '',
    analysisResult: null,
    setSavedText: (text) => set({ savedText: text }),
    setAnalysisResult: (result) => set({ analysisResult: result }),
    reset: () => set({ savedText: '', analysisResult: null }),
}));
