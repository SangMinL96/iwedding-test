import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import myAxios from '@utils/MyAxios';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'revalidate' | 'error' | 'mutate'> {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'initialData'> {
  initialData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  key: string | null,
  request?: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    revalidate,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    key,
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    request ? () => myAxios(request!) : null,
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request!,
        headers: {},
        data: initialData,
      },
    },
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}
