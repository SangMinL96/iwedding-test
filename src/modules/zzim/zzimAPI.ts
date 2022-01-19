import { useBbsPageState } from '@feature/Ibrandplus/hooks/useBbsPageState';
import { ZzimListType } from '@feature/zzim/zzim.interface';
import { fetcher } from '@utils/fetcher';
import myAxios from '@utils/MyAxios';
import { useEffect } from 'react';
import useSWR from 'swr';
import shallow from 'zustand/shallow';

type PropsType = {
  type: string;
  device: string;
  sort: string;
};
export const useGetZzimList = ({ type, device, sort }: PropsType) => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim?type=${type}&device=${device}&sort=${sort}`;

  const fetcherApi = async paramUrl => {
    const data = await fetcher<any>(paramUrl);
    return data;
  };
  const { data, isValidating, error, mutate } = useSWR(url, type ? fetcherApi : null);

  return { data, isValidating, mutate, error };
};

export const useGetZzimAllCount = () => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_HOST}/api/v1/zzim/allCount`;

  const fetcherApi = async paramUrl => {
    const data = await fetcher<any>(paramUrl);
    return data;
  };
  const { data, isValidating, error, mutate } = useSWR(url, fetcherApi);

  return { data, isValidating, mutate, error };
};
export const onZzimDelApi = async (zzim_id: number) => {
  return myAxios.delete('/zzim/cancel/' + zzim_id);
};
export const onZzimDelAllApi = async (type: ZzimListType) => {
  return myAxios.delete('/zzim/cancel_all?type=' + type);
};
