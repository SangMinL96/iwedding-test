import { Desktop } from '@hooks/useDevice';
import { useScrollProgress } from '@hooks/useScrollProgress';
import theme from '@styles/theme';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Complete from '../Complete';
import Content1 from './contents/Content1';
import Content2 from './contents/Content2';
import Content3 from './contents/Content3';
import Content4 from './contents/Content4';
import Content5 from './contents/Content5';
import Content6 from './contents/Content6';
import Content7 from './contents/Content7';
import FindHallContent1 from './contents/FindHallContent1';
import UserContent1 from './userContents/UserContent1';
import UserContent2 from './userContents/UserContent2';

const isValidateData = {
  hall_request_confirm_h: false,
};

function InputModal({ isComplete, category }) {
  const isDeskTop = Desktop();
  const { scrollValue: mobileScrollValue } = useScrollProgress(isDeskTop);
  const [isValidate, setIsValidate] = useState(isValidateData);
  const [isSubmit, setIsSubmit] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [next, setNext] = useState<boolean>(false); // 홀정보 전부 입력후 다음버튼 누를시
  const [isNext, isSetNext] = useState<boolean>(false); // 홀정보 전부 입력시 버튼 활성화
  useEffect(() => {
    if (!isValidate['easy_book_who']) {
      return isSetNext(true);
    } else {
      return isSetNext(false);
    }
  }, [isValidate]);

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

  const onReload = ev => {
    ev.preventDefault();
    window.location.replace('main/index');
  };

  const onNotSubmit = ev => {
    ev.preventDefault();
    window.alert('아직 선택하지 않은 항목이 있어요!');
  };
  const onNext = ev => {
    ev.preventDefault();
    setNext(true);
  };
  const onNotNext = ev => {
    ev.preventDefault();
    window.alert('아직 선택하지 않은 항목이 있어요!');
  };
  return (
    <BigContainer>
      <Container isDeskTop={isDeskTop}>
        {isComplete ? (
          <>
            <ContentContainer isDeskTop={isDeskTop}>
              <Complete title='웨딩홀' />
            </ContentContainer>
            <FootBtn onClick={onReload} isDeskTop={isDeskTop}>
              확인
            </FootBtn>
          </>
        ) : (
          <>
            <ScrollBar isDeskTop={isDeskTop} scrollValue={isDeskTop ? scrollValue : mobileScrollValue}>
              <div className='progress' />
            </ScrollBar>
            {/* 다음버튼후 유저 정보 입력폼 */}
            {next && (
              <ContentContainer isDeskTop={isDeskTop} onScroll={handleScroll}>
                <UserContent1 setIsValidate={setIsValidate} />
                <Divider />
                <UserContent2 setIsValidate={setIsValidate} />
              </ContentContainer>
            )}
            {/* 첫 입력폼 다음 누르기전에 */}
            {!next && (
              <ContentContainer isDeskTop={isDeskTop} onScroll={handleScroll}>
                {category === 'hall' && <Content1 setIsValidate={setIsValidate} />}
                {category === 'find_hall' && <FindHallContent1 setIsValidate={setIsValidate} />}
                <Divider />
                <Content2 setIsValidate={setIsValidate} />
                <Divider />
                <Content3 setIsValidate={setIsValidate} />
                <Divider />
                <Content4 setIsValidate={setIsValidate} />
                <Divider />
                <Content5 setIsValidate={setIsValidate} />
                <Divider />
                <Content6 setIsValidate={setIsValidate} />
                <Divider />
                <Content7 setIsValidate={setIsValidate} />
              </ContentContainer>
            )}
            {next && isSubmit && (
              <FootBtn onSubmit='submit' isDeskTop={isDeskTop}>
                예약 신청 완료
              </FootBtn>
            )}
            {!isSubmit && (
              <FootBtn
                onClick={onNotSubmit}
                style={{ backgroundColor: '#d5d5d5', borderColor: '#d5d5d5', cursor: 'default' }}
                isDeskTop={isDeskTop}
              >
                모든 항복을 선택해주세요.
              </FootBtn>
            )}
            {/* 웨딩홀 정보 인풋값 버튼 타입  ---- 다음 누르기전에 버튼 활성화 조건문 */}
            {!next && isNext && (
              <FootBtn onClick={onNext} isDeskTop={isDeskTop}>
                다음
              </FootBtn>
            )}
            {!isNext && (
              <FootBtn
                onClick={onNotNext}
                style={{ backgroundColor: '#d5d5d5', borderColor: '#d5d5d5', cursor: 'default' }}
                isDeskTop={isDeskTop}
              >
                모든 항복을 선택해주세요.
              </FootBtn>
            )}
          </>
        )}
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
  box-shadow: rgba(163, 159, 159, 0.24) 0px 3px 8px;
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
    padding-bottom: ${props => props.isIos && '-15px'};
  }
`;

const FootBtn = styled.button<StyledType>`
  position: absolute;
  ${props => props.theme.flexCenter};
  font-size: 16px;
  font-weight: bold;
  color: white;
  width: 100%;
  left: 0%;
  border: 1px solid #4866e4;
  bottom: -1px;
  height: 66px;
  background-color: #4866e4;
  @media all and (max-width: ${theme.pc}px) {
    position: fixed;
  }
`;

const Divider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
`;
