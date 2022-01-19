import React from 'react';

type PropsType = {
  type: 'up' | 'down';
};

export const IconCountArrow = ({ type }: PropsType) => {
  return (
    <>
      {type === 'up' && (
        <svg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9'>
          <path id='다각형_8' data-name='다각형 8' d='M5,0l5,9H0Z' fill='#262626' />
        </svg>
      )}
      {type === 'down' && (
        <svg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9'>
          <path id='다각형_9' data-name='다각형 9' d='M5,0l5,9H0Z' transform='translate(10 9) rotate(180)' fill='#262626' />
        </svg>
      )}
    </>
  );
};
