import { clearToken } from '@service/TokenService';

const NotFound = () => {
  if (typeof window !== 'undefined') {
    clearToken();
    window.location.replace(`https://www.iwedding.co.kr/main/index`);
  }

  return null;
};

export default NotFound;
