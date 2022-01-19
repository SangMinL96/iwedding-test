import { FormState, useFormStore } from '@feature/QnA/hooks/useFormStore';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { haveAccessToken } from '@service/TokenService';
import { fetchFromIBrand, postFormDataToIBrand } from '@utils/fetcher';
import { getDeviceType } from '@utils/getDeviceType';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import shallow from 'zustand/shallow';
import {
  ApiMyListResponse,
  ApiResponse,
  GetTalkTypeProps,
  GetTalkTypeResponse,
  IdTitle,
  MainCategoryProps,
  MainCategoryResponse,
  QnAProps,
} from './QnAInterface';

const FETCH_TALKTYPE_URL = 'js_data/get_talk_type';
const FETCH_QnALIST_URL = 'js_data/get_my_wedding_talk';
const DELETE_QnA_URL = 'js_data/delete_wedding_talk';
const UPDATE_QnA_URL = 'js_data/update_wedding_talk';
const REQUEST_TALK_URL = 'js_data/request_wedding_talk';
const FETCH_MAIN_CATEGORY = 'js_data/get_main_category';
const LOG_VIEW_ANSWER = 'js_data/wedding_talk_answer_view';

// 답변확인 한 경우 로그 발송
export const logViewAnswer = async (id: number) => {
  const fd = new FormData();
  fd.append('no', String(id));
  fd.append('device', String(getDeviceType()));
  await postFormDataToIBrand(LOG_VIEW_ANSWER, fd);
};

// 문의유형 가져오기
export const useTalkType = () => {
  const router = useRouter();
  const [list, setList] = useState<IdTitle[]>([]);
  const [category, mainCategory, params, setCategory, setFormTitle] = useFormStore(
    useCallback(state => [state.category, state.mainCategory, state.params, state.setCategory, state.setFormTitle], []),
    shallow,
  );

  // 패머리터에 따른 문의 유형 가져오기
  const [ttParams, setTTParams] = useState<Omit<GetTalkTypeProps, 'device'>>({});
  useDeepEffect(() => {
    if (router.isReady && /form/.test(router.pathname) && Object.keys(router.query).length) {
      // URL 쿼리로 받을 경우
      setTTParams(router.query);
    }
    if (category) {
      if (category.id === 0) {
        // param이 없을 경우(기타 문의하기)
        setTTParams({ main_category: mainCategory });
      } else if (category.id === 2) {
        setTTParams({ product_no: String(params.productNo), enterprise_code: String(params.enterCode) });
      } else if (category.id === 5) {
        //견적함
        if (params.is_realtime === '실시간') {
          setTTParams({ quotation_no: params.quotation_no as string, main_category: mainCategory, is_realtime: params.is_realtime });
        } else {
          setTTParams({ quotation_no: params.quotation_no as string, main_category: mainCategory });
        }
      } else if (category.id === 6) {
        setTTParams({ honeymoon: '1', contents_category: '6' });
      } else if (category.id === 7) {
        //알림센터
        setTTParams({ list_no: params.list_no as string });
      } else if (category.id === 8) {
        //결제내역
        setTTParams({ order_no: params.order_no as string, goods_no: params.goods_no as string });
      } else if (category.id === 9) {
        //결제내역
        setTTParams({ rsvcenter: params.rsvcenter as string, main_category: mainCategory });
      } else {
        setTTParams({ ...ttParams, brandplus_no: String(params.brandNo) });
      }
    }
  }, [params, mainCategory]);

  const fetch = async () => {
    // SWR에 param어떻게 넣는 지 몰라서 그냥 axios 사용함
    const data = await fetchFromIBrand<GetTalkTypeResponse>(FETCH_TALKTYPE_URL, { ...ttParams, device: getDeviceType() });
    if (data?.result) {
      const { category, title, talkType } = parseGetTalkType(data);
      setCategory(category);
      if (category.id === 7) {
        setFormTitle(category.title);
      } else {
        setFormTitle(title);
      }
      setList(talkType);
    }
  };
  // SWR을 못써서 param값이 바꼈을 때만 다시 호출하게 임의로 만듦. SWR쓰는게 베스트
  useDeepEffect(() => {
    if (category?.id === 5) {
      if (Object.keys(ttParams).length && mainCategory && mainCategory !== '') fetch();
    } else {
      if (Object.keys(ttParams).length) fetch();
    }
  }, [ttParams]);

  return { list, fetch };
};

// ibrandplus에서 사용하는 useMainCategory랑 이름 겹치니까 알아서 바꿔도 됨.
export const useMainCategory = (query: any) => {
  const { data, isValidating } = useSWR<MainCategoryResponse>(FETCH_MAIN_CATEGORY, url =>
    haveAccessToken() ? fetchFromIBrand(url, query) : null,
  );
  const [categoryList, setCategoryList] = useState<MainCategoryProps[]>([]);

  useDeepEffect(() => {
    if (data?.result) {
      setCategoryList(parseMainCategory(data));
    }
  }, [data, isValidating]);

  return { categoryList, isValidating };
};

