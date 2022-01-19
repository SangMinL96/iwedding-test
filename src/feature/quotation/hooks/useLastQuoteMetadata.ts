import { DetailSort } from '../components/modals/detail_sort_modal/ModalRealSortIndex';
import { storeSortOptions, SortType } from '@utils/sortOptions';
import useSWR from 'swr';

interface LastQuoteMetaProps {
  page: number;
  scroll: number;
  sort: SortType;
  detailSort?: DetailSort[];
  totalItems: number;
}

const defaultMetadata: LastQuoteMetaProps = {
  page: 0,
  scroll: 0,
  sort: 'latest',
  totalItems: 0,
};

export const useLastQuoteMetadata = (key: string) => {
  const { data, mutate } = useSWR<LastQuoteMetaProps>(key, null);

  const setLastQuoteMetadata = (newMetadata: Partial<LastQuoteMetaProps>) => mutate({ ...data, ...newMetadata }, false);

  return { lastQuoteMetadata: data || defaultMetadata, setLastQuoteMetadata };
};
