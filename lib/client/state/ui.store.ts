import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface UIState {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  theme: ThemeMode;
  toggleSearch: () => void;
  toggleMobileNav: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  mobileNavOpen: false,
  theme: 'system',

  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  setTheme: (theme) => set({ theme }),
}));
