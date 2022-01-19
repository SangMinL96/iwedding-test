import create from 'zustand';

export interface StoreState {
  selectedCategory: number; // id
  selectedTag: string;
  setSelectedCategory: (category: number) => void;
  setSelectedTag: (tag: string) => void;
}

export const useProductState = create<StoreState>(set => ({
  selectedCategory: 0,
  selectedTag: '전체',
  setSelectedCategory: category => set(() => ({ selectedCategory: category })),
  setSelectedTag: tag => set(() => ({ selectedTag: tag })),
}));
