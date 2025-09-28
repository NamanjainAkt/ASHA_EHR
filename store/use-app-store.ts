import { create } from 'zustand';

interface AppState {
  isOffline: boolean;
  toggleOffline: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOffline: false,
  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),
}));
