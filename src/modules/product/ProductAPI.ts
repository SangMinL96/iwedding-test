/**
 * 사용 가능한 옵션 리스트
 *
 */
import myAxios from '@utils/MyAxios';
import { GroupProductDto } from '../mypage/quotation/QuotationInterface';
import { ProductCategoryValue, WmProductEntity } from './product.interface';
import { PaginationInterface } from '@modules/CommonInterface';
import { SortType } from '@utils/sortOptions';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '@utils/fetcher';

export const ProductPagination = 'product_pagination';
const domain = '/product';
export const productKeys = {
  storeData: 'product/store',
};
// 가능한 옵션
export const fetchAvailableOptions = (main_product_no: number) => {
  return myAxios.get<GroupProductDto[]>(domain + '/' + main_product_no + '/option/list');
};

//상품 리스트
export const fetchProductList = (page = 1, category: ProductCategoryValue, sort: SortType, keyword = '', group_no = '') => {
  return myAxios.get<PaginationInterface<WmProductEntity>>(
    encodeURI(`${domain}?page=${page}&category=${category}&sort=${sort}&keyword=${keyword}&group_no=${group_no}`),
  );
};

//상품 추천 검색어
export const fetchRecommendSearchKeyword = (category: ProductCategoryValue) => {
  return myAxios.get<string[]>(encodeURI(`${domain}/recommend/keyword?category=${category}`));
};

type ParamsType = {
  category?: any;
  keyword?: any;
  contentsCategory?: any;
  sort?: any;
  page?: any;
  tag?: any;
};

export const useProductData = ({ category, keyword, contentsCategory, sort, page = 1, tag }: ParamsType) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://58.229.150.199:6900/api/v1/product/mainList/?category=${encodeURI(category)}&keyword=${encodeURI(
          keyword,
        )}&contentsCategory=${encodeURI(contentsCategory)}&sort=${encodeURI(sort)}&page=${page}&tag=${encodeURIComponent(tag?.toString())}`
      : `product/mainList/?category=${encodeURI(category)}&keyword=${encodeURI(keyword)}&contentsCategory=${encodeURI(
          contentsCategory,
        )}&sort=${encodeURI(sort)}&page=${page}&tag=${encodeURI(tag?.toString())}`;
  const fetcherApi = async () => {
    const data = await fetcher<any>(url);
    return data;
  };
  const { data, isValidating, error } = useSWR(url, fetcherApi);
  return { list: data?.items, meta: data?.meta, isValidating, error };
};
