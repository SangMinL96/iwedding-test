import useSWR from 'swr';

export const useModalVisible = (key: string) => {
  const { data, mutate } = useSWR<boolean>(key, null);

  return { modalVisible: data ?? false, setModalVisible: (state: boolean) => mutate(state, false) };
};
