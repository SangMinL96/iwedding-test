import Button from '@components/core/buttons/CommonButton';
import { openChat } from '@modules/mypage/quotation/QuotationAPI';
import { WmProductEntity } from '@modules/product/product.interface';
import { chatLog } from '@modules/user/UserLogAPI';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  item: WmProductEntity;
}

const ChatBtn = ({ item }: Props) => {
  const handleOpenChat = () => {
    openChat(process.env.NEXT_PUBLIC_WEB_HOST + '/enterprise/prd/' + item.enterprise_code + '/' + item.no);
    chatLog({
      is_realtime: false,
      add_product: true,
      enterprise_name: item.ent_name,
      product_name: item.name,
      product_no: item.no,
    });
  };

  return <StyledButton onClick={handleOpenChat}>1:1채팅문의</StyledButton>;
};

export default React.memo(ChatBtn);

const StyledButton = styled(Button)`
  color: ${theme.black};
`;
