"use client";

import React, { useState } from 'react';
import { Exercise } from '@/app/data/mockReviewData';
import { Check, X } from 'lucide-react';

interface SentenceExerciseProps {
    exercises: Exercise[];
}

export const SentenceExercise: React.FC<SentenceExerciseProps> = ({ exercises }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);

    if (exercises.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                <p className="text-slate-500">No exercises available.</p>
            </div>
        );
    }

    const currentExercise = exercises[currentExerciseIndex];

    const handleCheck = () => {
        const correct = userAnswer.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase();
        setIsCorrect(correct);
        setIsChecked(true);
        setShowTranslation(true);
    };

    const handleNext = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setUserAnswer('');
            setIsChecked(false);
            setIsCorrect(false);
            setShowTranslation(false);
        }
    };

    const handleReset = () => {
        setUserAnswer('');
        setIsChecked(false);
        setIsCorrect(false);
        setShowTranslation(false);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Sentence Practice</h2>
                <div className="text-sm text-slate-500">
                    Exercise {currentExerciseIndex + 1} / {exercises.length}
                </div>
            </div>

            <div className="space-y-6">
                {/* Exercise Prompt */}
                <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-lg text-slate-700 leading-relaxed">
                        {currentExercise.prompt.split('_____').map((part, idx, arr) => (
                            <React.Fragment key={idx}>
                                {part}
                                {idx < arr.length - 1 && (
                                    <span className="inline-block mx-2">
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            disabled={isChecked}
                                            className={`px-4 py-2 border-2 rounded-lg min-w-[200px] text-center font-semibold transition-colors ${!isChecked
                                                    ? 'border-indigo-300 focus:border-indigo-500 focus:outline-none bg-white'
                                                    : isCorrect
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                        : 'border-red-500 bg-red-50 text-red-700'
                                                }`}
                                            placeholder="Type here..."
                                        />
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                {/* Feedback */}
                {isChecked && (
                    <div className={`rounded-xl p-6 flex items-start gap-4 ${isCorrect
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                            }`}>
                            {isCorrect ? (
                                <Check className="w-6 h-6 text-white" />
                            ) : (
                                <X className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-900' : 'text-red-900'
                                }`}>
                                {isCorrect ? 'Correct!' : 'Not quite right'}
                            </h4>
                            {!isCorrect && (
                                <p className="text-red-700 text-sm">
                                    The correct answer is: <span className="font-semibold">{currentExercise.correctAnswer}</span>
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Translation */}
                {showTranslation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <h4 className="font-semibold text-blue-900">Translation</h4>
                        </div>
                        <p className="text-blue-700">{currentExercise.translation}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    {!isChecked ? (
                        <button
                            onClick={handleCheck}
                            disabled={!userAnswer.trim()}
                            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleReset}
                                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
                            >
                                Try Again
                            </button>
                            {currentExerciseIndex < exercises.length - 1 && (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                                >
                                    Next Exercise
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
