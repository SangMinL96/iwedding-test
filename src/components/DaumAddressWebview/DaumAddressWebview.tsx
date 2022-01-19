import NoList from '@components/core/texts/NoList';
import Loading from '@components/Loading';
import theme from '@styles/theme';
import Script from 'next/script';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

interface AddressWebviewProps {
  onConfirm: (address: string) => void;
}

// 참조: https://postcode.map.daum.net/guide
const DaumAddressWebView = ({ onConfirm }: AddressWebviewProps) => {
  const { loading, setLoading } = useDaumLoadingState(); // initial value: true
  const [error, setError] = useState(false); // error state
  const defaultErrorMsg = '주소 검색 창을 불러오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'; // default error msg
  const webviewRef = useRef<HTMLDivElement>();

  const handleError = useCallback(
    error => {
      setLoading(false);
      setError(true);
      window.alert(JSON.stringify(error));
      console.error(error);
    },
    [setLoading, setError],
  );
  const handleConfirm = useCallback(
    (data: any) => {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      let addr = ''; // 주소 변수
      let extraAddr = ''; // 참고항목 변수
      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }
      onConfirm(addr || '');
    },
    [onConfirm],
  );
  const loadDaumAddress = useCallback(() => {
    if (typeof window !== 'undefined' && window.daum && webviewRef?.current) {
      const postcodeAPI = new window.daum.Postcode({
        oncomplete: handleConfirm,
        onerror: handleError,
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.

        animation: true,
        width: '100%',
        height: '100%',
        scrollbars: 'none',
      });

      postcodeAPI.embed(webviewRef.current);
      // iframe을 넣은 element를 보이게 한다.
      webviewRef.current.style.display = 'block';
    }
  }, [handleError, handleConfirm]);

  const handleInitialLoad = useCallback(() => {
    setTimeout(() => {
      loadDaumAddress();
      setLoading(false);
    }, 200);
  }, [setLoading, loadDaumAddress]);

  useEffect(() => {
    if (webviewRef?.current && !loading) {
      loadDaumAddress();
    }
  }, [webviewRef, loadDaumAddress, loading, setLoading]);

  return (
    <>
      {loading && <Loading body='주소검색 창을 로딩 중입니다.' />}
      <Script
        id='daum_address_script'
        src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
        onLoad={handleInitialLoad}
        onError={handleError}
      />
      {error && <NoList text={defaultErrorMsg} noBorder />}
      <DaumAddressWrapper id='daum_address_webview' ref={webviewRef} />
    </>
  );
};

export default DaumAddressWebView;

const useDaumLoadingState = () => {
  const { data, mutate } = useSWR('DAUM_LOADING_STATE', null);

  return { loading: data ?? true, setLoading: (state: boolean) => mutate(state, false) };
};

const DaumAddressWrapper = styled.div`
  overflow-y: scroll;
  overflow: hidden;
  ${theme.hideScroll};
`;
interface DaumAddressProps {
  zonecode?: string;
  address?: string;
  addressEnglish?: string;
  addressType?: string;
  userSelectedType?: string;
  noSelected?: string;
  userLanguageType?: string;
  roadAddress?: string;
  roadAddressEnglish?: string;
  jibunAddress?: string;
  jibunAddressEnglish?: string;
  autoRoadAddress?: string;
  autoRoadAddressEnglish?: string;
  autoJibunAddress?: string;
  autoJibunAddressEnglish?: string;
  buildingCode?: string;
  buildingName?: string;
  apartment?: string;
  sido?: string;
  sidoEnglish?: string;
  sigungu?: string;
  sigunguEnglish?: string;
  sigunguCode?: string;
  roadnameCode?: string;
  bcode?: string;
  roadname?: string;
  roadnameEnglish?: string;
  bname?: string;
  bnameEnglish?: string;
  bname1?: string;
  bname1English?: string;
  bname2?: string;
  bname2English?: string;
  hname?: string;
  query?: string;
  postcode?: string;
  postcode1?: string;
  postcode2?: string;
  postcodeSeq?: string;
}
