
import { useWritingPadStore } from "@/app/store/WritingStore";
import { usePersistenceStore } from "@/app/store/PersistenceStore";
import { analyzeText } from "@/lib/nlp/analyze";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useTempAnStore } from "@/app/store/TempAnStore";

export const LogButton = () => {
  const { text } = useWritingPadStore();
  const { setSavedText, setAnalysisResult } = useTempAnStore();
  const { addEntry } = usePersistenceStore();
  const t = useTranslations('Writing.pad');

  const handleLog = () => {
    if (!text.trim()) return;

    // 1. Analyze text
    const result = analyzeText(text);

    // 2. Save to PersistenceStore
    addEntry({
      id: Date.now().toString(),
      timestamp: Date.now(),
      text: text,
      analysis: result
    });

    // 3. Update TempAnStore for immediate feedback
    setSavedText(text);
    setAnalysisResult(result);

    // Optional: Add toast notification here
    console.log("Entry logged and analyzed:", result);
  };

  return (
    <button
      onClick={handleLog}
      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2"
    >
      {t('log')}
    </button>
  );
};

export const AnalyzeButton = () => {
  const { savedText } = useTempAnStore();

};
