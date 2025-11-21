import React from "react";

const WritingNavigation = () => {
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
              <a href="#" className="text-indigo-600 font-medium">
                Write
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Review
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Statistics
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              <span>7 day streak</span>
            </div>

            <button className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold hover:bg-indigo-200 transition-colors">
              JD
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PromptCard = ({ prompt, level, topic }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
            {level}
          </div>
          <div className="px-3 py-1 bg-white text-slate-600 rounded-full text-xs font-medium border border-slate-200">
            {topic}
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
          Today's Writing Prompt
        </h2>
        <p className="text-2xl font-semibold text-slate-900 leading-relaxed">
          {prompt}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Suggested: 200-300 words</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>15 min</span>
        </div>
      </div>
    </div>
  );
};

const WritingPad = ({ wordCount, charCount }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="border-b border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-semibold">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">
            <span className="font-semibold text-slate-700">{wordCount}</span>{" "}
            words
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            <span className="font-semibold text-slate-700">{charCount}</span>{" "}
            characters
          </span>
        </div>
      </div>

      <div className="flex-1 p-6">
        <textarea
          className="w-full h-full resize-none focus:outline-none text-slate-900 text-lg leading-relaxed placeholder:text-slate-400"
          placeholder="Start writing your response here..."
          defaultValue="Today I woke up feeling energized and ready to tackle the day. The morning sun was streaming through my window, and I could hear birds chirping outside. I decided to make myself a healthy breakfast - some scrambled eggs with toast and fresh orange juice.

After breakfast, I spent some time reading a book I've been enjoying lately. It's a mystery novel that keeps me on the edge of my seat. The author has a way of building suspense that makes it hard to put down.

Later in the afternoon, I went for a walk in the park near my house. The weather was perfect - not too hot, with a gentle breeze. I noticed how the leaves on the trees were starting to change color, signaling the approach of autumn. There were families having picnics and children playing on the playground.

In the evening, I called my best friend and we talked for nearly an hour, catching up on each other's lives. We made plans to meet next weekend for coffee. It felt good to connect with someone I care about."
        />
      </div>

      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-slate-600">Auto-saved just now</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2">
            Log
          </button>
        </div>
      </div>
    </div>
  );
};

const InsightsPanel = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Writing Insights
          </h3>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            label="Words"
            value="187"
            subtext="Target: 200-300"
            positive={undefined}
          />

          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
            label="Unique Words"
            value="142"
            subtext="+8 from last entry"
            positive
          />

          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            label="Complexity"
            value="B2"
            subtext="Advanced"
            positive={undefined}
          />

          <StatItem
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            label="Time Writing"
            value="12m"
            subtext="This session"
            positive={undefined}
          />
        </div>

        <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Generate AI Insights
        </button>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">Quick Tip</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Try using more descriptive adjectives to enhance your writing.
              Consider words like "vibrant," "serene," or "bustling."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Recent Progress</h4>
        <div className="space-y-3">
          <ProgressItem date="Yesterday" words="245" score="88" />
          <ProgressItem date="2 days ago" words="198" score="82" />
          <ProgressItem date="3 days ago" words="312" score="91" />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, subtext, positive }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-600 mb-0.5">{label}</div>
        <div className="font-semibold text-slate-900 text-lg">{value}</div>
      </div>
      <div
        className={`text-xs ${
          positive ? "text-emerald-600" : "text-slate-500"
        }`}
      >
        {subtext}
      </div>
    </div>
  );
};

const ProgressItem = ({ date, words, score }) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{date}</span>
      <div className="flex items-center gap-3">
        <span className="text-slate-500">{words} words</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-slate-700 font-medium">{score}</span>
        </div>
      </div>
    </div>
  );
};

const WritingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <WritingNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <PromptCard
            prompt="Describe a memorable moment from your childhood that taught you an important life lesson. What happened, and how did it shape who you are today?"
            level="B2"
            topic="Personal Growth"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 min-h-[600px]">
            <WritingPad wordCount={187} charCount={1024} />
          </div>

          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
