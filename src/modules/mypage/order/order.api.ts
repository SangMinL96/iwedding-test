import { WeddingOrder } from './order.interface';
import myAxios from '@utils/MyAxios';
import useRequest from '@hooks/useRequest';

export const getOrders = async () => {
  const { data } = await myAxios.get<WeddingOrder[]>('/order');
  return data;
};

export const getOrder = async (id: number) => {
  const { data } = await myAxios.get<WeddingOrder>('/order/' + id);
  return data;
};

export const cancelRequestingFreeOrder = async (order_no: number, goods_no: number) => {
  return myAxios.delete(`/order/${order_no}/free/requesting/${goods_no}`);
};

export const cancelRequesting = async (order_no: number, goods_no: number) => {
  return myAxios.delete(`/order/${order_no}/requesting/${goods_no}`);
};

export const useOrders = () => {
  return myAxios.get<WeddingOrder[]>('mypage/orders', { url: '/order/' });
};

export const useOrder = (no: number | string | undefined, free?: string) => {
  const key = no ? `order_detail_${no}_free=` + free : null;
  const url = free == 'true' ? `/order/free/${no}` : `/order/${no}`;
  return useRequest<WeddingOrder>(free != null ? key : null, {
    url,
  });
};
