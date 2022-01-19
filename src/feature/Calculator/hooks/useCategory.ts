import { ProductCategoryValue } from '@modules/product/product.interface';
import { useCallback } from 'react';
import useSWR from 'swr';

export const CALCULATOR_CATEGORY_KEY = 'local/calculator/category';

export const useCategory = () => {
  const { data: category, mutate } = useSWR<ProductCategoryValue>(CALCULATOR_CATEGORY_KEY, null, {
    onSuccess: category => sessionStorage.setItem(CALCULATOR_CATEGORY_KEY, JSON.stringify(category)),
    onError: () => sessionStorage.removeItem(CALCULATOR_CATEGORY_KEY),
  });

  const setCategory = useCallback(
    (newCategory: ProductCategoryValue) => {
      sessionStorage.setItem(CALCULATOR_CATEGORY_KEY, JSON.stringify(newCategory));
      return mutate(newCategory, false);
    },
    [mutate],
  );

  return { category, setCategory };
};
