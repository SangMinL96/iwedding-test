import { Desktop } from '@hooks/useDevice';
import { rsvcenterInquiryBtnLogAPI, rsvcenterInquiryVisitBtnLogAPI } from '@modules/log/rsv/rsvLogger';
import { openReplaceChat } from '@modules/mypage/quotation/QuotationAPI';
import { responseType } from '@modules/rsvcenter/interface';
import theme from '@styles/theme';
import { rsvUrlReplace } from '@utils/util';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

type PropsType = {
  data?: responseType[];
  category?: any;
};
function Content2({ data, category }: PropsType) {
  const isDeskTop = Desktop();

  const onClickChat = (entName: string, sDate: string, category: string, entCode: string) => async ev => {
    ev.preventDefault();
    const safariWindow = isDeskTop && global.window && window.open(null, '_blank', 'width=500,height=900');
    let talkCode;
    if (category === '한복') {
      talkCode = '14494';
    }
    if (category === '예복') {
      talkCode = '14948';
    }
    if (category === '예물') {
      talkCode = '14962';
    }
    const str = `${location.href}\n${entName} ${sDate}`;
    const logResult = await rsvcenterInquiryBtnLogAPI(window.location.href, category, `${category} :::: ${entCode}`);
    if (logResult) {
      openReplaceChat(str, false, talkCode, safariWindow, isDeskTop);
    }
  };

  const onVisit = (entCode: string, categorys: string) => async ev => {
    ev.preventDefault();
    const safariWindow = isDeskTop && global.window.open(null, '_blank');
    const category = categorys === '한복' ? 'hanbok' : categorys === '예복' ? 'robes' : categorys === '예물' ? 'gift' : '';
    const logResult = await rsvcenterInquiryVisitBtnLogAPI(window.location.href, categorys, `${categorys} :::: ${entCode}`);
    if (logResult === 'OK') {
      if (!isDeskTop) {
        global.window &&
          global.window.location.replace(
            `https://www.iwedding.co.kr/rsvcenter/${category}?from=브랜드&code=${entCode}&link=${window.location.href}`,
          );
      } else {
        return (safariWindow.location.href = `https://www.iwedding.co.kr/rsvcenter/${category}?from=브랜드&code=${entCode}`);
      }
    }
  };
  return (
    <ContentBox>
      <h3>확정된 방문 상담 일정</h3>
      <p>스케줄 당일까지 변경/취소 요청이 상시 가능합니다.</p>
      {data?.map((item, index) => (
        <span key={item.no}>
          <CardBox>
            <a href={`/enterprise/info/${item.enterprise_code}`}>
              {item.thumbnail && <Image width={80} height={80} src={`${rsvUrlReplace(item.thumbnail)}`} alt='Inquiry img' />}
            </a>
            <div className='contentBox'>
              <h3>
                <a href={`/enterprise/info/${item.enterprise_code}`}>{item.enterprise_name} </a>
              </h3>
              <p className='date'>{item.schedule_date !== '0000-00-00 00:00:00' ? item.schedule_date : ''}</p>
              <p className='comment'>{item.comment}</p>
              {item.visit_check === '0' ? (
                <EditBtn onClick={onVisit(item.enterprise_code, item.category)}>예약 하기</EditBtn>
              ) : (
                <EditBtn
                  onClick={onClickChat(item.enterprise_name, item.schedule_date, item.category, item.enterprise_code)}
                  id={item.easy_book_no}
                >
                  변경 / 취소
                </EditBtn>
              )}
            </div>
          </CardBox>
          {data.length !== index + 1 && <Divider />}
        </span>
      ))}

      <DescBox>
        <h5>꼭 읽어주세요!</h5>
        {category === '예물' ? (
          <p>{`한 업체당 상담 소요시간은 1시간 내외 입니다.`}</p>
        ) : (
          <p>
            {`업체에 따라 대여${category} 피팅 시 피팅비가 발생하는 경우가 있습니다. (피팅비 금액과 발생여부는 업체별로 상이합니다) 상세한 사항은
          담당자를 통해 확인하실 수 있어요!`}
          </p>
        )}
      </DescBox>
    </ContentBox>
  );
}

export default React.memo(Content2);

const CardBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  background-color: #fff;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  align-items: flex-start;

  @media all and (max-width: ${theme.pc}px) {
    width: 100%;
    margin-right: 0;
    border: 0;
  }
  & > a {
    width: 80px;
    height: 80px;
    margin-right: 12px;
    img {
      width: 80px;
      height: 80px;
      margin-right: 12px;
    }
  }

  .contentBox {
    width: 80%;
    overflow-wrap: normal;
    color: #262626;
    h3 {
      font-size: 15px;
      font-weight: bold;
    }
    .date {
      font-size: 13px;
      margin-top: 6px;
      font-weight: 300;
    }
    .comment {
      width: 80%;
      overflow-wrap: break-word;

      font-size: 13px;
      margin-top: 6px;
      font-weight: 300;
      color: #8c8c8c;
    }
  }
`;
const EditBtn = styled.button`
  margin-top: 15px;
  width: 140px;
  height: 34px;
  border: 1px solid #4866e4;
  color: #4866e4;
  font-size: 14px;
`;

const ContentBox = styled.div`
  width: 100%;
  padding: 51px 0 43px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  & > p {
    margin-top: 12px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #8c8c8c;
  }
  h5 {
    margin-bottom: 15px;
    font-size: 15px;
    font-weight: bold;
    &:nth-last-child(4) {
      margin-top: 1.5em;
    }
  }
`;

const DescBox = styled.div`
  ${props => props.theme.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #f4f6f8;
  border-radius: 10px;

  padding: 20px 20px 20px 15px;
  h5 {
    color: #4866e4;
    font-size: 14px;
    font-weight: bold;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #8c8c8c;
    line-height: 1.5;
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
  background-color: #f2f2f2;
`;
