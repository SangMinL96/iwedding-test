import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import { useScrollProgress } from '@hooks/useScrollProgress';
import { InquiryDetailItf } from '@modules/rsvcenter/interface';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styled from 'styled-components';
const Content1 = dynamic(() => import('./contents/Content1'));
const Content2 = dynamic(() => import('./contents/Content2'));
const Content3 = dynamic(() => import('./contents/Content3'));

type PropsType = {
  data?: InquiryDetailItf;
};
function InputModal({ data }: PropsType) {
  const isDeskTop = Desktop();
  const ios = useIsIOS();
  const { scrollValue: mobileScrollValue } = useScrollProgress(isDeskTop);
  const [scrollValue, setScrollValue] = useState(0);

  const handleScroll = (ev: any) => {
    const scrollTop = ev.target.scrollTop;
    const scrollHeight = ev.target.scrollHeight - ev.target.offsetHeight;
    const scrollPercent = Math.abs((scrollTop / scrollHeight) * 100);
    if (scrollPercent > 100) {
      return setScrollValue(100);
    } else {
      return setScrollValue(scrollPercent);
    }
  };

  return (
    <BigContainer>
      <Container isDeskTop={isDeskTop}>
        <ScrollBar isIos={ios} isDeskTop={isDeskTop} scrollValue={isDeskTop ? scrollValue : mobileScrollValue}>
          <div className='progress' />
        </ScrollBar>
        <ContentContainer isDeskTop={isDeskTop} onScroll={handleScroll}>
          <Content1 data={data?.easy_book?.easy_book} />
          <Divider />
          <Content2 data={data?.response} category={data?.easy_book?.easy_book?.category as string} />
          {data?.easy_book?.easy_book?.category === '한복' && (
            <>
              <Divider />
              <Content3 category={data?.easy_book?.easy_book?.category} />
            </>
          )}
        </ContentContainer>
      </Container>
    </BigContainer>
  );
}

export default React.memo(InputModal);

type StyledType = {
  scrollValue?: number;
  isDeskTop?: boolean;
  onSubmit?: any;
  isIos?: boolean;
};
const BigContainer = styled.div<StyledType>`
  width: 50%;
  height: 100%;
  ${props => props.theme.flexCenter};
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
  }
`;
const Container = styled.div<StyledType>`
  position: relative;
  width: 500px;
  height: 100%;
  background-color: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    padding: 0;
  }
`;

const ScrollBar = styled.div<StyledType>`
  position: ${props => (!props.isDeskTop ? 'fixed' : 'absolute')};
  top: ${props => !props.isDeskTop && '44px'};
  top: ${props => props.isIos && '0px'};
  width: 100%;
  left: 0;
  height: 6px;
  z-index: 10;
  background-color: rgba(38, 38, 38, 0.18);
  .progress {
    width: ${props => props.scrollValue}%;
    height: 100%;
    background-color: #4866e4;
  }
`;

const ContentContainer = styled.div<StyledType>`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  height: calc(100% - 65px);
  padding: 8%;
  padding-top: 10%;
  margin-bottom: 0;
  @media all and (max-width: ${theme.pc}px) {
    height: 100%;
    padding: 0 15px;
    padding-top: 0;
    margin-bottom: ${props => (props.isIos ? '1em' : '3em')};
  }
`;

const Divider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
`;
