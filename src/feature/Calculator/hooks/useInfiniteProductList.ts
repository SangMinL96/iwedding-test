import { useCategory, useSearchKeyword } from '@feature/Calculator/hooks';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { useSort } from '@hooks/useSort';
import { PaginationInterface, PaginationMeta } from '@modules/CommonInterface';
import { WmProductEntity } from '@modules/product/product.interface';
import { haveAccessToken } from '@service/TokenService';
import { DropdownOption, locationFilter } from '@utils/dropdownOptions';
import { fetcher } from '@utils/fetcher';
import { FILTER_BY_LOCATION, INFI_PRODUCT_KEY } from '@utils/localSwrKeys';
import { productSortOptions } from '@utils/sortOptions';
import { useEffect, useState } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
/**
 * category, currentSort, searchKeyword를 인자로 넘기는 방법도 있음
 */
export const useInfiniteProductList = () => {
  const isLoggedIn = haveAccessToken();
  const { category } = useCategory();
  const { currentSort } = useSort(INFI_PRODUCT_KEY, productSortOptions[0]);
  const { data: location } = useSWR<DropdownOption>(FILTER_BY_LOCATION, null);
  const { searchKeyword } = useSearchKeyword();
  const {
    data: productPage,
    size,
    setSize,
    mutate: infMutate,
    isValidating,
  } = useSWRInfinite<PaginationInterface<WmProductEntity>>(
    index =>
      `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/product?page=${index + 1}&category=${encodeURI(category)}&sort=${
        currentSort?.method
      }${location ? `&filter=${location.method}` : `&filter=${locationFilter[0].method}`}${
        searchKeyword ? `&keyword=${encodeURIComponent(searchKeyword)}` : ''
      }`,
    isLoggedIn ? fetcher : null,
  );

  const [metadata, setMetadata] = useState<PaginationMeta>();

  useEffect(() => {
    setMetadata(productPage?.[0]?.meta);
  }, [productPage]);

  return { productPage, infMutate, metadata, size, setSize, isValidating };
};
