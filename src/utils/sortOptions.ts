export interface ISort {
  method: SortType;
  title: string;
  value?: string | '';
}

export type SortType =
  | 'latest'
  | 'latest_zzim'
  | 'name'
  | 'max_price'
  | 'min_price'
  | 'max_items'
  | 'min_items'
  | 'ent_name'
  | 'max_order'
  | 'recommendations'
  | 'zzim'
  | 'newest'
  | 'event'
  | 'click'
  | 'ratings'
  | 'max_price'
  | 'min_price';

export const storeSortOptions: ISort[] = [
  { method: 'latest', title: '최근수정순' },
  { method: 'name', title: '이름순' },
  { method: 'max_price', title: '높은견적순' },
  { method: 'min_price', title: '낮은견적순' },
  { method: 'max_items', title: '상품많은순' },
  { method: 'min_items', title: '상품적은순' },
];

export const productSortOptions: ISort[] = [
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'max_price', title: '높은가격순' },
  { method: 'min_price', title: '낮은가격순' },
  { method: 'zzim', title: '찜순' },
  { method: 'latest', title: '최신순' },
  { method: 'name', title: '가나다순' },
];

export const brandSortOptions: ISort[] = [
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'ratings', title: '평점순' },
  { method: 'newest', title: '신규입점순' },
  { method: 'zzim', title: '찜순' },
  { method: 'ent_name', title: '업체명순' },
];

export const contentsSortOptions: ISort[] = [
  { method: 'latest', title: '최신순' },
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'zzim', title: '찜순' },
  { method: 'name', title: '가나다순' },
];

export const eventSortOptions: ISort[] = [
  { method: 'latest', title: '최신순' },
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'event', title: '마감임박순' },
  { method: 'name', title: '가나다순' },
];

// zzim sort options

export const zzimBrandSortOptions: ISort[] = [
  { method: 'latest_zzim', title: '최근 찜한순' },
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'ratings', title: '평점순' },
  { method: 'newest', title: '신규입점순' },
  { method: 'zzim', title: '찜순' },
  { method: 'name', title: '가나다순' },
];

export const zzimContentsSortOptions: ISort[] = [
  { method: 'latest_zzim', title: '최근 찜한순' },
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'zzim', title: '찜순' },
  { method: 'latest', title: '최신순' },
  { method: 'name', title: '가나다순' },
];

export const zzimStoreSortOptions: ISort[] = [
  { method: 'latest_zzim', title: '최근 찜한순' },
  { method: 'click', title: '인기순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'zzim', title: '찜순' },
  { method: 'latest', title: '최신순' },
  { method: 'name', title: '가나다순' },
];

export const zzimEventSortOptions: ISort[] = [
  { method: 'latest_zzim', title: '최근 찜한순' },
  { method: 'click', title: '인기순' },
  { method: 'latest', title: '최신순' },
  { method: 'event', title: '마감임박순' },
  { method: 'recommendations', title: '추천순' },
  { method: 'name', title: '가나다순' },
];