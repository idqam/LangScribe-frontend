"use client";

import React, { ReactNode, useMemo } from "react";
import promptsData from "@/app/data/promptsData";
import { usePromptStore } from "@/app/store/promptStore";

export const PromptControls: React.FC = () => {
  const {
    languageCode,
    category,
    topic,
    proficiency,
    complexity,
    setLanguage,
    setCategory,
    setTopic,
    setProficiency,
    setComplexity,
    randomizePrompt,
  } = usePromptStore();

  const languageOptions = useMemo(() => {
    return Object.entries(promptsData.languages).map(([code, data]: any) => ({
      code,
      label: data.name,
    }));
  }, []);

  const categories = useMemo(() => {
    const lang = promptsData.languages[languageCode];
    return Object.keys(lang?.categories ?? {});
  }, [languageCode]);

  const topics = useMemo(() => {
    if (!category || category === "random") return ["random"];

    const lang = promptsData.languages[languageCode];
    const cat = lang?.categories?.[category];

    if (!cat) return ["random"];

    const topicList = Array.from(new Set(cat.prompts.map((p: any) => p.topic)));
    return ["random", ...topicList];
  }, [languageCode, category]);

  const difficulties = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const complexities = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Academic",
    "Business",
    "Conversational",
    "Fluency Training",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-3">
        <select
          value={languageCode}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg border p-2"
        >
          {languageOptions.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>

        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="rounded-lg border p-2"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
          className="rounded-lg border p-2"
        >
          {complexities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-lg border p-2"
        >
          {topics.map((t) => (
            <option key={t as string} value={t as string}>
              {t as ReactNode}
            </option>
          ))}
        </select>

        <button
          onClick={() => randomizePrompt()}
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Random
        </button>
      </div>
    </div>
  );
};
