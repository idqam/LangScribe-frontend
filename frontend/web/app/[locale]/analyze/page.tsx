"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const AnalyzePage = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error analyzing text:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">NLP Analysis Playground</h1>
                    <p className="text-slate-600">Test the browser-based CEFR estimation pipeline.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to analyze (English or Spanish)..."
                        className="w-full h-48 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !text}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Text'}
                    </button>
                </div>

                {result && (
                    <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Analysis Result</h2>
                                    <p className="text-slate-500">Language: {result.lang === 'en' ? 'English' : 'Spanish'}</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-indigo-600">{result.cefrLevel}</div>
                                    <div className="text-sm text-slate-500">Estimated Level</div>
                                </div>
                            </div>

                            {/* Subscores */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500 mb-1">Vocabulary</div>
                                    <div className="text-lg font-semibold text-slate-900">{(result.subscores.vocab * 100).toFixed(0)}%</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500 mb-1">Syntax</div>
                                    <div className="text-lg font-semibold text-slate-900">{(result.subscores.syntax * 100).toFixed(0)}%</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500 mb-1">Morphology</div>
                                    <div className="text-lg font-semibold text-slate-900">{(result.subscores.morph * 100).toFixed(0)}%</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500 mb-1">Grammar</div>
                                    <div className="text-lg font-semibold text-slate-900">{(result.subscores.grammar * 100).toFixed(0)}%</div>
                                </div>
                            </div>

                            {/* Grammar Errors */}
                            {result.grammarErrors.length > 0 && (
                                <div className="border-t border-slate-200 pt-6">
                                    <h3 className="font-semibold text-slate-900 mb-4">Grammar Issues</h3>
                                    <div className="space-y-3">
                                        {result.grammarErrors.map((error: any, index: number) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                                <span className="font-medium shrink-0">{error.rule}:</span>
                                                <span>{error.message} (Match: "{error.match}")</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Detailed Stats */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-semibold text-slate-900 mb-4">Vocabulary Stats</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Unique Words</span>
                                        <span className="font-medium">{result.features.vocab.typeTokenRatio.toFixed(2)} (TTR)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Unknown Words</span>
                                        <span className="font-medium">{(result.features.vocab.pctUnknownWords * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="pt-2 border-t border-slate-100">
                                        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">CEFR Distribution</div>
                                        {Object.entries(result.features.vocab.cefrProportions).map(([level, prop]: any) => (
                                            <div key={level} className="flex items-center gap-2 mb-1">
                                                <span className="w-6 text-xs font-medium text-slate-500">{level}</span>
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500 rounded-full"
                                                        style={{ width: `${prop * 100}%` }}
                                                    />
                                                </div>
                                                <span className="w-8 text-xs text-right text-slate-600">{(prop * 100).toFixed(0)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-semibold text-slate-900 mb-4">Text Stats</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Sentences</span>
                                        <span className="font-medium">{result.sentences.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Avg Sentence Length</span>
                                        <span className="font-medium">{result.features.syntax.avgSentenceLength.toFixed(1)} words</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Clause Estimate</span>
                                        <span className="font-medium">{result.features.syntax.clauseEstimate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Verb Tenses</span>
                                        <span className="font-medium">{result.features.morph.verbTenseVariety} types</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Discourse Markers</span>
                                        <span className="font-medium">{result.features.cohesion.discourseMarkerCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzePage;
