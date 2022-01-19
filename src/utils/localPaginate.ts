export const localPaginate = (array, limit, page) => {
  console.log(page);
  return array?.slice((page - 1) * limit, page * limit);
};
