import { useState, useEffect } from 'react';
import { fetchAvailableOptions } from '@modules/product/ProductAPI';
import { GroupProductDto } from '@modules/mypage/quotation/QuotationInterface';
import { useSelectedCart } from './useSelectedCart';

export const useAvailableOptions = () => {
  const { selectedCart } = useSelectedCart();

  const [availableOptions, setAvailableOptionList] = useState<GroupProductDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAvailableOptions(selectedCart?.product.no);
        if (response.data) {
          setAvailableOptionList(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedCart) fetch();
  }, [selectedCart, selectedCart.cart_no]);

  return availableOptions;
};
