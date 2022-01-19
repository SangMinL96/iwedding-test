export const setStore = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStore = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setRecentSearch = (text: string) => {
  if (global.window) {
    const getList = JSON.parse(localStorage.getItem('recentSearchData'));
    if (getList) {
      const isData = getList?.includes(text);
      if (isData) return;
      return localStorage.setItem('recentSearchData', JSON.stringify(getList.concat(text)));
    }
    if (!getList) {
      return localStorage.setItem('recentSearchData', JSON.stringify([text]));
    }
  }
};

export const getRecentSearch = () => {
  if (global.window) {
    return JSON.parse(localStorage.getItem('recentSearchData'));
  }
};

export const removeRecentSearch = (value: string) => {
  if (global.window) {
    const getList = JSON.parse(localStorage.getItem('recentSearchData'));
    const removeList = getList.filter(item => item !== value);
    return localStorage.setItem('recentSearchData', JSON.stringify(removeList));
  }
};
