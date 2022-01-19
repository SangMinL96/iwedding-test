import React from 'react';
interface Props {
  type: 1 | 2 | 3 | 0;    // 1:상승 2:하락 3:신규 0:변동없음
}

const IconPopular = ({ type }: Props) => {
  return type === 1 ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='8.333' viewBox='0 0 10 8.333'>
      <path id='다각형_1' data-name='다각형 1' d='M5,0l5,8.333H0Z' fill='red' />
    </svg>
  ) : type === 2 ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='8.333' viewBox='0 0 10 8.333'>
      <path id='패스_1215' data-name='패스 1215' d='M5,0l5,8.333H0Z' transform='translate(10 8.333) rotate(180)' fill='#1c46f5' />
    </svg>
  ) : type === 3 ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='15' viewBox='0 0 24 15'>
      <g id='그룹_73' data-name='그룹 73' transform='translate(-372 -1938)'>
        <text id='NEW' transform='translate(372 1949)' fill='#fd568e' fontSize='10' fontFamily='Poppins-Bold, Poppins' fontWeight='700'>
          <tspan x='0' y='0'>
            NEW
          </tspan>
        </text>
      </g>
    </svg>
  ) : type === 0 ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='3' viewBox='0 0 12 3'>
      <rect id='사각형_101' data-name='사각형 101' width='12' height='3' fill='#262626' />
    </svg>
  ) : null;
};
export default IconPopular;
