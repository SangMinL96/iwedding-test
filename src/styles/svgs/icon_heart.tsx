import React from 'react';

interface heartProps {
  heartColor: string;
}

const IconHeart = ({ heartColor }: heartProps) => {
  return (
    <svg id='그룹_470' data-name='그룹 470' xmlns='http://www.w3.org/2000/svg' width='21.581' height='18.76' viewBox='0 0 21.581 18.76'>
      <path
        id='패스_4'
        data-name='패스 4'
        d='M35.965,32.1l-1.16,1.16-1.16-1.16a5.632,5.632,0,0,0-7.983,0h0a5.681,5.681,0,0,0,0,7.983L34.806,49.2l9.142-9.142a5.632,5.632,0,0,0,0-7.983h0A5.656,5.656,0,0,0,35.965,32.1Z'
        transform='translate(-24.025 -30.437)'
        fill={heartColor}
      />
    </svg>
  );
};
export default IconHeart;
