import { Latest } from '@feature/quotation/components/modals/detail_sort_modal/ModalRealLatest';
import { DetailSortType } from '@feature/quotation/components/modals/detail_sort_modal/ModalRealSortIndex';
import { useSelectedSortValue } from '@feature/quotation/hooks/useSelectedSortValue';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { usePagination } from '@hooks/usePagination';
import { useSort } from '@hooks/useSort';
import { PaginationInterface } from '@modules/CommonInterface';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import {
  GroupAddProductDto,
  GroupOptionSelectDto,
  QuotationDetail,
  QuotationListItemDto,
  QuotationNameKeyword,
  QuotationRecommend,
  SelectUpdateMetadataDto,
} from '@modules/mypage/quotation/QuotationInterface';
import { ProductCategoryValue, WmProductEntity } from '@modules/product/product.interface';
import { QuotationDetailSortLogDTO } from '@modules/user/user.interface';
import { quotationAdminDetailLog, quotationDetailLog } from '@modules/user/UserLogAPI';
import { haveAccessToken } from '@service/TokenService';
import { fetcher, postFormDataToIBrand } from '@utils/fetcher';
import { getDeviceType } from '@utils/getDeviceType';
import { MY_QUOTE_SORT, RT_QUOTE_SORT } from '@utils/localSwrKeys';
import myAxios from '@utils/MyAxios';
import { storeSortOptions } from '@utils/sortOptions';
import { openPopup } from '@utils/util';
import router, { useRouter } from 'next/router';
import { Range } from 'react-input-range';
import useSWR, { useSWRInfinite } from 'swr';
import { isDesktop } from 'react-device-detect';

const domain = '/quotation';
const LIST_ALL = 'list/all';
const NAME_KEYWORD = 'name-keyword';
export const MY_QUOTE_METADATA = 'MY_QUOTE_METADATA';
export const REALTIME_LAST_QUOTE_META = 'REALTIME_LAST_QUOTE_META';
export const MY_QUOTE_PAGINATION = 'MY_QUOTE_PAGINATION';
export const REALTIME_PAGINATION = 'REALTIME_PAGINATION';

export const adminDetailLog = async (quotation: QuotationDetail) => {
  if (quotation) {
    await quotationAdminDetailLog({
      is_realtime: false,
      target_quotation_no: quotation.group_no,
      target_quotation_name: quotation.group_name,
    });
  }
};
export const adminLog = async (quotation: QuotationDetail) => {
  if (quotation) {
    await quotationDetailLog({ is_realtime: false, target_quotation_name: quotation.group_name });
  }
};

/**
 * ??? ????????? ?????????
 */
export const useMyQuotationList = () => {
  const isLoggedIn = haveAccessToken();
  const router = useRouter();
  const { currentSort } = useSort(MY_QUOTE_SORT, storeSortOptions[0]);
  const { page, setPage } = usePagination(MY_QUOTE_PAGINATION);
  const QnAForm = router.route.includes('/request/replace') || router.route.includes('/request/form');
  const { data, mutate, isValidating } = useSWR<PaginationInterface<QuotationListItemDto>>(
    `/quotation?page=${page}&sort=${currentSort?.method}`,
    !QnAForm && isLoggedIn ? fetcher : null,
    {
      dedupingInterval: 3600000,
    },
  );

  useDeepEffect(() => {
    setPage(1);
  }, [currentSort?.method]);

  return { list: data?.items, metadata: data?.meta, mutate, isValidating };
};

/**
 * ????????? ??? ??? ????????? ?????????
 */
export const useInfiMyQuotationList = () => {
  const { currentSort } = useSort(MY_QUOTE_SORT, storeSortOptions[0]);
  const { data, mutate, error, isValidating, size, setSize } = useSWRInfinite<PaginationInterface<QuotationListItemDto>>(
    size => `${domain}?page=${size + 1}&sort=${currentSort?.method}`,
    fetcher,
  );

  return { data, metadata: data?.[0]?.meta, mutate, error, isValidating, size, setSize };
};
/**
 * ??? ????????? ??????
 */
export const useQuotationDetail = (quotation_id: number, is_realtime?: boolean) => {
  const url = quotation_id ? `${domain}/${quotation_id}${is_realtime ? '?is_realtime=true' : ''}` : null;

  return useSWR<QuotationDetail>(url, fetcher);
};

