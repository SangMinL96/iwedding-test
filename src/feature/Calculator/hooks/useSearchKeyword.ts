import useSWR from 'swr';

const SEARCH_KEYWORD = 'search_keyword';
export const useSearchKeyword = () => {
  const { data, mutate } = useSWR<string>(SEARCH_KEYWORD, null);

  return { searchKeyword: data || '', setSearchKeyword: (keyword: string) => mutate(keyword, false) };
};
