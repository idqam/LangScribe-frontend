"use client";
import React from "react";
import { useTempAnStore } from "@/app/store/TempAnStore";
import { useWritingPadStore } from "@/app/store/WritingStore";
import { useTranslations } from "next-intl";
import { TrendingUp, Hash, BarChart3 } from "lucide-react";

export const WritingStats = () => {
    const t = useTranslations('Writing.insights');
    const { savedText } = useTempAnStore();
    const { wordCount } = useWritingPadStore();

    const uniqueWords = new Set(
        savedText
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/)
            .filter(Boolean)
    ).size;

    const vocabularyDiversity = wordCount > 0 ? Math.round((uniqueWords / wordCount) * 100) : 0;
    const wordGoal = 200;
    const progress = Math.min((wordCount / wordGoal) * 100, 100);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-indigo-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Writing Progress</h3>
            </div>

            <div className="space-y-6">
                {/* Word Count Progress */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Word Count</span>
                        <span className="text-sm font-semibold text-slate-900">{wordCount} / {wordGoal}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        {progress >= 100 ? "Goal reached! 🎉" : `${Math.round(wordGoal - wordCount)} words to go`}
                    </p>
                </div>

                {/* Vocabulary Diversity */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Hash className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-900">Vocabulary Diversity</div>
                            <div className="text-xs text-slate-600">Unique words ratio</div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{vocabularyDiversity}%</div>
                </div>

                {/* Estimated Level (placeholder) */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-900">Estimated Level</div>
                            <div className="text-xs text-slate-600">Based on complexity</div>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-semibold">
                        A2
                    </div>
                </div>
            </div>
        </div>
    );
};
