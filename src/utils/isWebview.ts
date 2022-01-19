import { isMobile } from 'react-device-detect';

export const WEB_VIEW_STRING = 'iWeddingAppV3';

export const isWebview = () => {
  //앱 업데이트시 유저에이전트 변경 필
  return global.window && isMobile && /IWDAPPV4/i.test(window.navigator.userAgent);
  // return global.window && isMobile && /iWeddingAppV3/i.test(window.navigator.userAgent);
};
