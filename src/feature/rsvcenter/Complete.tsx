import { rsvcenterCompleteLogAPI } from '@modules/log/rsv/rsvLogger';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';

type PropsType = {
  title?: string;
};

function Complete({ title }: PropsType) {
  const { getValues } = useFormContext();
  const {
    query: { code, from, link, product_name, product_no },
  } = useRouter();
  const router = useRouter();

  const onCompleteLog = () => {
    const propsData = {
      siteUrl: link ? link : `${process.env.NEXT_PUBLIC_WEB_HOST}/${router.asPath}`,
      category: title,
      code,
      product_name,
      product_no,
      from,
      entCodes:
        !from &&
        getValues('easy_book_which_ent')
          ?.map(item => `${title} :::: ${item.enterprise_code}`)
          ?.join(' ##### '),
    };
    rsvcenterCompleteLogAPI(propsData);
  };

  useEffect(() => {
    onCompleteLog();
  }, []);
  return (
    <CompleteBox>
      <h3>{`${title} 간편 예약이 완료되었습니다.`}</h3>
      <p>
        웨딩 전문 담당자가 고객님의 문의 내역을 확인하여
        <br />
        24시간 이내 SMS와 웨딩톡으로 답변드릴 예정입니다.
      </p>
    </CompleteBox>
  );
}

export default React.memo(Complete);

type StyledType = {
  scrollValue?: number;
  isDeskTop?: boolean;
  onSubmit?: any;
};
const CompleteBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
  ${props => props.theme.flexCenter};
  justify-content: flex-start;
  flex-direction: column;
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #262626;
    margin-bottom: 13px;
  }
  p {
    text-align: center;
    ${props => props.theme.flexCenter};
    color: #8c8c8c;
    font-size: 14px;
    line-height: 1.5;
  }
`;
