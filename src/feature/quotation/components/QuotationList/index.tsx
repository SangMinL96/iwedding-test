import { QuotationListItemDto } from '@modules/mypage/quotation/QuotationInterface';
import React from 'react';
import { QuoteListContainer } from './QuoteListContainer';
import QuotationListItem from './QuoteListItem';

interface Props {
  list?: QuotationListItemDto[];
  isRealtime?: boolean;
}

const QuotationList = ({ list, isRealtime = false }: Props) => {
  return (
    <QuoteListContainer>
      {list?.map((item, i) => (
        <QuotationListItem quotation={item} key={`quote_${item.group_no}_${i}`} isRealtime={isRealtime} />
      ))}
    </QuoteListContainer>
  );
};

export default React.memo(QuotationList);
