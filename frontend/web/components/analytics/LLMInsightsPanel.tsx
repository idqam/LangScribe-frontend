import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

// Mock data types for the scaffold
interface LLMInsight {
    fluencyScore: number;
    vocabProfile: { lemma: string; freq: number; difficulty: string }[];
    errorSuggestions: { original: string; suggestion: string; reason: string }[];
    learningTargets: string[];
}

export const LLMInsightsPanel = () => {
    const t = useTranslations('Writing.insights');
    const [isOpen, setIsOpen] = useState(true);

    // Mock data - in real app this comes from API
    const mockInsights: LLMInsight = {
        fluencyScore: 78,
        vocabProfile: [
            { lemma: "ephemeral", freq: 1, difficulty: "C2" },
            { lemma: "analyze", freq: 3, difficulty: "B2" },
            { lemma: "create", freq: 5, difficulty: "A2" }
        ],
        errorSuggestions: [
            { original: "I has a cat", suggestion: "I have a cat", reason: "Subject-verb agreement" },
            { original: "She go to school", suggestion: "She goes to school", reason: "Third person singular" }
        ],
        learningTargets: [
            "Use more complex sentence structures",
            "Expand vocabulary related to technology",
            "Practice past tense conjugation"
        ]
    };

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
                    {/* Fluency Score */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-slate-600">Fluency Score</span>
                            <span className="text-2xl font-bold text-indigo-600">{mockInsights.fluencyScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${mockInsights.fluencyScore}%` }}
                            />
                        </div>
                    </div>

                    {/* Learning Targets */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Learning Targets</h4>
                        <ul className="space-y-2">
                            {mockInsights.learningTargets.map((target, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    {target}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Error Suggestions */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Suggestions</h4>
                        <div className="space-y-3">
                            {mockInsights.errorSuggestions.map((error, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                                    <div className="text-red-500 line-through mb-1">{error.original}</div>
                                    <div className="text-emerald-600 font-medium mb-1">{error.suggestion}</div>
                                    <div className="text-xs text-slate-500">{error.reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vocab Profile */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-3">Vocabulary Gems</h4>
                        <div className="flex flex-wrap gap-2">
                            {mockInsights.vocabProfile.map((word, i) => (
                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium border border-indigo-100">
                                    {word.lemma} <span className="opacity-50">({word.difficulty})</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
