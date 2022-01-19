import { useEffect, useState } from 'react';

const groupItems = <T>(list: T[], itemsPerPage: number): T[][] => {
  const groupedItems: T[][] = [];
  const totalPages = Math.ceil(list?.length / itemsPerPage);
  for (let i = 0; i < totalPages; i++) {
    groupedItems[i] = list.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
  }

  return groupedItems;
};

/**
 * PHP에서 가져오기 때문에 페이지네이션이 적용되지 않은 리스트를 가져와서
 * 프론트에서 페이지네이션 적용
 *
 * @param list 문의내역
 * @param itemsPerPage 한 페이지당 갯수
 * @returns 페이지네이션이 적용된 2D 리스트
 */

export const usePaginatedList = <T>(list: T[], itemsPerPage: number) => {
  const [groupedItems, setGroupedItems] = useState<T[][]>([]);

  useEffect(() => {
    setGroupedItems(groupItems(list, itemsPerPage));
  }, [list, setGroupedItems, itemsPerPage]);

  return groupedItems;
};
