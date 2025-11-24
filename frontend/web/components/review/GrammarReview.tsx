"use client";

import React, { useState } from 'react';
import { GrammarTopic } from '@/app/data/mockReviewData';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface GrammarReviewProps {
    topics: GrammarTopic[];
}

export const GrammarReview: React.FC<GrammarReviewProps> = ({ topics }) => {
    const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

    const toggleTopic = (index: number) => {
        setExpandedTopics(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    if (topics.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                <p className="text-slate-500">No grammar topics available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Grammar Review</h2>
            </div>

            <div className="space-y-4">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                    >
                        {/* Topic Header */}
                        <button
                            onClick={() => toggleTopic(index)}
                            className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                    {topic.level}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {topic.title}
                                </h3>
                            </div>
                            {expandedTopics.has(index) ? (
                                <ChevronUp className="w-5 h-5 text-slate-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-slate-500" />
                            )}
                        </button>

                        {/* Topic Content */}
                        {expandedTopics.has(index) && (
                            <div className="p-6 bg-white border-t border-slate-200">
                                {/* Explanation */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                        Explanation
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {topic.explanation}
                                    </p>
                                </div>

                                {/* Examples */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                        Examples
                                    </h4>
                                    <div className="space-y-3">
                                        {topic.examples.map((example, exIdx) => (
                                            <div
                                                key={exIdx}
                                                className="flex items-start gap-3 bg-purple-50 rounded-lg p-4"
                                            >
                                                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                                    {exIdx + 1}
                                                </div>
                                                <p className="text-slate-700 flex-1 italic">
                                                    "{example}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pro Tip */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-amber-900 mb-1">Pro Tip</h4>
                        <p className="text-sm text-amber-700 leading-relaxed">
                            Try using these grammar structures in your next writing session. Practice makes perfect!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
