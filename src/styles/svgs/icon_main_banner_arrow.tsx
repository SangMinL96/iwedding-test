import React from 'react';

type IconType = {
  type: string;
  color?: string;
};

const IconMainBannerArrow = ({ type, color }: IconType) => {
  return type === 'left' ? (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='12.38' viewBox='0 0 17.883 12.38'>
        <path
          id='Arrow_Right_Black'
          data-name='Arrow Right Black'
          d='M11.974,0,11.2.91s3.266,3.277,4.665,4.552C10.951,5.411,0,5.462,0,5.462V6.554s10.954-.04,15.861,0c-1.4,1.457-4.665,4.734-4.665,4.734l.778,1.092,5.909-6.372Z'
          transform='translate(17.883 12.38) rotate(180)'
          fill={color ?? 'white'}
        />
      </svg>
    </div>
  ) : (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='12.38' viewBox='0 0 17.883 12.38'>
        <path
          id='Arrow_Right_Black'
          data-name='Arrow Right Black'
          d='M11.974,0,11.2.91s3.266,3.277,4.665,4.552C10.951,5.411,0,5.462,0,5.462V6.554s10.954-.04,15.861,0c-1.4,1.457-4.665,4.734-4.665,4.734l.778,1.092,5.909-6.372Z'
          fill={color ?? 'white'}
        />
      </svg>
    </div>
  );
};
export default IconMainBannerArrow;
