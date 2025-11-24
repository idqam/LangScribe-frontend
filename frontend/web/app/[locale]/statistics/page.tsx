"use client"
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePersistenceStore } from "@/app/store/PersistenceStore";



const QuickStats = ({ entries }: { entries: any[] }) => {
  const t = useTranslations('Statistics.quickStats');

  // Calculate stats from entries
  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + (entry.analysis?.tokens?.length || 0), 0);

  // Calculate avg quality (grammar score)
  const avgQuality = totalEntries > 0
    ? Math.round((entries.reduce((sum, entry) => sum + (entry.analysis?.subscores?.grammar || 0), 0) / totalEntries) * 100)
    : 0;

  // Simple streak calculation (consecutive days with entries)
  // This is a simplified version
  const streak = totalEntries > 0 ? 1 : 0;

  const stats = [
    {
      label: t('streak'),
      value: streak.toString(),
      unit: "days",
      color: "from-orange-500 to-red-500",
    },
    {
      label: t('entries'),
      value: totalEntries.toString(),
      unit: "entries",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: t('words'),
      value: totalWords.toLocaleString(),
      unit: "words",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: t('quality'),
      value: avgQuality.toString(),
      unit: "%",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div
            className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}
          ></div>
          <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
          <div className="text-sm text-slate-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const WritingHeatmap = ({ entries }: { entries: any[] }) => {
  const t = useTranslations('Statistics.heatmap');

  // Simplified heatmap: just show last 4 weeks (28 days)
  // This makes it much smaller and cleaner
  const generateRecentActivity = () => {
    // In a real app, map actual dates. For now, dummy data + entries check
    const days = Array.from({ length: 28 }, (_, i) => {
      // Check if we have an entry for "today - i"
      // Simplified logic for demo
      const hasEntry = entries.length > 0 && i < entries.length;
      return hasEntry ? Math.floor(Math.random() * 500) + 100 : Math.random() > 0.7 ? Math.floor(Math.random() * 200) : 0;
    }).reverse();
    return days;
  };

  const activity = generateRecentActivity();
  const maxValue = Math.max(...activity) || 1;

  const getColor = (value: number) => {
    if (value === 0) return "bg-slate-100";
    const intensity = value / maxValue;
    if (intensity < 0.25) return "bg-emerald-200";
    if (intensity < 0.5) return "bg-emerald-400";
    if (intensity < 0.75) return "bg-emerald-600";
    return "bg-emerald-700";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
        <p className="text-sm text-slate-600 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-7 gap-2 w-full max-w-sm">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className="text-xs text-slate-400 text-center">{d}</div>
          ))}
          {activity.map((val, i) => (
            <div
              key={i}
              className={`aspect-square rounded-md ${getColor(val)} transition-all hover:scale-110`}
              title={`${val} words`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-slate-100"></div>
          <div className="w-3 h-3 rounded bg-emerald-200"></div>
          <div className="w-3 h-3 rounded bg-emerald-400"></div>
          <div className="w-3 h-3 rounded bg-emerald-600"></div>
          <div className="w-3 h-3 rounded bg-emerald-700"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

const VocabularyChart = ({ entries }: { entries: any[] }) => {
  const t = useTranslations('Statistics.vocabulary');

  // Extract recent unique words from entries
  const recentWords = entries.flatMap(e => e.analysis?.tokens || [])
    .filter((t: any) => t.normal && t.normal.length > 3)
    .map((t: any) => t.normal)
    .slice(0, 8); // Take top 8

  // Fallback if no entries
  const displayWords = recentWords.length > 0 ? [...new Set(recentWords)].slice(0, 5) : ["learn", "write", "speak", "study", "grow"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          {t('title')}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {displayWords.map((word: string, index: number) => (
          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-medium text-slate-700">{word}</span>
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              {index % 2 === 0 ? t('common') : t('new')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LevelProgress = ({ entries }: { entries: any[] }) => {
  const t = useTranslations('Statistics.level');

  // Determine current level from latest entry or default to A1
  const currentLevel = entries.length > 0 ? entries[0].analysis.cefrLevel : "A1";

  const levels = [
    { level: "A1", name: "Beginner", progress: currentLevel >= "A1" ? 100 : 0, color: "bg-emerald-500" },
    { level: "A2", name: "Elementary", progress: currentLevel >= "A2" ? 100 : 0, color: "bg-emerald-500" },
    {
      level: "B1",
      name: "Intermediate",
      progress: currentLevel >= "B1" ? 100 : 0,
      color: "bg-emerald-500",
    },
    {
      level: "B2",
      name: "Upper Intermediate",
      progress: currentLevel >= "B2" ? 100 : 0,
      color: "bg-indigo-500",
    },
    { level: "C1", name: "Advanced", progress: currentLevel >= "C1" ? 100 : 0, color: "bg-slate-300" },
    { level: "C2", name: "Proficiency", progress: currentLevel >= "C2" ? 100 : 0, color: "bg-slate-300" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
          <p className="text-sm text-slate-600 mt-1">{t('subtitle')}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{currentLevel}</div>
          <div className="text-xs text-slate-600">{t('current')}</div>
        </div>
      </div>

      <div className="space-y-4">
        {levels.map((level, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${level.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {level.level}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {level.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {level.level} Level
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {level.progress}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${level.color} rounded-full transition-all duration-500`}
                style={{ width: `${level.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WordBubbles = ({ entries }: { entries: any[] }) => {
  const [limit, setLimit] = React.useState(10);
  const [timeRange, setTimeRange] = React.useState("weekly");
  const t = useTranslations('Statistics.bubbles');

  // Aggregate word frequency from entries
  const wordCounts: Record<string, number> = {};
  entries.forEach(entry => {
    // Assuming analysis has tokens with normal/lemma
    entry.analysis?.tokens?.forEach((token: any) => {
      const word = token.normal || token.text.toLowerCase();
      // Filter out small words/punctuation if needed
      if (word.length > 3) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  const sortedWords = Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([word, freq], i) => ({
      word,
      frequency: freq,
      color: [
        "bg-indigo-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-blue-500",
        "bg-emerald-500",
      ][i % 5],
    }));

  // Fallback to dummy data if no entries
  const words = sortedWords.length > 0 ? sortedWords : Array.from({ length: limit }, (_, i) => ({
    word: [
      "write", "learn", "study", "practice", "improve",
      "language", "fluent", "vocab", "grammar", "speak",
      "read", "understand", "express", "daily", "progress",
    ][i],
    frequency: Math.floor(Math.random() * 100) + 20,
    color: [
      "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-blue-500", "bg-emerald-500",
    ][i % 5],
  })).sort((a, b) => b.frequency - a.frequency);

  const maxFreq = Math.max(...words.map((w) => w.frequency));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
          <p className="text-sm text-slate-600 mt-1">
            {t('subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
          </select>
          <div className="inline-flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setTimeRange("daily")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${timeRange === "daily"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600"
                }`}
            >
              {t('daily')}
            </button>
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${timeRange === "weekly"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600"
                }`}
            >
              {t('weekly')}
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${timeRange === "monthly"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600"
                }`}
            >
              {t('monthly')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center min-h-80 p-6 bg-slate-50 rounded-xl">
        {words.map((word, index) => {
          const size = 50 + (word.frequency / maxFreq) * 100;
          const fontSize = 11 + (word.frequency / maxFreq) * 12;

          return (
            <div
              key={index}
              className={`${word.color} rounded-full flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform cursor-pointer shadow-lg`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${fontSize}px`,
              }}
              title={`${word.word}: ${word.frequency} times`}
            >
              {word.word}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-5 gap-4 text-center">
          {words.slice(0, 5).map((word, index) => (
            <div key={index}>
              <div className="text-xl font-bold text-slate-900">
                {word.frequency}
              </div>
              <div className="text-sm text-slate-600">{word.word}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LearningVelocity = () => {
  const t = useTranslations('Statistics.velocity');
  const weeks = Array.from({ length: 8 }, (_, i) => ({
    week: i + 1,
    wordsLearned: Math.floor(Math.random() * 50) + 20,
    retentionRate: Math.floor(Math.random() * 30) + 70,
  }));

  const maxWords = Math.max(...weeks.map((w) => w.wordsLearned));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
        <p className="text-sm text-slate-600 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {weeks.map((week, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 text-sm font-medium text-slate-600">
              W{week.week}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-end pr-2"
                    style={{
                      width: `${(week.wordsLearned / maxWords) * 100}%`,
                    }}
                  >
                    <span className="text-white text-xs font-semibold">
                      {week.wordsLearned}
                    </span>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-semibold ${week.retentionRate >= 85
                    ? "bg-emerald-100 text-emerald-700"
                    : week.retentionRate >= 70
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {week.retentionRate}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-indigo-600">287</div>
          <div className="text-xs text-slate-600">{t('total')}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-600">82%</div>
          <div className="text-xs text-slate-600">{t('retention')}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">36</div>
          <div className="text-xs text-slate-600">{t('rate')}</div>
        </div>
      </div>
    </div>
  );
};

import { Navbar } from "@/components/common/Navbar";

const StatisticsPage = () => {
  const t = useTranslations('Statistics.header');
  const { entries } = usePersistenceStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">

          {/* Quick Stats - Spans full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <QuickStats entries={entries} />
          </div>

          {/* Heatmap - Spans 2 cols */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <WritingHeatmap entries={entries} />
          </div>

          {/* Level Progress - Spans 1 col */}
          <div className="col-span-1 lg:col-span-1">
            <LevelProgress entries={entries} />
          </div>

          {/* Vocabulary Chart - Spans 1 col */}
          <div className="col-span-1 lg:col-span-1">
            <VocabularyChart entries={entries} />
          </div>

          {/* Word Bubbles - Spans 2 cols */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <WordBubbles entries={entries} />
          </div>

          {/* Learning Velocity - Spans 2 cols */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <LearningVelocity />
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
