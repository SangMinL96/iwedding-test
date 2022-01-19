import { CommonRadioBox } from '@components/core/checkboxes';
import React from 'react';
import styled from 'styled-components';

const QuestionData: { str: string; id: string }[] = [
  { str: '상품 일정 문의', id: 'schedule' },
  { str: '상품 변경 문의', id: 'change' },
  { str: '상품 취소 문의', id: 'cancel' },
  { str: '불편사항', id: 'complain' },
  { str: '기타', id: 'etc' },
];

interface QuestionProps {
  onChange: (data: { str: string; id: string }) => void;
}
const QuestionList = ({ onChange }: QuestionProps) => {
  return (
    <Container>
      {QuestionData.map((data, index) => (
        <label htmlFor={data.id} key={index}>
          <div className='inquiry_type' key={index}>
            <CommonRadioBox name='inquiryType' id={data.id} onChange={() => onChange(data)} />
            <label className='radio_label' htmlFor={data.id}>
              {data.str}
            </label>
          </div>
        </label>
      ))}
    </Container>
  );
};
export default QuestionList;

const Container = styled.div`
  width: 100%;
  position: relative;
  .inquiry_type {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #dfdfdf;
    cursor: pointer;
    > div {
      display: inline-block;
      cursor: pointer;
    }
    .radio_label {
      display: inline-block;
      font-size: 15px;
      vertical-align: top;
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;
