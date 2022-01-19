import React from 'react';

interface fillColor {
  lineColor: string;
}

const IconBoldDownArrow = ({ lineColor }: fillColor) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='9.4' height='6.1' viewBox='0 0 9.4 6.1'>
      <path id='패스_36' data-name='패스 36' d='M4.7,6.1,0,1.4,1.4,0,4.7,3.3,8,0,9.4,1.4Z' fill={lineColor} />
    </svg>
  );
};

export default IconBoldDownArrow;
