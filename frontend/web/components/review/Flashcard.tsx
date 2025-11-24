import React, { useState } from 'react';
import { Flashcard as FlashcardType } from '@/app/store/VocabStore';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardProps {
    card: FlashcardType;
    onRate: (quality: number) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, onRate }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRate = (e: React.MouseEvent, quality: number) => {
        e.stopPropagation();
        onRate(quality);
        setIsFlipped(false); // Reset for next card
    };

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <div
                className="relative w-full h-80 cursor-pointer group"
                onClick={handleFlip}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d transition-all duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* FRONT */}
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
                        <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-4">
                            {card.pos || 'Vocabulary'}
                        </div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-6">
                            {card.word}
                        </h2>
                        <p className="text-slate-500 text-lg italic">
                            "{card.contextSentence}"
                        </p>
                        <div className="absolute bottom-6 text-slate-400 text-sm">
                            Tap to flip
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-indigo-50 rounded-2xl shadow-lg border border-indigo-100 p-8 flex flex-col items-center justify-center text-center"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                            {card.word}
                        </h3>
                        {card.translation && (
                            <p className="text-xl text-indigo-700 mb-4">{card.translation}</p>
                        )}

                        <div className="mt-8 grid grid-cols-4 gap-2 w-full">
                            <button
                                onClick={(e) => handleRate(e, 0)}
                                className="px-2 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300 transition-colors"
                            >
                                AGAIN
                            </button>
                            <button
                                onClick={(e) => handleRate(e, 3)}
                                className="px-2 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                            >
                                HARD
                            </button>
                            <button
                                onClick={(e) => handleRate(e, 4)}
                                className="px-2 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors"
                            >
                                GOOD
                            </button>
                            <button
                                onClick={(e) => handleRate(e, 5)}
                                className="px-2 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-200 transition-colors"
                            >
                                EASY
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
