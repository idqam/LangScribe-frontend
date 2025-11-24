import React from "react";
import { useTranslations } from 'next-intl';
import { PromptCard } from "@/components/writing/PromptCard";
import { PromptCardFunc } from "./PromptCardFunc";
import { WritingPad } from "@/components/writing/WritingPad";
import { InsightsPanel } from "@/components/analytics/InsightsPanel";

const WritingNavigation = () => {
  const t = useTranslations('Writing.nav');
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                LangScribe
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-indigo-600 font-medium">
                {t('write')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t('review')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t('statistics')}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t('streak', { days: 7 })}</span>
            </div>

            <button className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold hover:bg-indigo-200 transition-colors">
              JD
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const WritingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <WritingNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <PromptCardFunc />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 min-h-[600px]">
            <WritingPad />
          </div>

          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
