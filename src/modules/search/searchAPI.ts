import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { ibrandFetcher } from '@modules/ibrandplus/ibrandplusAPI';
import { fetcher, fetchFromIBrand, postFetcher } from '@utils/fetcher';
import moment from 'moment';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import shallow from 'zustand/shallow';
import { MdKeywordItf, PopularKeywordItf } from './searchInterface';
export const useSearchAllData = ({ keyword }: any) => {
  const setDataMutate = useBbsPageState(state => state.setDataMutate, shallow);

  const category = '';
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/ibrandplus/searchAllList?category=${encodeURI(
    category,
  )}&keyword=${encodeURIComponent(keyword)}`;

  const fetcherApi = async () => {
    const data = await fetcher<any>(url);
    return data;
  };
  const { data, isValidating, error, mutate } = useSWR(url, keyword ? fetcherApi : null);
  useEffect(() => {
    setDataMutate(mutate);
  }, []);
  return { list: data, isValidating, error };
};

export const useSearchTabData = ({ keyword, contentsCategory, category, sort, page: queryPage = 1, tag, isDeskTop, subCategory }: any) => {
  const router = useRouter();
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
    router.isReady && category ? fetcherApi : null,
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

export const usePopularData = () => {
  const url = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/popular` : `search/popular`;
  const fetcherApi = async () => {
    const data = await fetcher<PopularKeywordItf[]>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<PopularKeywordItf[]>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error };
};

export const useMdKeywordData = () => {
  const url =
    process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/mdKeyword` : `search/mdKeyword`;
  const fetcherApi = async () => {
    const data = await fetcher<MdKeywordItf[]>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<MdKeywordItf[]>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error };
};

export const useMdBasicKeywordData = () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/mdBasicKeyword`
      : `search/mdBasicKeyword`;
  const fetcherApi = async () => {
    const data = await fetcher<MdKeywordItf[]>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<MdKeywordItf[]>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error };
};

export const useMdRecommendData = (limit: number = 10) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/mdRecommendList?limit=${limit}`
      : `search/mdRecommendList?limit=${limit}`;
  const fetcherApi = async () => {
    const data = await fetcher<any[]>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<any[]>(url, fetcherApi);
  return { data, isValidating, error };
};

export const useSearchBannerData = (tab: string, category: string = '전체') => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/searchBanner?tab=${encodeURI(tab)}&category=${encodeURI(category)}`;

  const fetcherApi = async () => {
    const data = await fetcher<any>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR<any>(url, fetcherApi, {
    dedupingInterval: 3600000,
  });
  return { data, isValidating, error };
};

export const onMdKeywordCount = async (searchNo: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/mdKeywordCount`;
    const data = await postFetcher<any[]>(url, { searchNo, date: moment(new Date()).format('YYYY-MM-DD') });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const keyWordCount = async (keyword: string) => {
  try {
    if (!keyword || keyword === '') return;
    const url =
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/search/keyWordCount`
        : `search/keyWordCount`;
    const data = await postFetcher<any[]>(url, { keyword });
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const useAutoKeyword = (type: string) => {
  const url = `js_data/auto_search`;
  const { data, isValidating, error } = useSWR<any>(url, url => fetchFromIBrand(url, { type }), {
    dedupingInterval: 3600000,
  });
  if (data) {
    return data?.data;
  }
};
