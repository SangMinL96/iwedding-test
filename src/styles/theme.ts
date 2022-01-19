import { css } from 'styled-components';

// color: ${props => props.theme.red}; 이런식으로
const colors = {
  black: '#262626',
  lightBlack: '#707070',
  pink: '#fd4381',
  yellow: '#ffc31c',
  lightBlue: '#ebf2ff',
  mediumBlue: '#d7e3fb',
  blue: '#4866E4',
  gray: '#8c8c8c',
  red: '#FF3535',
  lightGray: '#F5F5F5',
  ashgray: '#e4e2e3',
  whiteYellow: '#fafafa',
};

const breakpoints = {
  mobileSM: 320,
  mobileMD: 375,
  mobileLG: 425,
  tablet: 768,
  pc: 1280,
};
const hideScroll = css`
  --ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const textEllipsis = css`
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
// 밑에는 css 도 이렇게 할 수 있다는거
// 스타일 적용할 땐 다른 속성 밑에 ${props => props.theme.flexCenter} 추가해주기.
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const resetBtnStyle = css`
  appearance: none;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;
const skip = css`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
`;
const clearFloat = css`
  display: block;
  clear: both;
  content: '';
`;

const paymentLayoutCSS = css`
  position: relative;
  width: 100%;
  height: 100%;

  .page-wrapper {
    display: block;
    margin: 0 auto;
    width: 1024px;
    min-width: 1024px;
    background-color: #fff;

    @media all and (max-width: ${breakpoints.pc}px) {
      width: 100%;
      min-width: 320px;
    }
    .page-contents {
      margin: 0 auto;
      width: ${breakpoints.pc}px;
      min-width: ${breakpoints.pc}px;
      background-color: #fff;
      padding-top: 70px;

      @media all and (max-width: ${breakpoints.pc}px) {
        width: 100%;
        min-width: 320px;
        padding-top: 0;
      }
      .page-header {
        width: 100%;
        height: 47px;
        margin-bottom: 77px;
        @media all and (max-width: ${breakpoints.pc}px) {
          display: none;
        }
        .title {
          display: inline-block;
          font-size: 32px;
          font-weight: 700;
        }
        .subtitle {
          display: inline-block;
          font-size: 22px;
          font-weight: 300;
          margin-left: 63px;
        }
      }
      .m-page-header {
        display: none;
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #dddddd;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        z-index: 11;
        @media all and (max-width: ${breakpoints.pc}px) {
          display: flex;
        }
        > span {
          font-size: 15px;
        }
        .back-btn {
          ${resetBtnStyle};
          width: 21px;
          height: 43px;
          ${flexCenter};
          position: absolute;
          background: transparent;
          top: 0;
          left: 6px;
          > img {
            width: 9px;
            height: 18px;
          }
        }
        .home-btn {
          ${props => props.theme.resetBtnStyle}
          width: 24px;
          height: 24px;
          background: transparent;
          top: 10px;
          right: 2vw;
          position: absolute;
        }
        .main-box {
          width: 100%;
          .payment-details-box {
            width: 789.7px;
            display: inline-block;
            vertical-align: top;
            margin-left: 50px;
            @media all and (max-width: ${breakpoints.pc}px) {
              width: 100%;
              padding: 38px 0;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
`;

const infoItemCSS = css`
  width: 100%;
  position: relative;
  margin-top: 20px;

  > a,
  > label,
  > .item-inner {
    display: block;
    width: 100%;
    margin-bottom: 20px;

    .info-text-box {
      display: inline-block;
      width: 667px;
      vertical-align: top;
      padding-top: 10px;
      @media all and (max-width: ${breakpoints.pc}px) {
        width: 64%;
      }

      .category-text {
        display: block;
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 10px;
        color: ${colors.gray};
      }

      .title-text {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 15px;
        line-height: 22px;
        @media all and (max-width: ${breakpoints.pc}px) {
          white-space: normal;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 22px;
          height: 44px;
        }
      }
    }

    .info-img {
      float: right;
      display: block;
      width: 75px;
      height: 75px;

      > span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;

        > img {
          height: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    &::after {
      ${clearFloat}
    }
  }
`;

export interface VisibleProps {
  visible: boolean;
}

// 기본 반응형 모달 레이아웃 (새 견적함 만들기) 아직 헤더까지만
const modalLayoutCSS = css`
  width: 407px;
  height: 668px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5); */
  background-color: #fff;
  overflow: scroll;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    overflow: scroll;
    -ms-overflow-style: none;
  }
  @media all and (max-width: ${breakpoints.pc}px) {
    width: 100%;
    height: 100%;
  }

  .modal-header {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #dddddd;
    padding: 44px 30px 30px 30px;
    position: relative;
    @media all and (max-width: ${breakpoints.pc}px) {
      display: none;
    }

    > .title {
      display: block;
      font-size: 20px;
      font-weight: 700;
    }

    > .close-btn {
      display: block;
      position: absolute;
      right: 30px;
      bottom: 32px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      > img {
        width: 100%;
      }
    }
  }

  .m-page-header {
    display: none;
    @media all and (max-width: ${breakpoints.pc}px) {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      border-bottom: 1px solid #dddddd;
      background-color: #fff;
      justify-content: center;
      align-items: center;
      z-index: 2;
      display: flex;
    }

    > span {
      font-size: 15px;
    }

    .back-btn {
      ${props => props.theme.resetBtnStyle}
      width: 21px;
      height: 43px;
      ${props => props.theme.flexCenter}
      position: absolute;
      top: 0;
      left: 1.6vw;

      > img {
        width: 9px;
        height: 18px;
      }
    }
  }
`;

const theme = {
  ...breakpoints,
  ...colors,
  flexCenter,
  hideScroll,
  textEllipsis,
  skip,
  resetBtnStyle,
  clearFloat,
  paymentLayoutCSS,
  infoItemCSS,
  modalLayoutCSS,
};

export default theme;
