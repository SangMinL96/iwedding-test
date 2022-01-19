import React from 'react';

interface PropsType {
  checked: boolean;
}

const IconCheckBox = ({ checked }: PropsType) => {
  return checked ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='21.414' height='20' viewBox='0 0 21.414 20'>
      <g id='check-square' transform='translate(-2 -2)'>
        <path
          id='패스_37909'
          data-name='패스 37909'
          d='M9,11l3,3L22,4'
          fill='none'
          stroke='#4866e4'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
        <path
          id='패스_37910'
          data-name='패스 37910'
          d='M21,12v7a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H16'
          fill='none'
          stroke='#4866e4'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        />
      </g>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
      <rect
        id='square'
        width='18'
        height='18'
        rx='2'
        transform='translate(1 1)'
        fill='none'
        stroke='#9a9a9a'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
};
export default IconCheckBox;
