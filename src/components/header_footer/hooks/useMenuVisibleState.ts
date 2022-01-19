import useSWR from 'swr';

export const useMenuVisibleState = () => {
  const { data, mutate } = useSWR('PC_HEADER_MENU_VISIBILITY', null, {
    initialData: true,
  });

  return { menuVisible: data, setMenuVisible: (visible: boolean) => mutate(visible, false) };
};
