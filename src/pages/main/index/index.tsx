import Loading from '@components/Loading';
import MainIndex from '@feature/main/main.index';
import { MainDataType } from '@modules/main/interface';
import { fetchFromIBrand } from '@utils/fetcher';
import React, { useEffect } from 'react';
import useSWR from 'swr';
const Index = ({ mainData }) => {
  const { data, isValidating, mutate } = useSWR<MainDataType[]>(
    `${process.env.NEXT_PUBLIC_PHP_WEB_HOST}/index.php/js_data/main_js_data`,
    fetchFromIBrand,
    {
      dedupingInterval: 3600000,
    },
  );
  useEffect(() => {
    //메인 데이터는 캐싱해놨는데 가끔 데이터가 0개 일때가 있는듯
    //오픈후 그런다고하면 해당 로직 사용
    const reLoading = setTimeout(() => mutate(), 15000);
    if (data && data.length > 0) {
      clearTimeout(reLoading);
    }
    return () => clearTimeout(reLoading);
  }, [data]);
  if (isValidating) {
    return <Loading />;
  }
  return <MainIndex data={data} />;
};

// export async function getServerSideProps() {
//   const { data } = await axios.get<MainDataType[]>(`${process.env.NEXT_PUBLIC_PHP_WEB_HOST}/index.php/js_data/main_js_data`);

//   return {
//     props: {
//       mainData: data,
//     },
//   };
// }
export default Index;
