import { useSwrLocal } from '@hooks/useSwrLocal';
import { QnAProps } from '@modules/mypage/QnA/QnAInterface';

/**
 * !Deprecated
 */
const SELECTED_QnA = 'SELECTED_QnA';
export const useSelectedQnA = () => {
  const { data: selectedQnA, mutation } = useSwrLocal<QnAProps>(SELECTED_QnA, undefined);

  const setSelectedQnA = (select?: QnAProps) => mutation(select);
  return { selectedQnA, setSelectedQnA };
};
