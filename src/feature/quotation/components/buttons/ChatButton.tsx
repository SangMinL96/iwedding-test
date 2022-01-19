import { useSelectedCartList } from '@feature/quotation/hooks/useSelectedCartList';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import { openChat } from '@modules/mypage/quotation/QuotationAPI';
import { chatLog } from '@modules/user/UserLogAPI';
import Button from '@components/core/buttons/CommonButton';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import { fetchFromIBrand } from '@utils/fetcher';
import useSWR from 'swr';

interface Props {
  isRealtime: boolean;
}

const ChatButton = ({ isRealtime }: Props) => {
  const { selectedQuotation } = useSelectedQuotation();
  const { selectedCartList } = useSelectedCartList();
  const getUserInfo = async () => {
    try {
      const url = 'js_data/main_user_info';
      const { data } = await fetchFromIBrand(url, {});
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: userData } = useSWR<any | undefined>('/main/user_info', () => getUserInfo());
  const onClickChat = useCallback(() => {
    let str = location?.href;
    if (isRealtime) {
      str += '?is_realtime=true';
    }
    openChat(str, false);
    const ent_names = selectedCartList.map(sc => sc.ent_name).join('||');
    if (selectedQuotation) {
      chatLog({
        is_realtime: isRealtime,
        target_quotation_name: selectedQuotation.group_name,
        add_product: false,
        enterprise_name: ent_names,
      });
    }
  }, [isRealtime, selectedQuotation, selectedCartList, userData]);

  return <Btn onClick={onClickChat}>1:1 채팅상담</Btn>;
};

export default React.memo(ChatButton);
const Btn = styled(Button)`
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  color: ${theme.black};
  font-size: 16px;
`;
