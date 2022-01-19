import React from 'react';
type PropsType = {
  type: 'slideLeft' | 'slideRight';
};

const IconSlideBtn = ({ type }: PropsType) => {
  return (
    <>
      {type === 'slideLeft' && (
        <svg xmlns='http://www.w3.org/2000/svg' width='16.828' height='30.828' viewBox='0 0 16.828 35'>
          <g id='그룹_417' data-name='그룹 417' transform='translate(1.414 5.414)'>
            <line
              id='선_17'
              data-name='선 17'
              x1='14'
              y2='14'
              transform='translate(0 0)'
              fill='none'
              stroke='#737373'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
            <line
              id='선_18'
              data-name='선 18'
              x2='14'
              y2='14'
              transform='translate(0 14)'
              fill='none'
              stroke='#737373'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </g>
        </svg>
      )}
      {type === 'slideRight' && (
        <svg xmlns='http://www.w3.org/2000/svg' width='16.828' height='30.828' viewBox='0 0 16.828 36'>
          <g id='그룹_422' data-name='그룹 422' transform='translate(1.027 5.475)'>
            <path
              id='패스_78'
              data-name='패스 78'
              d='M.606,14.21,15,0'
              transform='translate(-0.219 15)'
              fill='none'
              stroke='#737373'
              strokeLinecap='round'
              strokeWidth='2'
            />
            <path
              id='패스_79'
              data-name='패스 79'
              d='M15,15,.715.939'
              transform='translate(-0.219)'
              fill='none'
              stroke='#737373'
              strokeLinecap='round'
              strokeWidth='2'
            />
          </g>
        </svg>
      )}
    </>
  );
};
export default IconSlideBtn;
