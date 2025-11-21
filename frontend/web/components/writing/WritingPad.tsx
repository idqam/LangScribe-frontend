"use client";
import { useWritingPadStore } from "@/app/store/WritingStore";

export const WritingPad = () => {
  const { text, wordCount, charCount, sentenceCount, setText } =
    useWritingPadStore();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600">
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
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-semibold">
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">
            <span className="font-semibold text-slate-700">{wordCount}</span>{" "}
            words
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            <span className="font-semibold text-slate-700">{charCount}</span>{" "}
            characters
          </span>
        </div>
      </div>

      <div className="flex-1 p-6">
        <textarea
          className="w-full h-full resize-none focus:outline-none text-slate-900 text-lg leading-relaxed placeholder:text-slate-400"
          placeholder="Start writing your response here..."
          onChange={(e) => setText(e.currentTarget.value)}
        ></textarea>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-slate-600">Auto-saved just now</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2">
            Log
          </button>
        </div>
      </div>
    </div>
  );
};
