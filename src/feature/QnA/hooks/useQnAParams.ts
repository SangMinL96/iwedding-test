import { GetTalkTypeProps } from '@modules/mypage/QnA/QnAInterface';
import useSWR from 'swr';

/**
 * !Deprecated
 */
const QNA_PARAMS = 'QNA_PARAMS';
export const useQnAParams = () => {
  const { data, mutate } = useSWR<Omit<GetTalkTypeProps, 'device'>>(QNA_PARAMS, null);

  return { params: data || {}, setParams: (param: Partial<GetTalkTypeProps>) => mutate({ ...data, ...param }, false) };
};
