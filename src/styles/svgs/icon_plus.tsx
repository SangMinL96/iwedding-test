import React from 'react';
interface Props {
  width?: number;
  height?: number;
  color?: string;
  rotation?: number;
  thin?: boolean;
}

const IconPlus = ({ width = 10, height = 10, color = '#4866e4', rotation, thin }: Props) => {
  return rotation === 45 ? (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 10.414 10.414'>
      <g id='그룹_1282' data-name='그룹 1282' transform='translate(0.707 0.707)'>
        <line id='선_3' data-name='선 3' x2='9' y2='9' fill='none' stroke={color} strokeLinecap='round' strokeWidth={thin ? '1.0' : '1.'} />
        <line id='선_4' data-name='선 4' x1='9' y2='9' fill='none' stroke={color} strokeLinecap='round' strokeWidth={thin ? '1.0' : '1.'} />
      </g>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 10 10' transform={`rotate(0)`}>
      <defs>
        <clipPath id='clip-path'>
          <rect width={width} height={height} fill='none' />
        </clipPath>
      </defs>
      <g id='new-icon' clipPath='url(#clip-path)'>
        <line
          id='line'
          x1='9'
          transform='translate(0.5 5)'
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth={thin ? '1.0' : '1.3'}
        />
        <line
          id='line-2'
          data-name='line'
          y1='9'
          transform='translate(5 0.5)'
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth={thin ? '1.0' : '1.3'}
        />
      </g>
    </svg>
  );
};
export default IconPlus;
