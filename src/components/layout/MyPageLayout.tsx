import ListBackButton from '@components/core/buttons/ListBackButton';
import Loading from '@components/Loading';
import { Desktop } from '@hooks/useDevice';
import { usePrivatePage } from '@hooks/usePrivatePage';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import homeBtn from '@images/common/home_icon_x3.png';
import SiteTitle from './SiteTitle';
const PCSideMenu = dynamic(() => import('@components/PCSideMenu'));

const MyPageLayout = ({ title, children, noPaddingBottom }: Props) => {
  const authenticated = usePrivatePage();
  const router = useRouter();
  const isDesktop = Desktop();

  return (
    <>
      <SiteTitle title={title} />
      <Container>
        {authenticated ? (
          <div className='page-wrapper'>
            <div className='page-contents'>
              <div className='page-header'>
                <p className='title'>마이페이지</p>
                <span className='subtitle'>{title}</span>
              </div>
              <div className='m-page-header'>
                <ListBackButton />
                <span>{title}</span>
                {!isDesktop && (
                  <button className='home-btn' onClick={() => router.push('/main/index')}>
                    <Image src={homeBtn} alt='메인' /> {/* 임시 */}
                  </button>
                )}
              </div>
              {isDesktop && <PCSideMenu />}
              <BoxContainer noPaddingBottom={!!noPaddingBottom}>{children}</BoxContainer>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

export default React.memo(MyPageLayout);

const Container = styled.div`
  padding-bottom: 60px;
  ${props => props.theme.paymentLayoutCSS};
  .page-wrapper {
    .page-contents {
      .m-page-header {
        top: 0;
      }
    }
  }
  .main-box {
    .tab-menu {
      width: 100%;
      position: relative;
      z-index: 11;
      @media all and (max-width: ${theme.pc}px) {
        width: 100%;
        position: fixed;
        top: 42px;
      }
    }
    .tab-content-box {
      width: 100%;
      position: relative;
      margin-top: 30px;
      min-height: 50vh;
    }
  }
`;

const BoxContainer = styled.div<{ noPaddingBottom: boolean }>`
  width: 789.7px;
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;

  margin-bottom: ${props => (props.noPaddingBottom ? '-60px' : '0')};
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-left: 0;
    overflow-x: hidden;
  }

  > div {
    .icash_main_box {
      margin-bottom: 100px;
    }
  }

  .icash_tab_box {
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
      margin-bottom: 30px;
    }
  }
`;

interface Props {
  title: string;
  children: ReactNode;
  noPaddingBottom?: boolean;
  // 스케줄페이지에서는 padding-bottom: 60px; 없애야해서 추가
}
