import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import { bannerZzimAPI } from '@modules/main/api';
import { haveAccessToken } from '@service/TokenService';
import ZzimBtnSVG from '@styles/svgs/ZzimBtnSVG';
import theme from '@styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useInView } from 'react-intersection-observer';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';

export interface ItemProps {
  companyLogoURL?: string;
  thumbnailURL: string;
  category?: string;
  contentCategory: string;
  title: string;
  trackingURL?: string;
  children: ReactNode;
  couponAvailable?: boolean;
  isNew?: boolean;
  isBest?: boolean;
  download?: boolean;
  inZzim?: boolean;
  noCategory?: boolean;
  prdNo?: string;
  entCode?: string;
  bbsNo?: string;
  isSearch?: boolean;
  entName?: string;
}

const Card = ({
  companyLogoURL,
  thumbnailURL,
  contentCategory,
  category,
  title,
  trackingURL,
  couponAvailable = false,
  isNew = false,
  isBest = false,
  inZzim = false,
  children,
  noCategory = false,
  prdNo,
  entCode,
  bbsNo,
  entName,
  isSearch = false,
  ...rest
}: ItemProps) => {
  const dataMutate = useBbsPageState(state => state.dataMutate);
  const router = useRouter();
  const isDeskTop = Desktop();
  const isIos = useIsIOS();
  const { ref, inView } = useInView({ rootMargin: '-40px 0px', triggerOnce: true, delay: 100 });
  const [isInZzim, setInZzim] = useState(inZzim);
  const styles = useSpring({
    to: { opacity: inView ? 1 : 0 },
    config: config.molasses,
  });
  const zzimItem = async ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!haveAccessToken()) {
      return confirmAlert({
        title: '로그인시 이용 가능합니다.',
        buttons: [
          {
            label: '확인',
            onClick: () =>
              window.location.replace(`https://www.iwedding.co.kr/member/login?ret_url=${encodeURIComponent(window.location.href)}`),
          },
        ],
      });
    }
    const post_data = {
      no: '',
      ent_code: '',
      prd_no: '',
    };
    switch (contentCategory) {
      case '1':
        post_data.ent_code = entCode;
        break;
      case '4':
        post_data.no = bbsNo;
        break;
      case 'product':
        post_data.prd_no = prdNo;
        post_data.ent_code = entCode;
        break;
      case '3':
        post_data.no = bbsNo;
        break;
    }
    const result = await bannerZzimAPI(post_data);
    if (result === 'OK') {
      setInZzim(!isInZzim);
      // if (isSearch) {
      //   await searchZzimLog(contentCategory, title, { bbsNo, entCode, prdNo, category, title, entName });
      // } else {
      //   await bbsZzimLog(contentCategory, title, { bbsNo, entCode, prdNo, category, title, entName });
      // }
    }
  };
  const onDetail = async ev => {
    dataMutate();

    // if (isSearch) {
    //   await searchDetail(contentCategory, { bbsNo, entCode, prdNo, category, title, entName });
    //   setTimeout(() => , 300);
    // } else {
    //   // await bbsDetail(contentCategory, { bbsNo, entCode, prdNo, category, title, entName });
    //   console.log(trackingURL);
    //   setTimeout(() => router.replace(trackingURL || ''), 300);
    // }
    if (isDeskTop) {
      if (isSearch) {
        ev.preventDefault();
        global.window && window.open(trackingURL || '');
      }
    }
  };
  return (
    <Link href={trackingURL} passHref>
      <CardContainer onClick={onDetail} style={styles} ref={ref} {...rest}>
        {contentCategory == '1' && companyLogoURL != undefined && (
          <CompanyLogo className='card-logo'>
            <LogoWrapper>
              {/* {companyLogoURL && <Image src={companyLogoURL} width='100vw' height='100%' layout='intrinsic' objectFit='contain' alt='logo' />} */}
              {companyLogoURL && <Image src={companyLogoURL} layout='fill' objectFit='contain' alt='logo' />}
            </LogoWrapper>
          </CompanyLogo>
        )}

        <ImgContainer className='card-thumbnail'>
          <ZzimBtn onClick={zzimItem}>
            <ZzimBtnSVG fillColor={isInZzim ? theme.pink : 'rgba(46,46,46,0.5)'} border={!isInZzim} />
          </ZzimBtn>
          <Image src={thumbnailURL} alt={thumbnailURL?.slice(10)} width='100vw' height='100%' layout='responsive' objectFit='cover' />
        </ImgContainer>

        {noCategory ? null : <Category>{category}</Category>}
        <Title className='card-title'>{title}</Title>

        <Body className='card-body'>{children}</Body>
      </CardContainer>
    </Link>
  );
};

export default React.memo(Card);

const CardContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  width: 100%;
  height: 100%;
  vertical-align: top;
  @media (max-width: ${theme.pc + 1}px) {
    min-width: 100%;
  }

  @media (max-width: ${theme.tablet}px) {
    min-width: 100%;
  }
`;

const CompanyLogo = styled.div`
  position: relative;
  width: 100%;
  border-top: 1px solid ${theme.ashgray};
  height: 69px;
  padding: 9px 0;
  @media all and (max-width: 1280px) {
    height: 44px;
    padding: 5px 0;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 132px;
  height: 100%;
  margin: 0 auto;
  background: transparent;
  @media all and (max-width: 1280px) {
    width: 87px;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 22px;
  background: #fff6fa;
  cursor: pointer;
  @media (max-width: ${theme.tablet}px) {
    margin-bottom: 11px;
  }
`;

const Category = styled.span`
  color: ${theme.gray};
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 5px;
  line-height: 20px;
  cursor: pointer;
  @media (max-width: ${theme.tablet}px) {
    /* font-size: 13px; */
  }
`;

const Title = styled.p`
  color: ${theme.black};
  font-size: 15px;
  margin-bottom: 4px;
  line-height: 20px;
  cursor: pointer;
  vertical-align: top;
  @media (max-width: ${theme.tablet}px) {
    font-size: 14px;
    margin-bottom: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 20px;
  }
  /* overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  word-wrap: break-word; */
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  color: ${theme.gray};
`;

const ZzimBtn = styled.span`
  position: absolute;
  cursor: pointer;
  user-select: none;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 41px;
  height: 41px;
  background: transparent;
  border-radius: 5px;
  z-index: 1;
  @media (max-width: ${theme.tablet}px) {
    font-size: 12px;
    padding: 5px 8px;
  }
`;
