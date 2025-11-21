import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WritingPadState {
  text: string;
  wordCount: number;
  charCount: number;
  sentenceCount: number;

  setText: (text: string) => void;
  reset: () => void;
}

export const useWritingPadStore = create<WritingPadState>()(
  immer((set) => ({
    text: "",
    wordCount: 0,
    charCount: 0,
    sentenceCount: 0,

    setText: (text) =>
      set((state) => {
        state.text = text;

        const trimmed = text.trim();

        state.charCount = text.length;
        state.wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
        state.sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
      }),

    reset: () =>
      set((state) => {
        state.text = "";
        state.wordCount = 0;
        state.charCount = 0;
        state.sentenceCount = 0;
      }),
  }))
);
