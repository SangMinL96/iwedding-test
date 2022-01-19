import { usePagination } from '@hooks/usePagination';
import backBtn from '@images/common/back_btn.png';
import Image from 'next/image';
import React from 'react';
import Pagination from 'react-js-pagination';

interface Props {
  itemsPP?: number;
  totalItems: number;
  pageRange?: number;
  paginationKey: string;
}

const CustomPagination = ({ itemsPP = 6, totalItems, pageRange = 5, paginationKey }: Props) => {
  const { page, setPage } = usePagination(paginationKey);
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsPP}
      totalItemsCount={totalItems}
      pageRangeDisplayed={pageRange}
      prevPageText={<Image width={8} height={12} src={backBtn} alt='back-button' />}
      nextPageText={<Image width={8} height={12} src={backBtn} alt='back-button' />}
      onChange={handlePageChange}
    />
  );
};

export default React.memo(CustomPagination);
