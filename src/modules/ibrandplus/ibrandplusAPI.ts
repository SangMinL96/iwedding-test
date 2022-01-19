import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { fetcher } from '@utils/fetcher';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import shallow from 'zustand/shallow';
import { BBSItem, BBSTag, SubCategoryResponse, TagProps, TagResponse } from './ibrandplusInterface';

export const BrandPagination = 'brand_pagination';
export const EventPagination = 'event_pagination';
export const ContentsPagination = 'contents_pagination';

// 이 값 그대로 노드쪽에서 사용함.
export enum ContentsCategory {
  BRAND = 1,
  PRODUCT,
  EVENT,
  CONTENTS,
  REVIEW,
}

// 개발용으로 로컬에서 노드 서버 열어서 사용하니까 일단 이렇게 해 둠
export const ibrandFetcher = async (url: string) => {
  if (process.env.NODE_ENV === 'development') {
    const { data } = await axios.get(url, { baseURL: `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/` });
    return data;
  }
  return await fetcher<any>(url);
};
export const useBBSData = ({ keyword, contentsCategory, category, sort, page: queryPage = 1, tag, isDeskTop, subCategory }: any) => {
  const [totalCount, setTotalCount] = useState(0);
  const queryCategory = category === '전체' ? '' : category;
  const querySubCategory = subCategory === '전체' ? '' : subCategory;
  const setResetInfinityPage = useBbsPageState(state => state.setResetInfinityPage, shallow);
  const setDataMutate = useBbsPageState(state => state.setDataMutate, shallow);
  // 모바일일때 실행되는 패치 API
  const fetcherApi = async paramUrl => {
    if (isDeskTop) {
      setResetInfinityPage();
      const data = await fetcher<{ items: any[]; meta: any }>(paramUrl);
      setTotalCount(data?.meta?.totalItems);
      return data;
    } else {
      const data = await fetcher<{ items: any[]; meta: any }>(paramUrl);
      setTotalCount(data?.meta?.totalItems);
      return data;
    }
  };
  //webFetcherApi가 아닌 PC가 아닐경우 수학 연산은 최대 페이지까지 도달후 계속 인피니티스크롤 되는걸 방지함
  const { data, isValidating, error, mutate, setSize, size } = useSWRInfinite(
    page =>
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/ibrandplus/searchTabList?category=${encodeURI(
        queryCategory,
      )}&keyword=${encodeURIComponent(keyword)}&contentsCategory=${encodeURI(contentsCategory)}&sort=${encodeURI(sort)}&page=${
        isDeskTop ? queryPage : page + 1
      }&tag=${encodeURIComponent(tag?.toString())}&subCategory=${querySubCategory}&device=${isDeskTop}`,
    category && category !== false ? fetcherApi : null,
  );
  useEffect(() => {
    if (!isDeskTop) {
      if (queryPage !== 1) {
        if (Math.ceil(totalCount / 40) >= queryPage - 1 - (totalCount === 0 ? 1 : 0)) {
          setSize(queryPage);
        }
      }
    }
  }, [queryPage]);
  useEffect(() => {
    setDataMutate(mutate);
  }, [mutate, setDataMutate]);

  //PC일경우에는 기존 데이터 그대로 리턴, 모바일은 1페이지일경우 기존 데이터 리턴, 2페이지부터 useState로 관리중인 dataList를 리턴
  if (data) {
    return {
      list: {
        items: isDeskTop ? data?.[0]?.items || [] : data?.flatMap(item => item.items) || [],
        meta: data?.[0]?.meta || { totalItems: 0 },
      },
      isValidating,
      error,
      mutate,
    };
  } else {
    return {
      list: { items: [], meta: { totalItems: 0 } },
      isValidating,
      error,
      mutate,
    };
  }
};

// 참조: https://dev-ifam.atlassian.net/wiki/spaces/~398916097/pages/242122919

export const useBBsMainCategory = (category: string, keyword: string = '') => {
  const url = `${
    process.env.NEXT_PUBLIC_LOCAL_API_HOST
  }/api/v1/ibrandplus/bbsMainCategory?category=${category}&keyword=${encodeURIComponent(keyword)}`;

  const fetcherApi = async paramsUrl => {
    const data = await fetcher<any>(paramsUrl);
    return data;
  };
  const { data, isValidating, error, mutate } = useSWR<any>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error, mutate };
};
/**
 * QnA에 업종 불러오는 거랑 같은 DB에서 가져옴.
 * 근데 QnA쪽은 PHP에서 가져오고, 이거는 Node에 만들어놔서 endpoint만 다름.
 */

export const useMainCategory = (category: string) => {
  const { data, isValidating, error, mutate } = useSWR(
    `/ibrandplus/mainCategory?category=${category}`,
    category !== 'all' ? ibrandFetcher : null,
    {
      dedupingInterval: 3600000,
    },
  );
  return { data, isValidating, error, mutate };
};

export const useIbrandplusBannerData = (contents_category: string, category: string = '사진') => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/ibrandplus/ibrandBanner?&category=${encodeURI(
    category,
  )}&contents_category=${contents_category}`;

  const fetcherApi = async () => {
    const data = await fetcher<any>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<any>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error };
};

export const useSubCategoryList = (mainCategory: string, keyword?: string, contentsCategory?: string) => {
  const { data, isValidating, error } = useSWR<SubCategoryResponse[]>(
    mainCategory
      ? `/ibrandplus/subCateogry?mainCategory=${mainCategory}&contentsCategory=${contentsCategory}${
          keyword ? '&keyword=' + encodeURIComponent(keyword) : ''
        }`
      : null,
    ibrandFetcher,
    {
      dedupingInterval: 3600000,
    },
  );
  return {
    data:
      data?.length > 0
        ? [{ no: '전체', sub_category: '전체', main_category: '전체' }].concat(data as any)
        : [{ no: '전체', sub_category: '전체', main_category: '전체' }],
    isValidating,
    error,
  };
};

export const useTagList = (category: string, mainCategory: string, keyword?: string, subCategory?: string) => {
  const { data, isValidating, error } = useSWR<TagResponse[]>(
    subCategory && mainCategory
      ? `/ibrandplus/tags?category=${category}&subCategory=${subCategory}&mainCategory=${encodeURIComponent(mainCategory)}${
          keyword ? '&keyword=' + encodeURIComponent(keyword) : ''
        }`
      : null,
    ibrandFetcher,
    {
      dedupingInterval: 3600000,
    },
  );
  return {
    tags: data?.filter(tag => tag.typical !== null).map(parseTag),
    isValidating,
    error,
  };
};

/**
 * [0 … 99]
    0:
      groupItemName: "국가"
      groupItemNo: 1
      groupName: "지역정보"
      groupNo: 1
      no: 4
      typical: "서울"
    1: {no: 5, groupNo: 1, groupItemNo: 1, typical: '경기', groupName: '지역정보', …}
    ...

 * @param tagList 위의 형태로 되어있는 리스트를 'groupItemName'기준으로 배열 형태를 바꿈.
 * @returns 
 * 공통: (23) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   국가: (14) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   금액대: (5) [{…}, {…}, {…}, {…}, {…}]
   노선별: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 
   ...
 */
const parseTags = (tagList: BBSTag[]): Record<string, TagProps[]> =>
  tagList?.reduce((acc, tag) => ({ ...acc, [tag.groupItemName]: [...(acc?.[tag.groupItemName] || []), tag] }), {});

const parseTag = (tag: TagResponse): BBSTag => ({ groupName: tag.group_name, groupItemName: tag.group_item_name, typical: tag.typical });
