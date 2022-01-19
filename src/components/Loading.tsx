import React from 'react';

import styled from 'styled-components';

interface LoadingProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  delay?: number;
  margin?: string;
  visible?: boolean;
  title?: string;
  body?: any;
}
const Loading = ({ width = '54px', height = '54px', color = '#4866E4', delay = 0, margin, title, body }: LoadingProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '400px',
        margin: margin ? margin : '',
      }}
    >
      <SpinnerImg>
        <svg
          version='1.0'
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          viewBox='0 0 512.000000 512.000000'
          preserveAspectRatio='xMidYMid meet'
        >
          <g transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)' fill='#0984e3' stroke='none'>
            <path
              d='M2332 5029 c-593 -45 -1164 -305 -1584 -721 -393 -389 -640 -879
     -724 -1433 -25 -166 -25 -521 0 -690 53 -361 188 -715 386 -1012 110 -165 188
     -259 336 -403 387 -376 847 -597 1394 -671 52 -7 181 -13 285 -13 203 0 309
     11 500 51 248 51 540 169 762 306 270 168 548 441 726 712 156 239 293 583
     337 845 20 123 19 120 48 120 91 1 193 55 254 135 65 85 78 171 59 385 -48
     535 -249 1036 -581 1445 -84 105 -273 293 -380 378 -514 414 -1165 616 -1818
     566z m300 -499 c444 -43 885 -246 1206 -554 277 -266 479 -619 567 -991 34
     -146 46 -239 54 -440 8 -205 18 -240 91 -319 42 -45 131 -96 169 -96 30 0 34
     -14 21 -78 -36 -176 -103 -369 -192 -547 -323 -648 -926 -1098 -1646 -1227
     -110 -19 -161 -22 -372 -22 -261 0 -342 9 -540 59 -311 79 -617 233 -862 432
     -170 139 -375 377 -491 569 -66 109 -155 306 -197 432 -257 785 -50 1636 537
     2203 449 433 1038 639 1655 579z'
            />
          </g>
        </svg>
      </SpinnerImg>
      {title ? <h2 style={{ marginTop: '10px' }}>{title}</h2> : null}
      {body ? <h3 style={{ marginTop: '10px' }}>{body}</h3> : null}
    </div>
  );
};

export default React.memo(Loading);

const SpinnerImg = styled.span`
  ${props => props.theme.flexCenter};
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
