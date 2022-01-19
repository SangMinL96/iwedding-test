import { QuotationListItemDto } from '@modules/mypage/quotation/QuotationInterface';

const groupItems = (items: QuotationListItemDto[], totalPages: number, itemsPerPage: number): QuotationListItemDto[][] => {
  const groupedItems: QuotationListItemDto[][] = [];

  for (let i = 0; i < totalPages; i++) {
    groupedItems[i] = items.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
  }

  return groupedItems;
};
export const paginateQuoteList = (quoteList: QuotationListItemDto[], totalItems: number, isRealtime: boolean) => {
  const itemsPerPage = isRealtime ? 24 : 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const groupedItems = groupItems(quoteList, totalPages, itemsPerPage);

  return groupedItems;
};
