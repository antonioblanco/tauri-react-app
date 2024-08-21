import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Snippet {
  name: string;
  code?: string | null;
  path: string;
}

interface SnippetState {
  selectedSnippet: Snippet | null;
  allSnipets: Snippet[];
  addSnippetName: (snippet: Snippet) => void;
  removeSnippetName: (name: string) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  setAllSnippets: (snippets: Snippet[]) => void;
}

export const useSnippetStore = create<SnippetState>()(
  devtools((set) => ({
    selectedSnippet: null,
    allSnipets: [],
    addSnippetName: (snippet) =>
      set((state) => ({ allSnipets: [...state.allSnipets, snippet] })),   
    removeSnippetName: (name) =>
      set((state) => ({
        allSnipets: state.allSnipets.filter((n) => n.name !== name),
      })),
    setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
    setAllSnippets: (snippets) => set({allSnipets: snippets})
  }))
);