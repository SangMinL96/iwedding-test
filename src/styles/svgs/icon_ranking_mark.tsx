import React from 'react';

type IconType = {
  width?: string;
  height?: string;
};

const IconRankingMark = ({ width = '40', height = '50' }: IconType) => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 40 50'>
        <g id='그룹_417' data-name='그룹 417' transform='translate(-320 -2892)'>
          <g id='구성_요소_54_1' data-name='구성 요소 54 – 1' transform='translate(320 2892)'>
            <rect id='사각형_34' data-name='사각형 34' width='40' height='40' fill='#f44646' />
            <g id='구성_요소_53_1' data-name='구성 요소 53 – 1'>
              <path
                id='ic_bookmark'
                d='M295.286,198H266.714A5.653,5.653,0,0,0,261,203.556V248l20-8.333L301,248V203.556A5.653,5.653,0,0,0,295.286,198Z'
                transform='translate(-261 -198)'
                fill='#f44646'
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default IconRankingMark;
