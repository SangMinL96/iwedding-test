import { CategoryProps } from '@modules/sharedData';
import { SortType } from '@utils/sortOptions';
import create from 'zustand';

const defaultState = {
  searchKeyword: '',
  currentSort: undefined,
  page: 1,
  infinityPage: 1,
  scrollLoading: false,
  selectedCategory: undefined,
  dataMutate: undefined,
};
export interface BbsPageState {
  selectedCategory: CategoryProps;
  searchKeyword: string;
  currentSort: SortType;
  page: number;
  scrollLoading: boolean;
  infinityPage?: number;
  dataMutate?: any;
  setDataMutate: (mutate: any) => void;
  setSelectedCategory: (category: CategoryProps) => void;
  setSearchKeyword: (keyword: string) => void;
  setCurrentSort: (sort: SortType) => void;
  setPage: (page: number) => void;
  resetState: () => Promise<void>;
  setInfinityPage: () => void;
  setResetInfinityPage: () => void;
}

export const useBbsPageState = create<BbsPageState>(set => ({
  ...defaultState,
  setSelectedCategory: category => set(() => ({ selectedCategory: category, page: 1, infinityPage: 1, currentSort: undefined })),
  setSearchKeyword: keyword => Promise.resolve(set(() => ({ searchKeyword: keyword }))),
  setCurrentSort: sort => set(() => ({ currentSort: sort, infinityPage: 1 })),
  setPage: page => set(() => ({ page, infinityPage: 1 })),
  resetState: () => Promise.resolve(set(() => ({ ...defaultState }))),
  setInfinityPage: () => set(state => ({ infinityPage: state.infinityPage + 1 })),
  setResetInfinityPage: () => set(() => ({ infinityPage: 1 })),
  setDataMutate: mutate => set(() => ({ dataMutate: mutate })),
}));
