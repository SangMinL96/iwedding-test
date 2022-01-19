import { SyntheticEvent } from 'react';
export interface QnAProps {
  id?: number; // 문의하기 ID
  displayID?: number | 'No';
  contentsCategory: IdTitle; // 상품 분류(브랜드/상품/이벤트/콘텐츠)
  mainCategory?: string;
  brand?: string;
  enterprise?: string;
  product?: number; // 분류된 상품의 이름(업체명/상품명 등)
  talkType: IdTitle; // 문의 유형
  created: string; // 작성일시
  title: string;
  request: string; // 문의 내용
  images?: ImageProps[]; // 고객이 추가한 이미지들
  dbImages?: IdTitle[]; // DB에서 온 이미지들
  answer?: string; // 답변 내용
  header?: boolean; // 스타일링용 헤더 불리안
  status?: string;
  editable?: boolean; // 수정가능한 지 여부
  thumbnail?: string; // 아이템 썸네일
  contentsUrl?: string; // 아이템 상품 페이지
  itemTitle?: string; // 상품/브랜드 등 이름
  onDelete?: (id: number) => (e: SyntheticEvent) => void;
  quotation_no?: string;
  list_no?: string;
  order_no?: string;
  goods_no?: string;
}

export interface ImageProps {
  image: File;
  preview: string;
}
export interface QnAHeaderProps extends QnAProps {
  onClick?: (e: SyntheticEvent) => void;
  open?: boolean;
}
export interface IdTitle {
  id: number;
  title: string;
}

export interface EnterpriseProps {
  id: number | string;
  name: string;
}

export const QnACategory: IdTitle[] = [
  { id: 0, title: '기타' },
  { id: 1, title: '브랜드' },
  { id: 2, title: '상품' },
  { id: 3, title: '이벤트' },
  { id: 4, title: '콘텐츠' },
  { id: 5, title: '견적함' },
  { id: 6, title: '신혼여행' },
  { id: 7, title: '알림센터' },
  { id: 8, title: '결제내역' },
  { id: 9, title: '예약센터' },
];
export interface MainCategoryProps {
  category: string;
  categoryName: string;
}

export interface MainCategoryResponse extends ApiResponse {
  data: {
    category: string;
    category_name: string;
  }[];
}
export interface GetTalkTypeProps {
  product_no?: string;
  enterprise_code?: string;
  brandplus_no?: string;
  main_category?: string;
  device: number;
  honeymoon?: string;
  quotation_no?: string;
  contents_category?: string;
  list_no?: string;
  order_no?: string;
  goods_no?: string;
  is_realtime?: string;
  rsvcenter?: string;
}

export interface GetTalkTypeResponse extends ApiResponse {
  data: {
    contents_category: number;
    contents_category_text: string;
    title: string; // title
    talk_type: ApiTalkType[];
  };
}

export interface UpdateQnAProps {
  no: number;
  talk_type: number;
  contents_category: number;
  main_category: string;
  title: string;
  contents: string;
  attach_image: File[];
  device: number;
}
export interface ApiTalkType {
  no: string;
  talk_type: string;
  index_order: string;
}
export interface GetMyQnAListResponse extends ApiResponse {
  data: ApiMyListResponse[];
}

export interface ApiMyListResponse {
  no: string;
  contents_category: string;
  contents_category_text: string;
  main_category?: string;
  brandplus_no?: string;
  enterprise_code?: string;
  product_no?: string;
  talk_type_no: string;
  talk_type_contents: string;
  title: string;
  contents: string;
  name: string;
  web_id: string;
  reg_date: string;
  quotation_no?: string;
  list_no?: string;
  order_no?: string;
  goods_no?: string;
  answer_status_text: string;
  answer: string;
  answer_date: string;
  attach_image1: string;
  attach_image2: string;
  attach_image3: string;
  attach_image4: string;
  get_talk_type: GetTalkTypeResponse;
  thumbnail?: string;
  contents_url?: string;
  item_title?: string;
}

export interface ApiResponse {
  result: boolean;
  description: string;
}
