import { UIPromptCardProps } from "@/app/types/promptTypes";
import React from "react";
import { useTranslations } from "next-intl";
import { Sparkles, RefreshCw, Clock, FileText } from "lucide-react";

export const PromptCard: React.FC<UIPromptCardProps> = ({
  prompt = "",
  level = "",
  topic = "",
  onRandom,
}) => {
  const t = useTranslations('Writing.prompt');

  const scrollToWriting = () => {
    const textarea = document.querySelector('textarea');
    textarea?.focus();
    textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-xl">
      <div className="bg-white rounded-[22px] p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {t('title')}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                  {level}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  {topic}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onRandom}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all font-medium"
            aria-label="New prompt"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">New Prompt</span>
          </button>
        </div>

        <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-relaxed mb-6">
          {prompt}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{t('suggested')} 15 min</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Target: 150-200 words</span>
            </div>
          </div>

          <button
            onClick={scrollToWriting}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Start Writing</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
