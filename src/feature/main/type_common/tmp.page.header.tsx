import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import facebookIcon from '@images/common/facebook_icon.png';
import kakaoIcon from '@images/common/kakao_icon.png';
import kakaoStoryIcon from '@images/common/kakao_story_icon.png';
import naverBandIcon from '@images/common/naver_band_icon.png';
import naverBlogIcon from '@images/common/naver_blog_icon.png';
import shareIcon from '@images/common/share_icon_x3.png';
import { IconCloseShare } from '@styles/svgs/icon_close_share';
import theme from '@styles/theme';
import { openKakaoLink, openWeb } from '@utils/appOpen';
import { isWebview } from '@utils/isWebview';
import { getDate } from '@utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
type TmpHeaderProps = {
  tmpTitle?: string;
  endDate?: string;
  isAlways?: boolean;
  isHeader?: boolean;
};

const TmpPageHeader = ({ tmpTitle, endDate, isAlways, isHeader = false }: TmpHeaderProps) => {
  const nowString = getDate();
  const nowDateTime = new Date(nowString);
  const endDateTime = new Date(endDate);
  const router = useRouter();
  const isDeskTop = Desktop();
  const [isShare, setIsShare] = useState<boolean>(false);
  const isWebView = isWebview();

  const isIos = useIsIOS();
  const onShareModal = () => {
    setIsShare(true);
  };

  const onShare = (type: string) => () => {
    if (isWebView) {
      openWeb(
        `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_share_sns?direct_url=${process.env.NEXT_PUBLIC_WEB_HOST}${
          router.asPath
        }&direct_url_title=${encodeURI(tmpTitle)}&share_site=${type}`,
      );
    } else {
      if (isDeskTop) {
        global.window &&
          window.open(
            `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_share_sns?direct_url=${process.env.NEXT_PUBLIC_WEB_HOST}${
              router.asPath
            }&direct_url_title=${encodeURI(tmpTitle)}&share_site=${type}`,
            'shareOpen',
          );
      } else {
        window.location.href = `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_share_sns?direct_url=${
          process.env.NEXT_PUBLIC_WEB_HOST
        }${router.asPath}&direct_url_title=${encodeURI(tmpTitle)}&share_site=${type}`;
      }
    }
  };

  const onKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }
    if (isWebView && isIos) {
      openKakaoLink(`${process.env.NEXT_PUBLIC_WEB_HOST}${router.asPath}`);
    } else {
      setTimeout(
        () =>
          window.Kakao.Link.sendDefault({
            objectType: 'text',
            text: tmpTitle,
            link: {
              mobileWebUrl: `${process.env.NEXT_PUBLIC_WEB_HOST}${router.asPath}`,
              webUrl: `${process.env.NEXT_PUBLIC_WEB_HOST}${router.asPath}`,
            },
          }),
        100,
      );
    }
  };

  return (
    <Container isHeader={isHeader}>
      <div className='wrapper'>
        <div className='text_box'>
          <p className='tmp_title'>{tmpTitle}</p>
          {endDate && (isAlways ? null : <p className='tmp_date'>{endDateTime > nowDateTime ? `${endDate} 까지` : `종료`}</p>)}
        </div>

        <BtnBox>
          <button onClick={onShareModal} className='share_icon'>
            <span>
              <Image src={shareIcon} alt='share' width={24} height={24} />
            </span>
          </button>
          <SnsContainer isShare={isShare}>
            <TitleBox>
              <h3>아이웨딩 공유하기</h3>
              <span onClick={() => setIsShare(false)}>
                <IconCloseShare />
              </span>
            </TitleBox>
            <SnsBox>
              <div onClick={onShare('naverblog')}>
                <Image src={naverBlogIcon} alt='naverBlog' width={40} height={40} />
                <span>블로그</span>
              </div>
              <div onClick={onShare('facebook')}>
                <Image src={facebookIcon} alt='fackbookIcon' width={40} height={40} />
                <span>페이스북</span>
              </div>
              <div onClick={onShare('naverband')}>
                <Image src={naverBandIcon} alt='naverBand' width={40} height={40} />
                <span>밴드</span>
              </div>
            </SnsBox>
            <SnsBox2>
              <div onClick={onShare('kakaostory')}>
                <Image src={kakaoStoryIcon} alt='kakaoStoryIcon' width={40} height={40} />
                <span>
                  카카오
                  <br />
                  스토리
                </span>
              </div>

              <div onClick={onKakaoShare}>
                <Image src={kakaoIcon} alt='kakaoIcon' width={40} height={40} />
                <span>카카오톡</span>
              </div>

              <div></div>
            </SnsBox2>
          </SnsContainer>
        </BtnBox>
      </div>
      {!isDeskTop && <BGContainer isShare={isShare} onClick={() => setIsShare(false)} />}
    </Container>
  );
};

