import Loading from '@components/Loading';
import { Desktop } from '@hooks/useDevice';
import { useIsIOS } from '@hooks/useIsIOS';
import { useScrollProgress } from '@hooks/useScrollProgress';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Complete from '../Complete';
import { onValidateScroll } from '../util';
const Content1 = dynamic(() => import('./contents/Content1'));
const Content2 = dynamic(() => import('./contents/Content2'));
const Content3 = dynamic(() => import('./contents/Content3'));
const Content4 = dynamic(() => import('./contents/Content4'));
const Content5 = dynamic(() => import('./contents/Content5'));
const Content6 = dynamic(() => import('./contents/Content6'));

const isValidateData = {
  easy_book_which_product: true, // 예물 스크롤 유효성때 쓰는 컬럼. 트루로 안하면 계속 스크롤 검수 진행됨
  easy_book_who: false,
  'easy_book.type1_budget': false,
  'easy_book.type2_budget': false,
  'easy_book.when_check': false,
  'easy_book.which_style': true,
  'easy_book.cnt': false,
  'easy_book.fitting': false,
  easy_book_which_ent_type: false,
  'easy_book.type3': false,
  'easy_book.visit_when_yet': false,
};
type PropsType = {
  isComplete: boolean;
  isDone: boolean;
};
function InputModal({ isComplete, isDone }: PropsType) {
  const isDeskTop = Desktop();
  const { scrollValue: mobileScrollValue, stickyValue } = useScrollProgress(isDeskTop);
  const [isValidate, setIsValidate] = useState(isValidateData);
  const [isSubmit, setIsSubmit] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const {
    query: { from, link },
  } = useRouter();
  const router = useRouter();
  const ios = useIsIOS();

  useEffect(() => {
    if (!from) {
      if (
        isValidate['easy_book_who'] &&
        isValidate['easy_book.type1_budget'] &&
        isValidate['easy_book.type2_budget'] &&
        isValidate['easy_book.when_check'] &&
        isValidate['easy_book.cnt'] &&
        isValidate['easy_book.fitting'] &&
        isValidate['easy_book_which_ent_type'] &&
        isValidate['easy_book.type3'] &&
        isValidate['easy_book.visit_when_yet']
      ) {
        return setIsSubmit(true);
      } else {
        return setIsSubmit(false);
      }
    } else {
      if (isValidate['easy_book.visit_when_yet']) {
        return setIsSubmit(true);
      } else {
        return setIsSubmit(false);
      }
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
    if (router.back() === undefined) global.window?.close();
    if (!from) {
      router.replace('./main/index');
    } else {
      router.replace(link as string);
    }
  };
  const onNotSubmit = ev => {
    ev.preventDefault();
    if (!from) {
      onValidateScroll(isValidate);
      setTimeout(() => global.window && window.alert('아직 선택하지 않은 항목이 있어요!'), 300);
    } else {
      if (!isValidate['easy_book.visit_when_yet']) {
        global.window && window.alert('아직 선택하지 않은 항목이 있어요!');
      }
    }
  };
  return (
    <BigContainer>
      <Container isDeskTop={isDeskTop}>
        {isComplete ? (
          isDone ? (
            <Loading body='예약 등록중 입니다...' />
          ) : (
            <>
              <ContentContainer isDeskTop={isDeskTop}>
                <Complete title='예복' />
              </ContentContainer>
              <FootBtn onClick={onReload} isDeskTop={isDeskTop}>
                확인
              </FootBtn>
            </>
          )
        ) : (
          <>
            <ScrollBar
              isIos={ios}
              isDeskTop={isDeskTop}
              stickyValue={stickyValue}
              scrollValue={isDeskTop ? scrollValue : mobileScrollValue}
            >
              <div className='progress' />
            </ScrollBar>
            <ContentContainer isIos={ios} isDeskTop={isDeskTop} onScroll={handleScroll}>
              {!from && (
                <>
                  <Content1 setIsValidate={setIsValidate} />
                  <Divider />
                  <Content2 setIsValidate={setIsValidate} />
                  <Divider />
                  <Content3 setIsValidate={setIsValidate} />
                  <Divider />
                  <Content4 setIsValidate={setIsValidate} />
                  <Divider />
                  <Content5 setIsValidate={setIsValidate} />
                  <Divider />
                </>
              )}
              <Content6 setIsValidate={setIsValidate} />
            </ContentContainer>
            {isSubmit ? (
              <FootBtn onSubmit='submit' isDeskTop={isDeskTop}>
                예약 신청 완료
              </FootBtn>
            ) : (
              <FootBtn
                onClick={onNotSubmit}
                style={{ backgroundColor: '#d5d5d5', borderColor: '#d5d5d5', cursor: 'default' }}
                isDeskTop={isDeskTop}
              >
                모든 항목을 선택해주세요
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
  stickyValue?: number;
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
    box-shadow: none;
    padding: 0;
  }
`;

const ScrollBar = styled.div<StyledType>`
  position: ${props => (!props.isDeskTop ? 'fixed' : 'absolute')};
  top: ${props => (!props.isDeskTop ? '97px' : '0')};

  width: 100%;
  left: 0;
  height: 6px;
  z-index: 2;
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
