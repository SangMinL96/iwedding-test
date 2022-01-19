import useSWR from 'swr';

export const usePagination = (paginationKey: string) => {
  const { data: page, mutate } = useSWR<number>(paginationKey, null);

  const setPage = (newPage: number) => {
    mutate(newPage, false);
  };

  return { page: page ?? 1, setPage };
};
