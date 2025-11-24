"use client"
import React from "react";
import { useTranslations } from "next-intl";

const StatsNavigation = () => {
  const t = useTranslations('Writing.nav');
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                LangScribe
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t('write')}
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t('review')}
              </a>
              <a href="#" className="text-indigo-600 font-medium">
                {t('statistics')}
              </a>
            </div>
          </div>

          <button className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold hover:bg-indigo-200 transition-colors">
            JD
          </button>
        </div>
      </div>
    </nav>
  );
};

const QuickStats = () => {
  const t = useTranslations('Statistics.quickStats');
  const stats = [
    {
      label: t('streak'),
      value: "28",
      unit: "days",
      color: "from-orange-500 to-red-500",
    },
    {
      label: t('entries'),
      value: "156",
      unit: "entries",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: t('words'),
      value: "2,847",
      unit: "words",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: t('quality'),
      value: "84",
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

const WritingHeatmap = () => {
  const [timeRange, setTimeRange] = React.useState("weekly");
  const t = useTranslations('Statistics.heatmap');

  const generateWeeklyData = () => {
    return Array.from({ length: 12 }, () =>
      Array.from({ length: 7 }, () =>
        Math.random() > 0.3 ? Math.floor(Math.random() * 2000) : 0
      )
    );
  };

  const generateMonthlyData = () => {
    return Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 10000) + 2000
    );
  };

  const weeks = generateWeeklyData();
  const months = generateMonthlyData();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getColor = (value: number, max: number) => {
    if (value === 0) return "bg-slate-100";
    const intensity = value / max;
    if (intensity < 0.25) return "bg-emerald-200";
    if (intensity < 0.5) return "bg-emerald-400";
    if (intensity < 0.75) return "bg-emerald-600";
    return "bg-emerald-700";
  };

  const renderWeeklyView = () => {
    const maxValue = Math.max(...weeks.flat());

    return (
      <div>
        <div className="grid grid-cols-8 gap-2 mb-3">
          <div className="text-xs text-slate-500"></div>
          {days.map((day, i) => (
            <div
              key={i}
              className="text-xs text-slate-500 text-center font-medium"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-8 gap-2">
              <div className="text-xs text-slate-500 font-medium flex items-center">
                W{weekIndex + 1}
              </div>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`h-8 rounded ${getColor(
                    day,
                    maxValue
                  )} hover:ring-2 hover:ring-indigo-400 transition-all cursor-pointer`}
                  title={`${day} words`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthlyView = () => {
    const maxValue = Math.max(...months);

    return (
      <div className="grid grid-cols-12 gap-3">
        {months.map((value, index) => (
          <div key={index} className="text-center">
            <div
              className={`h-24 rounded-lg ${getColor(
                value,
                maxValue
              )} hover:ring-2 hover-ring-indigo-400 transition-all cursor-pointer flex items-end justify-center pb-2`}
            >
              <span className="text-xs font-semibold text-white">
                {monthNames[index]}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-2">
              {(value / 1000).toFixed(1)}k
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
          <p className="text-sm text-slate-600 mt-1">
            {t('subtitle')}
          </p>
        </div>
        <div className="inline-flex items-center bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setTimeRange("weekly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === "weekly"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600"
              }`}
          >
            {t('weekly')}
          </button>
          <button
            onClick={() => setTimeRange("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === "monthly"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-600"
              }`}
          >
            {t('monthly')}
          </button>
        </div>
      </div>

      {timeRange === "weekly" ? renderWeeklyView() : renderMonthlyView()}

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>{t('less')}</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-slate-100 rounded"></div>
            <div className="w-4 h-4 bg-emerald-200 rounded"></div>
            <div className="w-4 h-4 bg-emerald-400 rounded"></div>
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <div className="w-4 h-4 bg-emerald-700 rounded"></div>
          </div>
          <span>{t('more')}</span>
        </div>
        <div className="text-sm text-slate-600">
          {t('total', { count: '24,589' })}
        </div>
      </div>
    </div>
  );
};

const VocabularyChart = () => {
  const t = useTranslations('Statistics.vocabulary');
  const data = [
    { day: "Mon", common: 85, new: 15 },
    { day: "Tue", common: 78, new: 22 },
    { day: "Wed", common: 82, new: 18 },
    { day: "Thu", common: 75, new: 25 },
    { day: "Fri", common: 80, new: 20 },
    { day: "Sat", common: 88, new: 12 },
    { day: "Sun", common: 90, new: 10 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          {t('title')}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                {item.day}
              </span>
              <span className="text-xs text-slate-500">
                {item.common + item.new} words
              </span>
            </div>
            <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${item.common}%` }}
              >
                {item.common}%
              </div>
              <div
                className="bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${item.new}%` }}
              >
                {item.new}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-slate-600">{t('common')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm text-slate-600">{t('new')}</span>
        </div>
      </div>
    </div>
  );
};

const LevelProgress = () => {
  const t = useTranslations('Statistics.level');
  const levels = [
    { level: "A1", name: "Beginner", progress: 100, color: "bg-emerald-500" },
    { level: "A2", name: "Elementary", progress: 100, color: "bg-emerald-500" },
    {
      level: "B1",
      name: "Intermediate",
      progress: 100,
      color: "bg-emerald-500",
    },
    {
      level: "B2",
      name: "Upper Intermediate",
      progress: 65,
      color: "bg-indigo-500",
    },
    { level: "C1", name: "Advanced", progress: 0, color: "bg-slate-300" },
    { level: "C2", name: "Proficiency", progress: 0, color: "bg-slate-300" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('title')}</h3>
          <p className="text-sm text-slate-600 mt-1">{t('subtitle')}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">B2</div>
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

const WordBubbles = () => {
  const [limit, setLimit] = React.useState(10);
  const [timeRange, setTimeRange] = React.useState("weekly");
  const t = useTranslations('Statistics.bubbles');

  const words = Array.from({ length: limit }, (_, i) => ({
    word: [
      "write",
      "learn",
      "study",
      "practice",
      "improve",
      "language",
      "fluent",
      "vocab",
      "grammar",
      "speak",
      "read",
      "understand",
      "express",
      "daily",
      "progress",
    ][i],
    frequency: Math.floor(Math.random() * 100) + 20,
    color: [
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-blue-500",
      "bg-emerald-500",
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

const StatisticsPage = () => {
  const t = useTranslations('Statistics.header');
  return (
    <div className="min-h-screen bg-slate-50">
      <StatsNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          <QuickStats />

          <WritingHeatmap />

          <div className="grid lg:grid-cols-2 gap-6">
            <VocabularyChart />
            <LevelProgress />
          </div>

          <WordBubbles />

          <LearningVelocity />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
