"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInsightsStore } from '@/app/store/InsightsStore';
import { Loader2, ChevronDown, ChevronUp, AlertCircle, BookOpen, Target, Sparkles } from 'lucide-react';

type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

interface SectionProps {
    title: string;
    items: string[];
    priority: PriorityLevel;
    icon: React.ReactNode;
    defaultOpen?: boolean;
}

const PriorityBadge = ({ level }: { level: PriorityLevel }) => {
    const styles = {
        HIGH: 'bg-red-100 text-red-700 border-red-200',
        MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200',
        LOW: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[level]}`}>
            {level}
        </span>
    );
};

const CollapsibleSection: React.FC<SectionProps> = ({ title, items, priority, icon, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (items.length === 0) return null;

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="text-slate-600">{icon}</div>
                    <span className="font-medium text-slate-900">{title}</span>
                    <PriorityBadge level={priority} />
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {isOpen && (
                <div className="p-4 space-y-2 bg-white">
                    {items.map((item, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const LLMInsightsPanel = () => {
    const t = useTranslations('Writing.insights');
    const { currentInsight, isLoading, error } = useInsightsStore();

    if (!currentInsight && !isLoading && !error) {
        return (
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200 shadow-sm p-8">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-2 text-lg">AI Insights</h4>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                            Write your thoughts and click "Log Entry" to receive personalized language learning feedback powered by AI.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                            <Sparkles className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg">AI Insights</h3>
                            <p className="text-xs text-slate-600">Personalized feedback for your writing</p>
                        </div>
                    </div>
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />}
                </div>
            </div>

            <div className="p-6 space-y-4">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                        <div className="text-center">
                            <p className="font-medium text-slate-900">Analyzing your writing...</p>
                            <p className="text-sm text-slate-500 mt-1">This may take a few seconds</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {currentInsight && !isLoading && (
                    <div className="space-y-4">
                        {/* Overall Feedback */}
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Overall Feedback
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {currentInsight.feedback}
                            </p>
                        </div>

                        {/* Collapsible Sections */}
                        <CollapsibleSection
                            title="Grammar & Syntax"
                            items={currentInsight.grammarSuggestions || []}
                            priority="HIGH"
                            icon={<AlertCircle className="w-5 h-5" />}
                            defaultOpen={true}
                        />

                        <CollapsibleSection
                            title="Vocabulary Insights"
                            items={currentInsight.vocabularyInsights || []}
                            priority="MEDIUM"
                            icon={<BookOpen className="w-5 h-5" />}
                            defaultOpen={false}
                        />

                        <CollapsibleSection
                            title="Learning Targets"
                            items={currentInsight.learningRecommendations || []}
                            priority="LOW"
                            icon={<Target className="w-5 h-5" />}
                            defaultOpen={false}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
