import Loading from '@components/Loading';
import MainIndex from '@feature/main/main.index';
import { MainDataType } from '@modules/main/interface';
import { fetchFromIBrand } from '@utils/fetcher';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const MainPageIndex = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isValidating } = useSWR<MainDataType[]>(
    `${process.env.NEXT_PUBLIC_PHP_WEB_HOST}/index.php/js_data/main_js_data/${id}`,
    fetchFromIBrand,
    {
      dedupingInterval: 3600000,
    },
  );
  if (isValidating) {
    return <Loading />;
  }
  return <MainIndex data={data} pageNum={id as string} />;
};
// export async function getServerSideProps(context) {
//   console.log(`context`, context);
//   const { data } = await axios.get<MainDataType[]>(
//     `${process.env.NEXT_PUBLIC_PHP_WEB_HOST}/index.php/js_data/main_js_data/${context.query.id}`,
//   );
//   return {
//     props: {
//       mainData: data,
//       id: context.query.id,
//     },
//   };
// }
export default MainPageIndex;
