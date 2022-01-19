import { PaginationMeta } from '@modules/CommonInterface';

export const parseMetadata = (metadata: PaginationMeta) => {
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(metadata?.totalItems / ITEMS_PER_PAGE);

  return {
    ...metadata,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages,
  };
};
