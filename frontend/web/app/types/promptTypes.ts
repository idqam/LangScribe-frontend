export type RequestState = "idle" | "loading" | "ready";

export interface PromptStore {
  allPrompts: Prompt[];
  currentPrompt: Prompt | null;

  languageCode: string;
  category: string;
  topic: string;
  proficiency: string;
  complexity: string;

  requestState: RequestState;

  loadPrompts: () => void;

  buildRequest: () => PromptRequest;

  randomizePrompt: () => void;

  setLanguage: (lang: string) => void;
  setCategory: (c: string) => void;
  setTopic: (t: string) => void;
  setProficiency: (p: string) => void;
  setComplexity: (c: string) => void;
}

export interface Prompt {
  id: string;
  language: string;
  category: string;
  topic: string;
  prompt: string;
  proficiency: string;
  complexity: string;
  tags?: string[];
}

export interface PromptRequest {
  language: string;
  category: string;
  topic: string;
  proficiency: string;
  complexity: string;
  strict?: boolean;
  tags?: string[];
}

export interface UIPromptCardProps {
  prompt?: string | null;
  level?: string;
  topic?: string | null;
  onRandom?: () => void;
}
export type UILanguageCode = string;
export type UICategory = string;
export type UITopic = string;
export type UIDifficulty = string;
