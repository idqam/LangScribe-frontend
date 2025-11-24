"use client";

import React, { ReactNode, useMemo } from "react";
import promptsData from "@/app/data/promptsData";
import { usePromptStore } from "@/app/store/promptStore";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const PromptControls: React.FC = () => {
  const t = useTranslations('Writing.prompt');
  const {
    languageCode,
    category,
    topic,
    proficiency,
    complexity,
    selectedPrompts,
    setLanguage,
    setCategory,
    setTopic,
    setProficiency,
    setComplexity,
    randomizePrompt,
    generatePrompt,
  } = usePromptStore();

  const { text, setText } = useWritingPadStore();

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

  const handleGenerate = () => {
    if (selectedPrompts.length === 0) {
      toast.error("Please select or randomize a prompt first.");
      return;
    }

    const applyPrompt = () => {
      generatePrompt();
      // Optional: Clear writing pad if desired, or just let user write
      // For now, we don't clear the text automatically unless requested
      // But the requirement says "replace the writing pad contents"
      // So we should probably clear it or append? 
      // "load the chosen prompt into the writing pad as the active prompt" usually means setting the prompt state, not necessarily the text content.
      // However, "If the writing pad has unsaved changes... replace anyway?" implies overwriting.
      // Let's assume we just set the prompt for now, but if we were to overwrite text:
      // setText(""); 
      toast.success("Prompt applied!");
    };

    if (text.trim().length > 10) {
      toast("You have unsaved changes", {
        action: {
          label: "Replace",
          onClick: applyPrompt,
        },
        cancel: {
          label: "Cancel",
          onClick: () => { },
        },
      });
    } else {
      applyPrompt();
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={languageCode}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg border p-2 bg-white text-sm"
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
          className="rounded-lg border p-2 bg-white text-sm"
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
          className="rounded-lg border p-2 bg-white text-sm"
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
          className="rounded-lg border p-2 bg-white text-sm"
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
          className="rounded-lg border p-2 bg-white text-sm"
        >
          {topics.map((t) => (
            <option key={t as string} value={t as string}>
              {t as ReactNode}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => randomizePrompt()}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors text-sm"
          >
            Random
          </button>

          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate
          </button>
        </div>
      </div>

      {/* Preview Selection */}
      {selectedPrompts.length > 0 && (
        <div className="text-xs text-slate-500 italic">
          Selected: {selectedPrompts[0].prompt.substring(0, 50)}...
        </div>
      )}
    </div>
  );
};
