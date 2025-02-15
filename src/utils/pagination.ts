import { PaginateResult } from 'mongoose';

export type PageOptions = {
  page?: number;
  limit?: number;
};

export const getPaginationOptions = (options: PageOptions) => {
  const page = options.page || 1;
  const limit = options.limit || 10;

  return { page, limit };
};

export const paginate = <T>(mongoosePaginateResult: PaginateResult<T>) => {
  return {
    items: mongoosePaginateResult.docs,
    count: mongoosePaginateResult.total,
    page: mongoosePaginateResult.page,
    total: mongoosePaginateResult.totalPages,
    hasPrevPage: mongoosePaginateResult.hasPrevPage,
    hasNextPage: mongoosePaginateResult.hasNextPage,
  };
};

export type PaginationResponseDto<T> = ReturnType<typeof paginate<T>>;
