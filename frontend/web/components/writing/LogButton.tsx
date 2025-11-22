import { useTempAnStore } from "@/app/store/TempAnStore";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { Button } from "../ui/button";

export const LogButton = () => {
  const { text } = useWritingPadStore();
  const { setSavedText } = useTempAnStore();

  return (
    <button
      onClick={(e) => setSavedText(text)}
      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2"
    >
      Log!
    </button>
  );
};

export const AnalyzeButton = () => {
  const { savedText } = useTempAnStore();
  
};
