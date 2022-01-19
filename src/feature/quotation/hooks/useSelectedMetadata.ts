import { GroupMetadataDto } from '@modules/mypage/quotation/QuotationInterface';
import useSWR from 'swr';

export const SELECTED_METADATA = 'selected_metadata';
export function useSelectedMetadata(metadataDto?: GroupMetadataDto[]) {
  const { data, mutate } = useSWR(SELECTED_METADATA, null);

  return {
    selectedMetadataList: data ?? metadataDto ?? [],
    setSelectedMetadata: (metadata: GroupMetadataDto[]) => mutate(metadata, false),
  };
}
