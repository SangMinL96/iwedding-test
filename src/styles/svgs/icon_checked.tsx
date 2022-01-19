import React from 'react';

type PropsType = {
  checked: boolean;
};

export const IconChecked = ({ checked }: PropsType) => {
  return checked ? (
    <svg id='checkbox-active' xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21'>
      <circle id='타원_385' data-name='타원 385' cx='10.5' cy='10.5' r='10.5' fill='#4866e4' />
      <g id='그룹_1187' data-name='그룹 1187' transform='translate(5.101 7.4)'>
        <path
          id='패스_1201'
          data-name='패스 1201'
          d='M5.6,10.9,8.7,14l7.2-7.1'
          transform='translate(-5.6 -6.9)'
          fill='none'
          stroke='#fff'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='1'
        />
      </g>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21'>
      <defs>
        <clipPath id='clip-path'>
          <rect width='21' height='21' fill='none' />
        </clipPath>
      </defs>
      <g id='checkbox-inactive' clipPath='url(#clip-path)'>
        <g id='ellipse' fill='none' stroke='#dfdfdf' strokeWidth='1'>
          <circle cx='10.5' cy='10.5' r='10.5' stroke='none' />
          <circle cx='10.5' cy='10.5' r='10' fill='none' />
        </g>
      </g>
    </svg>
  );
};
