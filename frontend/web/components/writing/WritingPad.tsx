"use client";
import { useWritingPadStore } from "@/app/store/WritingStore";
// import { LogButton } from "./LogButton";
import { useTranslations } from "next-intl";
import { FileText, Hash, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const WritingPad = () => {
  const { text, wordCount, charCount, setText } = useWritingPadStore();
  const t = useTranslations("Writing.pad");
  const [writingTime, setWritingTime] = useState(0);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWriting) {
      interval = setInterval(() => {
        setWritingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWriting]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (!isWriting && e.currentTarget.value.length > 0) {
      setIsWriting(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const uniqueWords = new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
  ).size;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[700px]">
      {/* Metrics Bar */}
      <div className="border-b border-slate-200 px-6 py-4 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Your Writing</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-indigo-50 rounded-lg">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Words</div>
                <div className="font-semibold text-slate-900">{wordCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <Hash className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Unique</div>
                <div className="font-semibold text-slate-900">
                  {uniqueWords}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 bg-emerald-50 rounded-lg">
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Time</div>
                <div className="font-semibold text-slate-900">
                  {formatTime(writingTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Writing Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <textarea
          value={text}
          className="w-full h-full resize-none focus:outline-none text-slate-900 text-lg leading-[1.75] placeholder:text-slate-400"
          placeholder={t("placeholder")}
          onChange={handleTextChange}
        />
      </div>

      {/* Action Bar */}
      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>{t("autoSaved")}</span>
              <span className="text-slate-400">• Just now</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((wordCount / 200) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs text-slate-500">{wordCount}/200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
