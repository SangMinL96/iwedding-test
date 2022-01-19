import { IdTitle, ImageProps } from '@modules/mypage/QnA/QnAInterface';
import create from 'zustand';
import shallow from 'zustand/shallow';

export interface QnAParams {
  productNo?: number | string;
  brandNo?: string;
  enterCode?: string;
  quotation_no?: string;
  list_no?: string;
  order_no?: string;
  goods_no?: string;
  is_realtime?: string;
  rsvcenter?: string;
}

export interface FormState {
  id?: number; // DB에 저장된 ID값
  category: IdTitle; // QnAInterface.ts -> QnACategory 참조
  mainCategory: string; // 업종(사진/드레스/촬영/etc...)
  formTitle: string; // 카테고리가 '기타'가 아닐 경우의 상품명/컨텐츠명 등
  params: QnAParams; // brandplus_no, product_no, enterprise_code
  talkType: IdTitle; // 유저가 선택한 문의유형(왜 talkType이라고 이름을 지었는지는 나도 모름)
  title: string; // 유저가 입력한 제목
  body: string; // 유저가 입력한 내용
  images: ImageProps[]; // 유저가 현 세션에서 넣은 이미지(File Type) DB에 저장된 것과 타입이 다름
  dbImages: IdTitle[]; // DB에 저장된 유저가 기존에 넣은 이미지
  deletedDBImages: number[]; // DB에 기존에 저장되어 있던 이미지를 지울 경우 사용
}

interface FormUpdaters {
  setID: (id: number) => void;
  setCategory: (cat: IdTitle) => void;
  setMainCategory: (mainCat: string) => void;
  setFormTitle: (title: string) => void;
  setParams: (params: QnAParams) => void;
  setTalkType: (tt: IdTitle) => void;
  setTitle: (title: string) => void;
  setBody: (text: string) => void;
  addImage: (img: ImageProps) => void;
  setDBImages: (images: IdTitle[]) => void;
  removeImage: (img: ImageProps) => void;
  removeDBImage: (img: IdTitle) => void;
  resetForm: () => void;
}

const defaultState: FormState = {
  category: undefined,
  mainCategory: '',
  formTitle: '',
  params: undefined,
  talkType: null,
  title: '',
  body: '',
  images: [],
  dbImages: [],
  deletedDBImages: [],
};

export const useFormStore = create<FormState & FormUpdaters>(set => ({
  ...defaultState,
  setID: (id: number) => set(() => ({ id })),
  setCategory: (cat: IdTitle) => set(() => ({ category: cat })),
  setMainCategory: (mainCat: string) => set(() => ({ mainCategory: mainCat })),
  setFormTitle: (title: string) => set(() => ({ formTitle: title })),
  setParams: (params: QnAParams) => set(() => ({ params })),
  setTalkType: (tt: IdTitle) => set(() => ({ talkType: tt })),
  setTitle: (title: string) => set(() => ({ title })),
  setBody: (text: string) => set(() => ({ body: text })),
  addImage: image => set(state => ({ images: [...state.images, image] })),
  setDBImages: images => set(() => ({ dbImages: images })),
  removeImage: img => set(state => ({ images: state.images.filter(i => i.image.name !== img.image.name) })),
  removeDBImage: img => set(state => ({ deletedDBImages: [...state.deletedDBImages, img.id] })),
  resetForm: () => set({ ...defaultState }),
}));

export const useIsFormValid = () => {
  const [title, body, talkType] = useFormStore(state => [state.title, state.body, state.talkType], shallow);

  return !!(title.length && body.length && talkType);
};

useFormStore.subscribe(console.log);
