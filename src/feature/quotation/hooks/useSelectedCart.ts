import { SELECTED_CART } from '@utils/localSwrKeys';
import useSWR from 'swr';
import { CartDto } from '@modules/mypage/quotation/QuotationInterface';

export function useSelectedCart(initialCart?: CartDto) {
  const { data, mutate } = useSWR<CartDto>(SELECTED_CART, null, { initialData: initialCart });

  const clearSelectedCart = () => mutate(null, false);

  return { selectedCart: (data as CartDto) || null, setSelectedCart: (cart: CartDto) => mutate(cart, false), clearSelectedCart };
}
