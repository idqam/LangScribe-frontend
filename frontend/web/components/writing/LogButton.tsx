import { useTempAnStore } from "@/app/store/TempAnStore";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export const LogButton = () => {
  const { text } = useWritingPadStore();
  const { setSavedText } = useTempAnStore();
  const t = useTranslations('Writing.pad');

  return (
    <button
      onClick={(e) => setSavedText(text)}
      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2"
    >
      {t('log')}
    </button>
  );
};

export const AnalyzeButton = () => {
  const { savedText } = useTempAnStore();

};