export default TmpPageHeader;

const Container = styled.div<{ isHeader: boolean }>`
  position: ${props => (props.isHeader ? 'fixed' : 'relative')};
  z-index: ${props => props.isHeader && '2'};
  top: ${props => props.isHeader && '44px'};
  ${theme.flexCenter}
  width: 100%;
  background-color: #f5f5f5;

  @media (min-width: 1280px) {
    height: 120px;
    background-color: #fff;
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    @media (min-width: 1280px) {
      width: 1280px;
      padding: 0;
    }
    .text_box {
      @media (min-width: 1280px) {
        display: flex;
        align-items: center;
      }
      > p {
        font-size: 14px;
      }
      .tmp_title {
        color: #6f6f6f;
        @media (min-width: 1280px) {
          font-size: 20px;
          font-weight: 700;
          color: #262626;
          margin-right: 15px;
        }
      }
      .tmp_date {
        margin-top: 5px;
        color: #b1b1b1;
        @media (min-width: 1280px) {
          margin-top: 0;
        }
      }
    }
    .share_icon {
      ${theme.resetBtnStyle};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
    }
  }
`;

const SnsContainer = styled.div<{ isShare?: boolean }>`
  display: ${props => props.isShare && 'flex'};
  display: ${props => !props.isShare && 'none'};
  border: 1px solid #b1b1b1;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  z-index: 101;
  top: -10px;
  right: -10px;
  width: 350px;
  height: 350px;
  padding: 25px;
  background-color: white;
  @media (max-width: ${theme.pc + 1}px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: ${theme.tablet}px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const BtnBox = styled.div`
  position: relative;
`;

const TitleBox = styled.div`
  width: 100%;
  ${theme.flexCenter}
  justify-content: space-between;
  color: #262626;
  h3 {
    font-size: 17px;
  }
  span {
    cursor: pointer;
  }
`;

const SnsBox = styled.div`
  ${theme.flexCenter};
  width: 100%;
  margin-top: 20px;
  border: 1px solid #dfdfdf;
  border-bottom: 1px dashed #dfdfdf;
  > div {
    cursor: pointer;
    ${theme.flexCenter};
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-right: 1px dashed #dfdfdf;
    span {
      font-size: 13px;
      color: #262626;
      margin-top: 10px;
    }
    &:nth-last-child(1) {
      border-right: none;
    }
  }
`;

const SnsBox2 = styled.div`
  ${theme.flexCenter};
  width: 100%;
  border: 1px solid #dfdfdf;
  border-bottom: 1px dashed #dfdfdf;
  border-top: none;
  > div {
    cursor: pointer;
    ${theme.flexCenter};
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-right: 1px dashed #dfdfdf;
    span {
      font-size: 13px;
      color: #262626;
      margin-top: 10px;
    }
    &:nth-last-child(1) {
      border-right: none;
    }
  }
`;

const BGContainer = styled.div<{ isShare?: boolean }>`
  display: ${props => props.isShare && 'flex'};
  display: ${props => !props.isShare && 'none'};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(32, 32, 32, 0.3);
  z-index: 100;
`;
