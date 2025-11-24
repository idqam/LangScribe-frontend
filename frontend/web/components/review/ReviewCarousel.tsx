"use client";

import React, { useState } from 'react';
import { DailyWord } from '@/app/data/mockReviewData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewCarouselProps {
    words: DailyWord[];
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ words }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsFlipped(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        setIsFlipped(false);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (words.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                <p className="text-slate-500">No words available for review.</p>
            </div>
        );
    }

    const currentWord = words[currentIndex];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Daily Vocabulary</h2>
                <div className="text-sm text-slate-500">
                    {currentIndex + 1} / {words.length}
                </div>
            </div>

            <div className="relative">
                {/* Flashcard */}
                <div
                    className="w-full h-80 cursor-pointer perspective-1000"
                    onClick={handleFlip}
                >
                    <div
                        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''
                            }`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* FRONT */}
                        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 flex flex-col items-center justify-center text-center">
                            <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-4">
                                {currentWord.pos} • {currentWord.level}
                            </div>
                            <h3 className="text-5xl font-bold text-slate-900 mb-6">
                                {currentWord.word}
                            </h3>
                            <p className="text-slate-600 text-lg italic max-w-md">
                                "{currentWord.example}"
                            </p>
                            <div className="absolute bottom-6 text-slate-400 text-sm">
                                Tap to reveal translation
                            </div>
                        </div>

                        {/* BACK */}
                        <div
                            className="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8 flex flex-col items-center justify-center text-center"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">
                                Translation
                            </div>
                            <h3 className="text-5xl font-bold text-emerald-900 mb-6">
                                {currentWord.translation}
                            </h3>
                            <p className="text-slate-600 text-lg max-w-md">
                                {currentWord.word} ({currentWord.pos})
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        aria-label="Previous word"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-700" />
                    </button>

                    <div className="flex gap-2">
                        {words.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setIsFlipped(false);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                        ? 'bg-indigo-600 w-8'
                                        : 'bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to word ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        aria-label="Next word"
                    >
                        <ChevronRight className="w-6 h-6 text-slate-700" />
                    </button>
                </div>
            </div>
        </div>
    );
};