// ?????? 3?????? ???????????? ??????????????? ???????????????.
// ?????????????????? ????????? ?????? ?????? ?????? CRA?????? ????????? ??????????????? ??????.
const sortValueToString = (sv: Record<DetailSortType, any[]>) => {
  let svStrObj = {};
  Object.entries(sv).forEach(([type, value]) => {
    if (type == DetailSortType.PRICE_RANGE) {
      const { min, max } = value[0] as Range;
      svStrObj[type] = `${min},${max}`;
    } else if (type == DetailSortType.CATEGORY) {
      svStrObj[type] = (value as ProductCategoryValue[]).join();
    } else if (type == DetailSortType.ENT_CODE) {
      svStrObj[type] = (value as EnterpriseDto[]).map(ent => ent.enterprise_code).join();
    } else if (type == DetailSortType.PRODUCT_NO) {
      svStrObj[type] = (value as WmProductEntity[]).map(prd => prd.no).join();
    } else if (type == DetailSortType.UPDATED_AT_RANGE) {
      const { start, end } = value[0] as Latest;
      svStrObj[type] = `${start},${end}`;
    }
  });
  return svStrObj as Record<DetailSortType, string>;
};

const svStrToQuery = (svStr: Record<DetailSortType, string>): string => {
  const strArr = Object.entries(svStr);
  if (strArr.length)
    return strArr.reduce((acc, [type, value], index) => (acc += `${type}=${value}${index !== strArr.length - 1 ? '&' : ''}`), '&');
  return '';
};

export const detailSortLog = (sv: Record<DetailSortType, any[]>) => {
  const sortValueInStr = sortValueToString(sv);
  const dto = new QuotationDetailSortLogDTO();
  Object.entries(sortValueInStr).forEach(([type, value]) => (dto[type] = value));
  return dto;
};

/**
 * ????????? ????????? LIST
 */
export const useRealtimeInfiPage = () => {
  const { currentSort } = useSort(RT_QUOTE_SORT, storeSortOptions[0]);
  const { selectedSortValue } = useSelectedSortValue();
  let targetURL = `/quotation/realtime/list?sort=${currentSort?.method ?? 'latest'}`;
  const realtimeInfinityLimit = 24;

  if (selectedSortValue && Object.keys(selectedSortValue).length) {
    const svStr = sortValueToString(selectedSortValue);
    const query = selectedSortValue && svStrToQuery(svStr);
    targetURL += '&' + query;
  }

  const { data, isValidating, size, setSize, error, mutate } = useSWRInfinite<PaginationInterface<QuotationListItemDto>>(
    index => `${targetURL}&page=${index + 1}&limit=${realtimeInfinityLimit}`,
    fetcher,
  );

  return { data, metadata: data?.[0]?.meta, isValidating, size, setSize, mutate, error };
};

export const useGetRealtimeQuotation = (page = 1) => {
  const { currentSort } = useSort(RT_QUOTE_SORT, storeSortOptions[0]);
  const { setPage } = usePagination(REALTIME_PAGINATION);
  const { selectedSortValue } = useSelectedSortValue();

  let targetURL = `/quotation/realtime/list?sort=${currentSort?.method ?? 'latest'}&limit=90`;

  if (selectedSortValue && Object.keys(selectedSortValue).length) {
    const svStr = sortValueToString(selectedSortValue);
    const query = selectedSortValue && svStrToQuery(svStr);
    targetURL += '&' + query;
  }

  useDeepEffect(() => {
    if (currentSort?.method) setPage(1);
  }, [currentSort?.method]);

  const { data, isValidating, mutate } = useSWR<PaginationInterface<QuotationListItemDto>>(`${targetURL}&page=${page}`, fetcher);

  return { data: data?.items, metadata: data?.meta, isValidating, mutate };
};

/**
 * ????????? ?????? ??? ?????? ?????? ????????? ?????????
 */
export const useGetQuotationNameKeyword = () => {
  const url = domain + '/' + NAME_KEYWORD;
  const { data, error, isValidating } = useSWR<QuotationNameKeyword[]>(url, fetcher);
  return { data, error, isValidating };
};

/**
 * ??? ?????? ????????? ????????? (?????? ?????? ???)
 */
export const useGetMyAllQuotationList = () => {
  const url = domain + '/' + LIST_ALL;
  const { data, mutate, isValidating } = useSWR<QuotationListItemDto[]>(url, fetcher);
  return { data, mutate, isValidating };
};

/**
 * ??? ????????? ?????? ??????
 * @param group_no
 * @param group_name
 */
export const updateQuotationName = (group_no: number | string, group_name: string) => {
  return myAxios.put(domain + '/' + group_no, { group_name });
};

/**
 * ??? ????????? ??????
 * @param group_no
 */
export const deleteQuotation = (group_no: number | string) => {
  return myAxios.delete(domain + '/' + group_no);
};

/**
 * ????????? ??????
 * @param name
 */
export const createQuotation = (name: string) => {
  return myAxios.post(domain, { group_name: name });
};

/**
 * ?????? ????????????
 * @param dto
 */
export const applySelectOption = (dto: GroupOptionSelectDto) => {
  return myAxios.post(domain + '/' + dto.group_no + '/item/option/select', dto);
};

/**
 * ????????????
 * @param group_no ????????? ID
 * @param cart_nos ????????? ????????? ID
 */
export const deleteCart = (group_no: string, cart_nos: number[]) => {
  return myAxios.post(domain + '/' + group_no + '/item/delete', { cart_nos: cart_nos });
};

