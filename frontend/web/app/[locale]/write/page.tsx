import React from "react";
import { PromptCardFunc } from "./PromptCardFunc";
import { WritingPad } from "@/components/writing/WritingPad";
import { LLMInsightsPanel } from "@/components/analytics/LLMInsightsPanel";

import { Navbar } from "@/components/common/Navbar";

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Full-width Prompt Card */}
        <div className="mb-8">
          <PromptCardFunc />
        </div>

        {/* Main Content: 60/40 Split */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Writing Area - 60% (3 columns) */}
          <div className="lg:col-span-3">
            <WritingPad />
          </div>

          {/* Insights Sidebar - 40% (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <LLMInsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
