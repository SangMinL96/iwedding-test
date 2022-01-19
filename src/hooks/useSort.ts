import { ISort } from '@utils/sortOptions';
import useSWR from 'swr';

export const useSort = (key: string, initialOption?: ISort) => {
  const { data, mutate } = useSWR<ISort>(key, null);

  return { currentSort: data || initialOption, mutateSort: (sort: ISort) => mutate(sort, false) };
};
