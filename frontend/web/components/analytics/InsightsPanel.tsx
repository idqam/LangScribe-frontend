"use client";
import React from "react";
import { useTempAnStore } from "@/app/store/TempAnStore";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { useTranslations } from "next-intl";
import { LLMInsightsPanel } from "./LLMInsightsPanel";

export const InsightsPanel = () => {
  const t = useTranslations('Writing.insights');
  const { savedText, analysisResult } = useTempAnStore();
  const { wordCount, charCount } = useWritingPadStore();

  const uniqueWords = new Set(
    savedText
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
  ).size;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            {t('title')}
          </h3>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            label={t('words')}
            value={wordCount}
            subtext={t('wordsTarget')}
            positive={undefined}
          />

          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
            label={t('uniqueWords')}
            value={uniqueWords}
            subtext={""}
            // subtext="+8 from last entry"
            positive
          />



        </div>

        <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          {t('generate')}
        </button>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">{t('quickTip')}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('tipContent')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 className="font-semibold text-slate-900 mb-4">{t('recentProgress')}</h4>
        <div className="space-y-3">
          <ProgressItem date="Yesterday" words="245" score="88" />
          <ProgressItem date="2 days ago" words="198" score="82" />
          <ProgressItem date="3 days ago" words="312" score="91" />
        </div>
      </div>
    </div>
  );
};

export const StatItem = ({ icon, label, value, subtext, positive }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-600 mb-0.5">{label}</div>
        <div className="font-semibold text-slate-900 text-lg">{value}</div>
      </div>
      <div
        className={`text-xs ${positive ? "text-emerald-600" : "text-slate-500"
          }`}
      >
        {subtext}
      </div>
    </div>
  );
};

export const ProgressItem = ({ date, words, score }) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{date}</span>
      <div className="flex items-center gap-3">
        <span className="text-slate-500">{words} words</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-slate-700 font-medium">{score}</span>
        </div>
      </div>
    </div>
  );
};
