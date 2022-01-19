import { Desktop } from '@hooks/useDevice';
import { rsvcenterInquiryLogAPI } from '@modules/log/rsv/rsvLogger';
import { easyBookType } from '@modules/rsvcenter/interface';
import IconArrowRight from '@svgs/icon_Arrow_Right';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styled from 'styled-components';
import GiftModal from '../detailModal/GiftModal';
import HanbokModal from '../detailModal/HanbokModal';
import RobesModal from '../detailModal/RobesModal';

type PropsType = {
  data?: easyBookType;
};

function Content1({ data }: PropsType) {
  const isDeskTop = Desktop();
  const router = useRouter();
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);

  const onDetail = () => {
    router.push(router.asPath + '#inquiryinfo');
    setVisibleDetail(true);
    const text2 = data?.easy_book_which_ent?.map(item => `${data?.category} :::: ${item.enterprise_code}`).join(' ##### ');
    rsvcenterInquiryLogAPI(window.location.href, data?.category, text2);
  };
  return (
    <ContentBox isDeskTop={isDeskTop}>
      <TopNavBtn isDeskTop={isDeskTop} onClick={onDetail}>
        {`나의 ${data?.category || ''} 문의 내역 자세히 보기`}
        <span>
          <IconArrowRight />
        </span>
      </TopNavBtn>
      <h3>방문 안내 사항</h3>
      <p>{data?.guide}</p>
      {visibleDetail && data?.category === '한복' && (
        <HanbokModal
          data={data}
          visible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
          onConfirm={() => setVisibleDetail(false)}
          isFullSize={true}
        />
      )}
      {visibleDetail && data?.category === '예복' && (
        <RobesModal
          data={data}
          visible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
          onConfirm={() => setVisibleDetail(false)}
          isFullSize={true}
        />
      )}
      {visibleDetail && data?.category === '예물' && (
        <GiftModal
          data={data}
          visible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
          onConfirm={() => setVisibleDetail(false)}
          isFullSize={true}
        />
      )}
    </ContentBox>
  );
}

export default React.memo(Content1);

type StyledType = {
  isDeskTop?: boolean;
  count?: number | string;
};
const ContentBox = styled.div<StyledType>`
  position: relative;
  width: 100%;
  padding: 0 0 35px 0;
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-top: ${props => !props.isDeskTop && '43px'};
  }
  & > p {
    margin-top: 12px;

    font-size: 14px;
    color: #8c8c8c;
    line-height: 1.5;
  }
`;

const TopNavBtn = styled.div<StyledType>`
  ${props => props.theme.flexCenter};
  cursor: pointer;
  margin-top: ${props => !props.isDeskTop && '40px;'};
  justify-content: space-between;
  padding: 0 14px;
  width: 100%;
  height: 50px;
  border: 2px solid #4866e4;
  font-size: 15px;
  color: #4866e4;
  font-weight: bold;
  margin-bottom: 40px;
`;
