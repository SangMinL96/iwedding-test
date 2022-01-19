import NewFooter from '@components/header_footer/new.footer';
import EventPageSEO from '@components/layout/EventPageSEO';
import { Desktop } from '@hooks/useDevice';
import { getTmpAllData } from '@modules/main/api';
import { MainDataType } from '@modules/main/interface';
import { haveAccessToken } from '@service/TokenService';
import phpAxios from '@utils/PhpAxios';
import { getDate } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import useSWR from 'swr';
import TmpPageHeader from './type_common/tmp.page.header';
const MainTypeBanner = dynamic(() => import('./type_ui/main.type.banner'));
const MainTypeButton = dynamic(() => import('./type_ui/main.type.button'));
const MainTypeIcon = dynamic(() => import('./type_ui/main.type.icon'));
const MainType1 = dynamic(() => import('./type_ui/type1/main.type1'));
const MainType2 = dynamic(() => import('./type_ui/type2/main.type2'));
const MainType3 = dynamic(() => import('./type_ui/type3/main.type3'));
const MainType4 = dynamic(() => import('./type_ui/type4/main.type4'));
const MainType5 = dynamic(() => import('./type_ui/type5/main.type5'));

const Container = styled.div<{ urlStyle: string }>`
  width: 100%;
  padding-top: ${props => (props.urlStyle === '/main/index' ? '30px' : '0')};
  position: relative;
  @media all and (max-width: 1280px) {
    padding-top: 0px;
  }
`;
type PropsType = {
  data?: any;
  pageNum?: string | number;
};
const MainIndex = ({ data, pageNum }: PropsType) => {
  // const [tmpDate, setTmpDate] = useState('');
  // const [tmpAlways, setTmpAlways] = useState('');
  // const [tmpData, setTmpData] = useState<any>();
  const router = useRouter();
  const deskTop = Desktop();
  const now = getDate();
  const { data: tmpAllData } = useSWR<any>('main/template', () => (pageNum ? getTmpAllData(parseInt(pageNum as string)) : null));

  const sendTokenData = async (no: string) => {
    try {
      const url = 'js_data/web_log_user';
      const result = await phpAxios.post(url, { no }, { withCredentials: false });
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // const getTmpData = async (pageNum: number) => {
  //   try {
  //     setTmpDate('');
  //     const result = await axios.get(`${process.env.NEXT_PUBLIC_PHP_WEB_HOST}/index.php/js_data/prd_cate_manage_data/${pageNum}`);
  //     setTmpData(result?.data?.data);
  //     setTmpDate(result?.data?.data.end_date);
  //     setTmpAlways(result?.data?.data.always);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const RenderSection = (data: MainDataType, index: number) => {
    switch (data.type) {
      case '8':
        // type8 = MainTypeBanner: 배너 및 이미지 등 string 형태로 전달되는 html(관리페이지에선 에디터에서 작성하는 요소들 전달됨)
        return <MainTypeBanner data={data} key={data.idx} />;
      case '9':
        // type9 = MainType1: 메인 슬라이드
        return <MainType1 data={data} key={data.idx} />;
        break;
      case '10':
        // type10 = MainType2: 작은 슬라이드
        return <MainType2 data={data} sectionIndex={index} key={data.idx} />;
        break;
      case '11':
        // type11 = MainType3: 해시태그 탭 있는 섹션
        return <MainType3 data={data} sectionIndex={index} key={data.idx + '_' + index} />;
        break;
      case '12':
        // type12 = MainType?: 해시태그 탭 없는 섹션
        return <MainType4 data={data} key={data.idx} />;
      case '13':
        // type13 = MainType5: 타임핫딜 섹션
        return <MainType5 data={data} key={data.idx} />;
      case '14':
        // type14 = MainTypeIcon: 카테고리  아이콘 : 타입 6
        return <MainTypeIcon data={data} key={data.idx} />;
        break;
      case '15':
        // type15 = MainTypeButton: type7이라고도 하는 버튼 타입
        return <MainTypeButton data={data} tmpAllData={tmpAllData} key={data.idx} />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (router.asPath === '/main/page') {
      router.push('/main/index');
    }

    // getTmpData(parseInt(id));

    if (router.asPath.includes('/main/page')) {
      if (haveAccessToken()) {
        sendTokenData(pageNum as string);
      }
    }
  }, [pageNum, router]);

  if (router.asPath.includes('/main/page')) {
    if (tmpAllData) {
      if (tmpAllData?.end_date < now && tmpAllData?.end_date !== '0000-00-00' && tmpAllData?.always !== '1') {
        alert('기간이 만료된 페이지 입니다.');
        location.href = 'https://www.iwedding.co.kr/main/index';
      }
    }
  }

  return (
    <>
      <Container urlStyle={router.asPath}>
        {data && router.asPath.includes('/main/index') ? (
          <>{data?.map((item, index) => RenderSection(item, index))}</>
        ) : (
          <>
            <EventPageSEO title={tmpAllData && tmpAllData?.prd_cate_name} icon={tmpAllData && tmpAllData?.icon} />
            <TmpPageHeader
              tmpTitle={tmpAllData && tmpAllData?.prd_cate_name}
              endDate={tmpAllData && tmpAllData?.end_date}
              isAlways={tmpAllData && tmpAllData?.always > '0'}
            />
            {data && tmpAllData?.always !== '1' ? (
              <>
                {tmpAllData?.end_date < now && tmpAllData?.end_date !== '0000-00-00' ? null : (
                  <>{data?.map((item, index) => RenderSection(item, index))}</>
                )}
              </>
            ) : (
              <>{data?.map((item, index) => RenderSection(item, index))}</>
            )}
          </>
        )}
      </Container>

      {isMobile && <NewFooter />}
    </>
  );
};

export default MainIndex;
