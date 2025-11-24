"use client";

import { useEffect } from "react";
import { PromptCard } from "@/components/writing/PromptCard";
import { usePromptStore } from "@/app/store/promptStore";
import { PromptControls } from "./PromptCardControls";
import { useTranslations } from "next-intl";

export const PromptCardFunc: React.FC = () => {
  const t = useTranslations('Writing.prompt');
  const {
    currentPrompt,
    loadPrompts,
    randomizePrompt,
    languageCode,
    category,
    topic,
    proficiency,
    complexity,
  } = usePromptStore();

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  useEffect(() => {
    randomizePrompt();
  }, [languageCode, category, topic, proficiency, complexity, randomizePrompt]);

  return (
    <div className="space-y-6">
      <PromptControls />

      <PromptCard
        prompt={currentPrompt?.prompt ?? t('noPrompt')}
        level={currentPrompt?.proficiency ?? ""}
        topic={currentPrompt?.topic ?? "general"}
        onRandom={() => randomizePrompt()}
      />
    </div>
  );
};
