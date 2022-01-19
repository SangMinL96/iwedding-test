import React from 'react';

interface stepProps {
  backgorundColor: string;
  stepNum: string;
}

const IconStepCircle = ({ backgorundColor, stepNum }: stepProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'>
      <g id='그룹_1228' data-name='그룹 1228' transform='translate(-62 -71)'>
        <circle id='타원_5' data-name='타원 5' cx='11' cy='11' r='11' transform='translate(62 71)' fill={backgorundColor} />
        <text
          id='_1'
          data-name='1'
          transform='translate(73 87)'
          fill='#fff'
          fontSize='13'
          fontFamily='NotoSansCJKkr-Regular, Noto Sans CJK KR'
        >
          <tspan x='-3.608' y='0'>
            {stepNum}
          </tspan>
        </text>
      </g>
    </svg>
  );
};
export default IconStepCircle;
