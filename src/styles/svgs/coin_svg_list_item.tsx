import React from 'react';

interface SvgColor {
  bgcolor: string;
}

const CoinSvgListItem = ({ bgcolor }: SvgColor) => {
  return (
    <svg id='그룹_168' data-name='그룹 168' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
      <g id='그룹_167' data-name='그룹 167'>
        <rect id='사각형_107' data-name='사각형 107' width='16' height='16' rx='8' fill={bgcolor} />
        <text id='C' transform='translate(8 11)' fill='#fff' fontSize='9' fontFamily='Roboto-Bold, Roboto' fontWeight='700'>
          <tspan x='-2.944' y='0'>
            C
          </tspan>
        </text>
      </g>
    </svg>
  );
};
export default CoinSvgListItem;