/**
 * ????????? ??????????????? ????????? ?????? ?????? ?????? ???????????? ?????? ??????
 *
 * @param group_no ????????? ID
 * @param productNos ????????? ?????? ID
 */
export const addItemsToQuotation = (group_no: string, productNos: number[]) => {
  const fd = new FormData();
  // fd.append('product_count', JSON.stringify(productNos.length));
  fd.append('product_count', String(1));
  productNos.forEach(pn => fd.append('product_no[]', JSON.stringify(pn)));
  // fd.append('product_no', JSON.stringify(productNos));
  fd.append('group_no', group_no);
  fd.append('device', String(getDeviceType()));
  return postFormDataToIBrand('/api_v1/quotation/addItem', fd);
};

/**
 * ?????? ??????
 */
export const copyQuotationItem = (group_nos: string[], cart_nos: number[], is_realtime: boolean) => {
  console.log(`cart_nos`, cart_nos);
  return myAxios.post(domain + '/copy', { group_nos, cart_nos, is_realtime });
};

/**
 * ??????????????? ????????????
 * @param metadata_list
 */
export const selectUpdateMetadata = ({ metadata_list }: SelectUpdateMetadataDto) => {
  return myAxios.put(domain + '/item/metadata', { metadata_list });
};

/**
 * ???????????? ?????? ??????
 * @param addDto
 */
export const addProductToQuotation = (addDto: GroupAddProductDto) => {
  return myAxios.post(`${domain}/item/`, addDto);
};

/**
 * ????????? ??? ???????????? ??? ???????????? ??????
 * @param group_no
 */
export const editGroupNo = (group_no: number) => {
  return myAxios.post(`${domain}/editFlag`, { group_no });
};

export const adminAddCart = (text1: string, text2: string, logInt1?: string | number) => {
  return myAxios.post(`user_log${domain}/admin/addCart`, { text1, text2, logInt1 });
};

export const openChat = (str: string, noOpen = false, knock_btn_no?: string) => {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://www.iwedding.co.kr/mobile/talk/get_room_info', true);
  const formdata = new FormData();
  formdata.append('referer', str);
  if (knock_btn_no) {
    formdata.append('knock_btn_no', knock_btn_no);
  }
  request.send(formdata);
  request.onload = function () {
    if (!noOpen)
      if (this.status == 200) {
        const response = JSON.parse(this.response);
        if (response.result) {
          if (!isDesktop) {
            const web_src = `${process.env.NEXT_PUBLIC_WEB_HOST}/chat/iwedding?_id=${response.data.room_pt_no}&room_no=${response.data.room_no}`;
            global.window && window.open(web_src, 'chat_win', 'width=500,height=900');
          } else {
            location.href = `${process.env.NEXT_PUBLIC_WEB_HOST}/chat/iwedding?_id=${response.data.room_pt_no}&room_no=${response.data.room_no}`;
          }
        }
      }
  };
  request.onerror = function () {
    alert('????????? ????????? ??? ????????????.');
  };
};

//????????????
export const openReplaceChat = (str: string, noOpen = false, knock_btn_no?: string, safariWindow?: any, deskTop: boolean = false) => {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://www.iwedding.co.kr/mobile/talk/get_room_info', true);
  const formdata = new FormData();
  formdata.append('referer', str);
  if (knock_btn_no) {
    formdata.append('knock_btn_no', knock_btn_no);
  }
  request.send(formdata);
  request.onload = function () {
    if (!noOpen)
      if (this.status == 200) {
        const response = JSON.parse(this.response);
        if (response.result) {
          if (deskTop) {
            safariWindow.location.href = `${process.env.NEXT_PUBLIC_WEB_HOST}/chat/iwedding?_id=${response.data.room_pt_no}&room_no=${response.data.room_no}`;
          } else {
            location.href = `${process.env.NEXT_PUBLIC_WEB_HOST}/chat/iwedding?_id=${response.data.room_pt_no}&room_no=${response.data.room_no}`;
          }
        }
      }
  };
  request.onerror = function () {
    alert('????????? ????????? ??? ????????????.');
  };
};

//????????????
export const openChatList = (isDeskTop: boolean) => {
  if (isDeskTop) {
    global.window && openPopup('https://www.iwedding.co.kr/chat/list', 'chat_list_win');
  } else {
    router.push('https://www.iwedding.co.kr/chat/list');
  }
};

/**
 * ??????????????? LIST
 * @param active
 * @param page
 * @param limit
 */
export const useGetRecommendQuotation = (page = 1, limit = 4) => {
  const url = `/quotation/recommend/list`;
  return useSWR<PaginationInterface<QuotationRecommend>>(url, fetcher);
};

export const recommendQuotationCount = (quotation_no: string) => {
  return myAxios.post('/quotation/recommend/' + quotation_no + '/view');
};
