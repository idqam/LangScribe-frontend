"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import promptsData from "../data/promptsData";
import { Prompt, PromptRequest } from "../types/promptTypes";
type ScoredPrompt = { p: Prompt; score: number };
import {
  sharedCategory,
  proficiencyScore,
  complexitySimilarity,
  randomFloat,
  weightedRandomSelect,
} from "../utils/promptUtils";

type RequestState = "idle" | "loading" | "ready";

interface PromptStore {
  allPrompts: Prompt[];
  currentPrompt: Prompt | null;

  languageCode: string;
  category: string;
  topic: string;
  proficiency: string;
  complexity: string;

  recentPromptIds: string[];
  strugglingTopics: string[];
  masteredTopics: string[];
  averageRecentScore: number;

  requestState: RequestState;

  loadPrompts: () => void;
  randomizePrompt: () => void;

  setLanguage: (lang: string) => void;
  setCategory: (c: string) => void;
  setTopic: (t: string) => void;
  setProficiency: (p: string) => void;
  setComplexity: (c: string) => void;

  addRecentPrompt: (id: string) => void;
  updateAverageScore: (score: number) => void;
  addStrugglingTopic: (topic: string) => void;
  addMasteredTopic: (topic: string) => void;

  buildRequest: () => PromptRequest;
}

const MAX_RECENT_PROMPTS = 20;
const TOP_K_CANDIDATES = 5;
const SELECTION_TEMPERATURE = 0.7;

const RECENCY_PENALTY = 0.3;
const STRUGGLING_BOOST = 1.3;
const MASTERED_PENALTY = 0.7;
const ADAPTIVE_DIFFICULTY_BONUS = 1.2;

const SCORE_WEIGHTS = {
  proficiency: 0.45,
  topic: 0.3,
  complexity: 0.2,
  randomness: 0.05,
};

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      allPrompts: [],
      currentPrompt: null,

      languageCode: "en",
      category: "writing",
      topic: "random",
      proficiency: "B1",
      complexity: "Intermediate",

      recentPromptIds: [],
      strugglingTopics: [],
      masteredTopics: [],
      averageRecentScore: 75,

      requestState: "idle",

      loadPrompts: () => {
        const languages = promptsData.languages || {};
        const all: Prompt[] = [];

        Object.values(languages).forEach((lang: any) => {
          Object.values(lang.categories).forEach((cat: any) => {
            cat.prompts.forEach((p: any) => {
              all.push(p);
            });
          });
        });

        set({ allPrompts: all });
      },

      buildRequest: () => {
        const { languageCode, category, topic, proficiency, complexity } =
          get();

        return {
          language: languageCode,
          category,
          topic,
          proficiency,
          complexity,
          strict: false,
          tags: [],
        };
      },

      randomizePrompt: () => {
        const {
          allPrompts,
          buildRequest,
          recentPromptIds,
          strugglingTopics,
          masteredTopics,
          averageRecentScore,
        } = get();

        const req = buildRequest();

        if (allPrompts.length === 0) {
          console.warn("No prompts loaded");
          return;
        }

        let candidates = allPrompts.filter(
          (p) => p.language === req.language && p.category === req.category
        );

        if (req.topic !== "random") {
          const topicFiltered = candidates.filter(
            (p) =>
              p.topic === req.topic ||
              p.tags?.includes(req.topic) ||
              sharedCategory(req.topic, p.topic)
          );

          if (topicFiltered.length > 0) {
            candidates = topicFiltered;
          }
        }

        if (candidates.length === 0) {
          console.warn(
            "No matching prompts found, using random from all prompts"
          );
          const randomPrompt =
            allPrompts[Math.floor(Math.random() * allPrompts.length)];
          set({ currentPrompt: randomPrompt, requestState: "ready" });
          return;
        }

        const recentSet = new Set(recentPromptIds);
        const strugglingSet = new Set(strugglingTopics);
        const masteredSet = new Set(masteredTopics);

        const scored: ScoredPrompt[] = candidates.map((p) => {
          const topicScore =
            p.topic === req.topic
              ? 1.0
              : sharedCategory(p.topic, req.topic)
              ? 0.5
              : 0.2;

          const profScore = proficiencyScore(p.proficiency, req.proficiency);

          const compScore =
            p.complexity === req.complexity
              ? 1.0
              : complexitySimilarity(p.complexity, req.complexity);

          const baseScore =
            profScore * SCORE_WEIGHTS.proficiency +
            topicScore * SCORE_WEIGHTS.topic +
            compScore * SCORE_WEIGHTS.complexity +
            randomFloat(0, SCORE_WEIGHTS.randomness);

          const recencyPenalty = recentSet.has(p.id) ? RECENCY_PENALTY : 1.0;

          const strugglingBoost = strugglingSet.has(p.topic)
            ? STRUGGLING_BOOST
            : 1.0;

          const masteredPenalty = masteredSet.has(p.topic)
            ? MASTERED_PENALTY
            : 1.0;

          const adaptiveDifficultyBonus =
            averageRecentScore > 85 && profScore === 0.8
              ? ADAPTIVE_DIFFICULTY_BONUS
              : averageRecentScore < 60 && profScore === 0.6
              ? ADAPTIVE_DIFFICULTY_BONUS
              : 1.0;

          const finalScore =
            baseScore *
            recencyPenalty *
            strugglingBoost *
            masteredPenalty *
            adaptiveDifficultyBonus;

          return { p, score: finalScore };
        });

        scored.sort((a, b) => b.score - a.score);

        const topCandidates = scored.slice(
          0,
          Math.min(TOP_K_CANDIDATES, scored.length)
        );

        const picked = weightedRandomSelect(
          topCandidates.map((c) => c.p),
          topCandidates.map((c) => c.score),
          SELECTION_TEMPERATURE
        );

        set({ currentPrompt: picked, requestState: "ready" });
      },

      setLanguage: (languageCode) => set({ languageCode }),
      setCategory: (category) => set({ category }),
      setTopic: (topic) => set({ topic }),
      setProficiency: (proficiency) => set({ proficiency }),
      setComplexity: (complexity) => set({ complexity }),

      addRecentPrompt: (id: string) =>
        set((state) => ({
          recentPromptIds: [
            id,
            ...state.recentPromptIds.filter((pid) => pid !== id),
          ].slice(0, MAX_RECENT_PROMPTS),
        })),

      updateAverageScore: (score: number) =>
        set((state) => {
          const newAverage = state.averageRecentScore * 0.7 + score * 0.3;
          return { averageRecentScore: newAverage };
        }),

      addStrugglingTopic: (topic: string) =>
        set((state) => ({
          strugglingTopics: Array.from(
            new Set([...state.strugglingTopics, topic])
          ),
        })),

      addMasteredTopic: (topic: string) =>
        set((state) => ({
          masteredTopics: Array.from(new Set([...state.masteredTopics, topic])),
          strugglingTopics: state.strugglingTopics.filter((t) => t !== topic),
        })),
    }),
    {
      name: "langscribe-prompt-store",
      partialize: (state) => ({
        languageCode: state.languageCode,
        category: state.category,
        topic: state.topic,
        proficiency: state.proficiency,
        complexity: state.complexity,
        recentPromptIds: state.recentPromptIds,
        strugglingTopics: state.strugglingTopics,
        masteredTopics: state.masteredTopics,
        averageRecentScore: state.averageRecentScore,
      }),
    }
  )
);
