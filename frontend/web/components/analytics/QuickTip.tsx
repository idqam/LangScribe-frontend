"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Lightbulb, X } from "lucide-react";

const tips = [
    "Try using more descriptive adjectives to make your writing more vivid. Consider words like 'vibrant', 'serene', or 'bustling'.",
    "Vary your sentence structure by mixing short and long sentences for better rhythm and flow.",
    "Use transition words like 'however', 'moreover', and 'consequently' to connect your ideas smoothly.",
    "Practice writing in the active voice to make your sentences more direct and engaging.",
    "Read your writing aloud to catch awkward phrasing and improve natural flow.",
];

export const QuickTip = () => {
    const t = useTranslations('Writing.insights');
    const [isVisible, setIsVisible] = useState(true);
    const [currentTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm p-6 relative">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Dismiss tip"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1 pr-6">
                    <h4 className="font-semibold text-slate-900 mb-1">{t('quickTip')}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {currentTip}
                    </p>
                </div>
            </div>
        </div>
    );
};
