import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import hanbok1 from '@images/rsvcenterContent/hanbok1.png';
import hanbok2 from '@images/rsvcenterContent/hanbok2.png';
import hanbok3 from '@images/rsvcenterContent/hanbok3.png';
import hanbok4 from '@images/rsvcenterContent/hanbok4.png';
import hanbok5 from '@images/rsvcenterContent/hanbok5.png';
import hanbok6 from '@images/rsvcenterContent/hanbok6.png';
import hanbok7 from '@images/rsvcenterContent/hanbok7.png';
import hanbok8 from '@images/rsvcenterContent/hanbok8.png';
import hanbok9 from '@images/rsvcenterContent/hanbok9.png';
import Image from 'next/image';
const hanbokContent = [
  {
    title: ' 대여VS맞춤, 나에게 맞는 한복은?',
    link: 'https://www.iwedding.co.kr/main/page/583',
    img: hanbok1,
  },
  { title: ' 혼주 한복 선택은 이렇게!', link: 'https://www.iwedding.co.kr/main/page/590', img: hanbok2 },
  { title: ' 한복 준비 시기 & 이용 방법 총정리!', link: 'https://www.iwedding.co.kr/main/page/585', img: hanbok3 },
  { title: ' 한복 구성&원단 완.벽.정.리', link: 'https://www.iwedding.co.kr/main/page/589', img: hanbok4 },
  { title: ' 피부톤 & 체형별 어울리는 한복 찾기', link: 'https://www.iwedding.co.kr/main/page/587', img: hanbok5 },
  { title: ' 한복샵 방문부터 수령까지!', link: 'https://www.iwedding.co.kr/main/page/588', img: hanbok6 },
  { title: ' 한복은 누가 언제 입나요?', link: 'https://www.iwedding.co.kr/main/page/584', img: hanbok7 },
  { title: ' 예산대에 맞는 한복 준비 방법', link: 'https://www.iwedding.co.kr/main/page/586', img: hanbok8 },
  { title: ' 한복 입는 방법, 관리 방법 도착!', link: 'https://www.iwedding.co.kr/main/page/591', img: hanbok9 },
];
type PropsType = {
  category?: string;
};
function Content3({ category }: PropsType) {
  const onHanbokContent = () => {
    return hanbokContent.map((item, index) => (
      <CardBox href={item.link} key={item.title}>
        <Image unoptimized width={108} height={108} src={item.img} alt='Hanbok Content img' />
        <div>
          <h5>{item.title}</h5>
          {/* <p>24시간 밤낮없는 오픈 마켓</p> */}
        </div>
      </CardBox>
    ));
  };
  return (
    <ContentBox>
      <h3>방문 전 읽으면 좋은 콘텐츠</h3>
      <p>한복샵 방문 시 참고하세요.</p>
      {category === '한복' && onHanbokContent()}
    </ContentBox>
  );
}
export default React.memo(Content3);

const ContentBox = styled.div`
  width: 100%;
  padding: 51px 0 0 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 22px;
    font-size: 14px;
    color: #8c8c8c;
  }
  h5 {
    margin-top: 2.5em;
    margin-bottom: 1em;
    font-size: 15px;
    font-weight: bold;
    &:nth-last-child(4) {
      margin-top: 1.5em;
    }
  }
`;
const CardBox = styled.a`
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  margin-bottom: 20px;

  & > div {
    height: 108px;
    margin-left: 12px;
    h5 {
      margin: 4px 0px 6px;
      width: 80%;
      color: #202020;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
    }
    p {
      color: #8c8c8c;
      font-size: 13px;
    }
  }
`;