// 유저가 등록한 문의내역
export const useQnAList = (onlyMutate = false) => {
  const { data, mutate, isValidating } = useSWR<any>(FETCH_QnALIST_URL, haveAccessToken() && !onlyMutate ? fetchFromIBrand : null);

  return {
    list: data?.data?.map((d, index) => ({ ...parseQnAResponse(d), displayID: data?.data?.length - index })),
    mutateList: mutate,
    isValidating,
  };
};

// 문의하기
export const requestQnA = async ({ params, category, mainCategory, talkType, title, body, images }: Partial<FormState>) => {
  const formData = new FormData();
  console.log(params);
  if (category.id === 0) {
    // 기타
    formData.append('main_category', mainCategory);
  } else if (category.id === 2) {
    // 상품
    formData.append('product_no', String(params.productNo) ?? '');
    formData.append('enterprise_code', params.enterCode ?? '');
  } else if (category.id === 5) {
    //견적함
    formData.append('main_category', mainCategory);
    formData.append('quotation_no', params.quotation_no);
  } else if (category.id === 6) {
    // 신혼여행
    formData.append('honeymoon', '1');
  } else if (category.id === 8) {
    // 결제내역
    formData.append('order_no', params.order_no);
    formData.append('goods_no', params.goods_no);
  } else if (category.id === 7) {
    // 알림센터
    formData.append('list_no', params.list_no);
  } else if (category.id === 9) {
    // 예약센터
    formData.append('rsvcenter', params.rsvcenter);
  } else {
    formData.append('brandplus_no', String(params?.brandNo) ?? '');
  }
  formData.append('contents_category', String(category?.id ?? ''));
  formData.append('talk_type', String(talkType?.id ?? ''));
  formData.append('title', title);
  formData.append('contents', body);
  formData.append('device', String(getDeviceType()));
  images?.forEach(({ image }, i) => formData.append(`attach_image${i + 1}`, image));
  const data = await postFormDataToIBrand<ApiResponse>(REQUEST_TALK_URL, formData);
  return data?.result;
};

// 문의내역 삭제
export const deleteQnA = async (id: number) => {
  const response = await fetchFromIBrand<ApiResponse>(DELETE_QnA_URL, { no: id });
  console.log(`delete response`, response);
  return response.result;
};

// 문의내역 수정
export const updateQnA = async ({
  id,
  talkType,
  category,
  params,
  mainCategory,
  title,
  body,
  deletedDBImages,
  images,
}: Partial<FormState> & { id: number }) => {
  const formData = new FormData();

  formData.append('no', String(id));
  if (category.id === 0) {
    // 기타
    formData.append('main_category', mainCategory);
  } else if (category.id === 2) {
    // 상품
    formData.append('product_no', String(params.productNo) ?? '');
    formData.append('enterprise_code', params.enterCode ?? '');
  } else {
    formData.append('brandplus_no', String(params.brandNo) ?? '');
  }
  formData.append('contents_category', String(category?.id ?? ''));
  formData.append('talk_type', String(talkType?.id ?? ''));
  formData.append('title', title);
  formData.append('contents', body);
  formData.append('device', String(getDeviceType()));
  deletedDBImages?.forEach(dbi => formData.append(`attach_image${dbi}_del`, '1'));
  images?.forEach(({ image }, i) => formData.append(`attach_image${i + 1}`, image));

  const { result } = await postFormDataToIBrand(UPDATE_QnA_URL, formData);

  return result;
};

/**
 * Parsers
 * API호출로 넘어온 데이터를 TS에 맞게 변수 이름 변경
 */
const parseGetTalkType = (res: GetTalkTypeResponse) => ({
  category: { id: res?.data.contents_category, title: res?.data.contents_category_text },
  title: res?.data.title,
  talkType: res?.data.talk_type.map(({ no, talk_type }) => ({ id: Number(no), title: talk_type })),
});

export const parseQnAResponse = (res: ApiMyListResponse): Omit<QnAProps, 'displayID'> => {
  const images = [res.attach_image1, res.attach_image2, res.attach_image3, res.attach_image4].filter(i => i !== '');
  return {
    id: Number(res.no),
    contentsCategory: { id: Number(res.contents_category), title: res.contents_category_text },
    mainCategory: res.main_category,
    talkType: { id: Number(res.talk_type_no), title: res.talk_type_contents },
    title: res.title,
    created: res.reg_date,
    request: res.contents,
    dbImages: images.map((img, i) => ({ id: i + 1, title: img })),
    answer: res.answer,
    status: res.answer_status_text,
    editable: res.answer_status_text == '미완료',
    product: Number(res?.product_no),
    brand: res?.brandplus_no,
    enterprise: res?.enterprise_code,
    thumbnail: res.thumbnail,
    contentsUrl: res.contents_url,
    itemTitle: res.item_title?.length ? res.item_title : res.get_talk_type?.data?.title,
    quotation_no: res?.quotation_no,
    list_no: res?.list_no,
    order_no: res?.order_no,
    goods_no: res?.goods_no,
  };
};

const parseMainCategory = (res: MainCategoryResponse): MainCategoryProps[] => {
  return res.data.map(({ category, category_name }) => ({ category: category, categoryName: category_name }));
};
