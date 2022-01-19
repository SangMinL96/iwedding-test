import { QuotationDetail } from '@modules/mypage/quotation/QuotationInterface';
import useSWR from 'swr';

export const SELECTED_QUOTATION = 'selected_quotation';
export function useSelectedQuotation() {
  const { data, mutate } = useSWR<QuotationDetail>(SELECTED_QUOTATION, null, { initialData: null });

  const setSelectedQuotation = (quote: QuotationDetail) => mutate(quote, false);
  return { selectedQuotation: data, setSelectedQuotation };
}
