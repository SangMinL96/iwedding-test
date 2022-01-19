import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import backBtn from '@images/common/back_btn.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import shallow from 'zustand/shallow';

interface Props {
  totalItems: number;
}

const CustomPagination = ({ totalItems }: Props) => {
  const router = useRouter();
  const {
    query: { page: queryPage },
  } = useRouter();
  const isDeskTop = Desktop();
  const [page, setPage] = useBbsPageState(state => [state.page, state.setPage], shallow);

  useEffect(() => {
    if (queryPage) {
      setPage(Number(queryPage));
    }
  }, [queryPage, setPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (isDeskTop) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    }
    global.window &&
      window.scrollTo({
        top: 0,
      });
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={40}
      totalItemsCount={totalItems}
      pageRangeDisplayed={5}
      prevPageText={<Image width={8} height={12} src={backBtn} alt='back-button' />}
      nextPageText={<Image width={8} height={12} src={backBtn} alt='back-button' />}
      onChange={handlePageChange}
    />
  );
};

export default React.memo(CustomPagination);
