import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TempAnState {
  savedText: string;
  wordCount: number;
  charCount: number;

  setSavedText: (text: string) => void;
}

export const useTempAnStore = create<TempAnState>()(
  immer((set) => ({
    savedText: "",
    wordCount: 0,
    charCount: 0,

    setSavedText: (text) =>
      set((state) => {
        state.savedText = text;

        const trimmed = text.trim();

        state.charCount = text.length;
        state.wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
        console.log("saving text");
        console.log(state.savedText);
      }),
  }))
);
