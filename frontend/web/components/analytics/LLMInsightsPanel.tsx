"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInsightsStore } from '@/app/store/InsightsStore';
import { Loader2 } from 'lucide-react';

export const LLMInsightsPanel = () => {
    const t = useTranslations('Writing.insights');
    const [isOpen, setIsOpen] = useState(true);
    const { currentInsight, isLoading, error } = useInsightsStore();

    if (!currentInsight && !isLoading && !error) {
        return (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm p-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">AI Insights</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Log an entry to receive personalized language learning feedback!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div
                className="p-4 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-100 flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">AI Insights</h3>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />}
                </div>
                <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="p-4 space-y-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                            <span className="ml-3 text-slate-600">Generating insights...</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {currentInsight && !isLoading && (
                        <>
                            {/* Overall Feedback */}
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Overall Feedback
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {currentInsight.feedback}
                                </p>
                            </div>

                            {/* Grammar Suggestions */}
                            {currentInsight.grammarSuggestions && currentInsight.grammarSuggestions.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Grammar & Syntax
                                    </h4>
                                    <div className="space-y-2">
                                        {currentInsight.grammarSuggestions.map((suggestion, i) => (
                                            <div key={i} className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-sm text-slate-700">
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vocabulary Insights */}
                            {currentInsight.vocabularyInsights && currentInsight.vocabularyInsights.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Vocabulary Insights
                                    </h4>
                                    <div className="space-y-2">
                                        {currentInsight.vocabularyInsights.map((insight, i) => (
                                            <div key={i} className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-sm text-slate-700">
                                                {insight}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Learning Recommendations */}
                            {currentInsight.learningRecommendations && currentInsight.learningRecommendations.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        Learning Targets
                                    </h4>
                                    <ul className="space-y-2">
                                        {currentInsight.learningRecommendations.map((target, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                                {target}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

