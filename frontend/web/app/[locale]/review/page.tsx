"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { ReviewCarousel } from "@/components/review/ReviewCarousel";
import { SentenceExercise } from "@/components/review/SentenceExercise";
import { GrammarReview } from "@/components/review/GrammarReview";
import { getUserLevel, getDailyWords, getDailyExercises, getGrammarTopics } from "@/app/data/mockReviewData";

export default function ReviewPage() {
    const [isClient, setIsClient] = useState(false);
    const [userLevel, setUserLevel] = useState('B1');

    useEffect(() => {
        setIsClient(true);
        setUserLevel(getUserLevel());
    }, []);

    if (!isClient) return null;

    const dailyWords = getDailyWords(userLevel, 10);
    const exercises = getDailyExercises(userLevel);
    const grammarTopics = getGrammarTopics(userLevel);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                        Level: {userLevel}
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">
                        Daily Review
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Master vocabulary, practice sentences, and review grammar concepts.
                    </p>
                </div>

                {/* Three Vertical Sections */}
                <div className="space-y-8">
                    {/* 1. Flashcard Carousel */}
                    <ReviewCarousel words={dailyWords} />

                    {/* 2. Sentence Exercise */}
                    <SentenceExercise exercises={exercises} />

                    {/* 3. Grammar Review */}
                    <GrammarReview topics={grammarTopics} />
                </div>

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.location.href = '/en/write'}
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        Continue Writing
                    </button>
                </div>
            </main>
        </div>
    );
}
