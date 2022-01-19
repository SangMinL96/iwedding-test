import useSWR from 'swr';

const LAST_COPIED_QUOTE = 'LAST_COPIED_QUOTE';
export const useCopiedQuote = () => {
  const { data, mutate } = useSWR<string>(LAST_COPIED_QUOTE, null);

  const setLastCopiedQuote = (quoteID: string) => mutate(quoteID, false);

  return { lastCopiedQuote: data, setLastCopiedQuote };
};
