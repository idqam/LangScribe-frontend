import { UIPromptCardProps } from "@/app/types/promptTypes";
import React from "react";

export const PromptCard: React.FC<UIPromptCardProps> = ({
  prompt = "",
  level = "",
  topic = "",
  onRandom,
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
            {level}
          </div>
          <div className="px-3 py-1 bg-white text-slate-600 rounded-full text-xs font-medium border border-slate-200">
            {topic}
          </div>
        </div>

        <button
          onClick={onRandom}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Random prompt"
        >
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
          Today's Writing Prompt
        </h2>
        <p className="text-2xl font-semibold text-slate-900 leading-relaxed">
          {prompt}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Suggested: 200-300 words</span>
        </div>
      </div>
    </div>
  );
};
