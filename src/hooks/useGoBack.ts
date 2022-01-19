import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Desktop } from './useDevice';
import { useIsIOS } from './useIsIOS';

function useGoBack(is_list = false) {
  const router = useRouter();
  const isDeskTop = Desktop();
  const iosWebview = useIsIOS();

  return useCallback(() => {
    if (is_list && isDeskTop && !iosWebview) {
      return router.replace('/main/index');
    }
    // 결제하기에서 뒤로가기시 결제하기->견적함->결제하기->견적함 무한 루프도는 버그 수정 위한 예외처리
    if (/quotation\/\d+/.test(router.asPath)) {
      router.replace('/quotation');
    } else {
      router.back();
    }
  }, [router, isDeskTop, is_list, iosWebview]);
}

export default useGoBack;
