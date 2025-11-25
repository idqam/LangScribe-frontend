import { useWritingPadStore } from "@/app/store/WritingStore";
import { usePersistenceStore } from "@/app/store/PersistenceStore";
import { analyzeText } from "@/lib/nlp/analyze";
import { useTranslations } from "next-intl";
import { useTempAnStore } from "@/app/store/TempAnStore";
import React, { useState } from "react";
import { useVocabStore } from "@/app/store/VocabStore";
import { toast } from "sonner";
import commonWords from "@/app/data/commonWords.json";
import { useInsightsStore } from "@/app/store/InsightsStore";

export const LogButton = () => {
  const t = useTranslations('Writing.controls');
  const { text } = useWritingPadStore();
  const { setSavedText, setAnalysisResult } = useTempAnStore();
  const { addEntry } = usePersistenceStore();
  const { addCard } = useVocabStore();
  const { setInsight, setLoading, setError } = useInsightsStore();
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const handleLog = async () => {
    if (!text.trim()) {
      toast.error("Please write something first!");
      return;
    }

    const result = analyzeText(text);
    setSavedText(text);
    setAnalysisResult(result);

    // Persist the entry
    addEntry({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text,
      analysis: result,
    });

    // --- Vocabulary Extraction Logic ---
    const lang = result.lang as keyof typeof commonWords;
    const commonSet = new Set(commonWords[lang] || []);

    // Filter tokens: 
    // 1. Not in common list
    // 2. Length > 3
    // 3. Is a noun, verb, or adjective (simplified check based on POS if available, or just length/commonality)
    // Since our POS tagger is basic, we'll rely on commonality and length for now, plus POS if valid.

    const candidates = result.tokens.filter(token => {
      const word = token.normal.toLowerCase();
      return (
        word.length > 3 &&
        !commonSet.has(word) &&
        !/^\d+$/.test(word) // Not a number
      );
    });

    // Pick top 3 unique candidates
    const uniqueCandidates = Array.from(new Set(candidates.map(c => c.normal)));
    const selectedWords = uniqueCandidates.slice(0, 3);

    let addedCount = 0;
    selectedWords.forEach(word => {
      // Find context sentence
      const sentence = result.sentences.find(s => s.toLowerCase().includes(word)) || text.substring(0, 50);

      // Find original token for POS (optional)
      const token = result.tokens.find(t => t.normal === word);

      addCard(word, sentence, result.lang, token?.pos);
      addedCount++;
    });

    if (addedCount > 0) {
      toast.success(`Analysis complete! Added ${addedCount} new words to review.`);
    } else {
      toast.success(t('logSuccess'));
    }

    // --- Generate AI Insights ---
    setIsGeneratingInsights(true);
    setLoading(true);

    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const insights = await response.json();
      setInsight(insights);
      toast.success('AI insights generated!');
    } catch (error) {
      console.error('Failed to generate insights:', error);
      setError('Failed to generate insights');
      toast.error('Failed to generate AI insights');
    } finally {
      setIsGeneratingInsights(false);
      setLoading(false);
    }
  };


  return (
    <button
      onClick={handleLog}
      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
    >
      {t('logButton')}
    </button>
  );
};

