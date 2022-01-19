import useSWR from 'swr';
export function useSwrLocal<T>(key: string, paramData?: T | undefined) {
  const { data, mutate } = paramData
    ? useSWR(key, () => paramData, { shouldRetryOnError: false })
    : useSWR(key, null, { shouldRetryOnError: false });

  const mutation = (mutateData: T | undefined) => {
    return mutate(mutateData, false);
  };

  return { data, mutation } as { data: T; mutation: (paramData?: T) => Promise<T> };
}
