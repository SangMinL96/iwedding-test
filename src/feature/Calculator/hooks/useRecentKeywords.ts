import useSWR from 'swr';

export const RECENT_KEYWORDS = 'recent_keywords';

// 유저의 최근 검색어 목록
export const useRecentKeywords = () => {
  const { data: recentKeywords, mutate } = useSWR<string[]>(RECENT_KEYWORDS, recentKeywordsFetcher, {
    shouldRetryOnError: false,
    onSuccess: keywords => localStorage.setItem(RECENT_KEYWORDS, JSON.stringify(keywords)),
    onError: () => localStorage.removeItem(RECENT_KEYWORDS),
  });

  function recentKeywordsFetcher() {
    const data = localStorage.getItem(RECENT_KEYWORDS);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  const setRecentKeywords = (keywords: string[]) => {
    localStorage.setItem(RECENT_KEYWORDS, JSON.stringify(keywords));
    mutate(keywords, false);
  };

  return { recentKeywords, setRecentKeywords };
};
