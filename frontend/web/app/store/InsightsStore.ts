import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AIInsight {
    feedback: string;
    grammarSuggestions: string[];
    vocabularyInsights: string[];
    learningRecommendations: string[];
    timestamp: number;
}

interface InsightsState {
    currentInsight: AIInsight | null;
    isLoading: boolean;
    error: string | null;

    setInsight: (insight: AIInsight) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useInsightsStore = create<InsightsState>()(
    persist(
        (set) => ({
            currentInsight: null,
            isLoading: false,
            error: null,

            setInsight: (insight) => set({ currentInsight: insight, isLoading: false, error: null }),
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error, isLoading: false }),
            reset: () => set({ currentInsight: null, isLoading: false, error: null }),
        }),
        {
            name: 'insights-storage',
        }
    )
);
