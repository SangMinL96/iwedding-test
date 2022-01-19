import useSWR from 'swr';
import { CartDto } from '@modules/mypage/quotation/QuotationInterface';

export const useSelectedCartList = () => {
  const { data, mutate } = useSWR<CartDto[]>('SELECTED_CART_LIST', null);

  const clearSelectedCartList = () => mutate(null, false);
  const setSelectedCartList = (newCartList: CartDto[]) => mutate(newCartList, false);

  return { selectedCartList: data ?? [], setSelectedCartList, clearSelectedCartList };
};
