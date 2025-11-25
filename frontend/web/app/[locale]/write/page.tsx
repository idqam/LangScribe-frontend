import React from "react";
import { PromptCardFunc } from "./PromptCardFunc";
import { WritingPad } from "@/components/writing/WritingPad";
import { InsightsPanel } from "@/components/analytics/InsightsPanel";
import { LLMInsightsPanel } from "@/components/analytics/LLMInsightsPanel";
import { Navbar } from "@/components/common/Navbar";

const WritingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <PromptCardFunc />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[600px]">
            <WritingPad />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <LLMInsightsPanel />
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
