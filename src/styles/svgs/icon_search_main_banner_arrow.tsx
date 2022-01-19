import React from 'react';

type IconType = {
  type: string;
  color?: string;
};

const IconSearchMainBannerArrow = ({ type, color }: IconType) => {
  return type === 'left' ? (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='13.883' height='12.38' viewBox='0 0 13.883 12.38'>
        <path
          id='Arrow_Right_Black'
          data-name='Arrow Right Black'
          d='M11.974,0,11.2.91s3.266,3.277,4.665,4.552C10.951,5.411,4,5.462,4,5.462V6.554s6.954-.04,11.861,0c-1.4,1.457-4.665,4.734-4.665,4.734l.778,1.092,5.909-6.372Z'
          transform='translate(17.883 12.38) rotate(180)'
          fill='#fff'
        />
      </svg>
    </div>
  ) : (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='13.883' height='12.38' viewBox='0 0 13.883 12.38'>
        <path
          id='Arrow_Right_Black'
          data-name='Arrow Right Black'
          d='M11.974,0,11.2.91s3.266,3.277,4.665,4.552C10.951,5.411,4,5.462,4,5.462V6.554s6.954-.04,11.861,0c-1.4,1.457-4.665,4.734-4.665,4.734l.778,1.092,5.909-6.372Z'
          transform='translate(-4)'
          fill='#fff'
        />
      </svg>
    </div>
  );
};
export default IconSearchMainBannerArrow;
