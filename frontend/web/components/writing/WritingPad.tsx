"use client";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { LogButton } from "./LogButton";
import { useTranslations } from "next-intl";

export const WritingPad = () => {
  const { wordCount, charCount, setText } = useWritingPadStore();
  const t = useTranslations('Writing.pad');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4"></div>

        <div className="flex items-center gap-4 text-sm"></div>
      </div>

      <div className="flex-1 p-6">
        <textarea
          className="w-full h-full resize-none focus:outline-none text-slate-900 text-lg leading-relaxed placeholder:text-slate-400"
          placeholder={t('placeholder')}
          onChange={(e) => setText(e.currentTarget.value)}
        ></textarea>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-slate-600">{t('autoSaved')}</span>
        </div>

        <div className="flex items-center gap-3">
          <LogButton />
        </div>
      </div>
    </div>
  );
};
