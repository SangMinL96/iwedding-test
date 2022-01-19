import { haveAccessToken } from '@service/TokenService';
import myAxios from '@utils/MyAxios';
import {
  OrderCancelRequestLogDto,
  OrderLogDto,
  OrderQuestionLogDto,
  QuotationChatLogDTO,
  QuotationDetailLogDTO,
  QuotationDetailSortLogDTO,
  QuotationLogDTO,
  QuotationSearchLogDTO,
} from './user.interface';

const DOMAIN = 'user_log';
const ICASH = 'icash';

export function quotationDetailLog(dto: QuotationDetailLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/detail', dto);
}

export function quotationAdminDetailLog(dto: QuotationDetailLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/adminDetail', dto);
}

export function addProductClick(dto: QuotationLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/add_cart/click', dto);
}

export function searchProductKeyword(dto: QuotationSearchLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/add_cart/search', dto);
}

export function chatLog(dto: QuotationChatLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/chat', dto);
}

export function checkoutClick(dto: QuotationLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/checkout/click', dto);
}

export function detailSortRealtime(dto: QuotationDetailSortLogDTO) {
  return myAxios.post(DOMAIN + '/quotation/realtime/detail_sort', dto);
}

export function detailSortRealtimeClear() {
  return myAxios.post(DOMAIN + '/quotation/realtime/detail_sort/clear');
}

export function clickOderGoodsDetail(dto: OrderLogDto) {
  return myAxios.post(DOMAIN + '/order/click/goods', dto);
}

export function clickOrderGoodsEntRule(dto: OrderLogDto) {
  return myAxios.post(DOMAIN + '/order/click/ent_rule', dto);
}

export function orderGoodsQuestion(dto: OrderQuestionLogDto) {
  return myAxios.post(DOMAIN + '/order/goods/question', dto);
}

export function loggingOrderGoodsCancelRequest(dto: OrderCancelRequestLogDto) {
  return myAxios.post(DOMAIN + '/order/goods/cancel', dto);
}

export function logIcashIndex() {
  return myAxios.post(`${DOMAIN}/${ICASH}/index`);
}

export function logIcashTabMission() {
  return myAxios.post(`${DOMAIN}/${ICASH}/tab/mission`);
}

export function logIcashTabApplyMission() {
  return myAxios.post(`${DOMAIN}/${ICASH}/tab/apply`);
}

export function logIcashTabUseICashList() {
  return myAxios.post(`${DOMAIN}/${ICASH}/tab/use`);
}

export function logIcashDetail(name: string) {
  if (haveAccessToken()) return myAxios.post(`${DOMAIN}/${ICASH}/detail`, { name });
}

export function logIcashDetailItem(name: string) {
  if (haveAccessToken()) return myAxios.post(`${DOMAIN}/${ICASH}/detail/item`, { name });
}

export function logIcashCompleteApply(name: string, category?: string) {
  if (haveAccessToken()) return myAxios.post(`${DOMAIN}/${ICASH}/apply/complete`, { name, category });
}

export function logIcashClickFAQ(name: string) {
  if (haveAccessToken()) return myAxios.post(`${DOMAIN}/${ICASH}/faq`, { name });
}

export function logIcashClickBanner(name: string) {
  if (haveAccessToken()) return myAxios.post(`${DOMAIN}/${ICASH}/banner`, { name });
}
