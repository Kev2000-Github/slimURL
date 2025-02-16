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
  let count: number = 0;
  if (typeof mongoosePaginateResult.total === 'number') {
    count = mongoosePaginateResult.total;
  }

  return {
    items: mongoosePaginateResult.docs,
    count,
    page: mongoosePaginateResult.page,
    total: mongoosePaginateResult.totalPages,
    hasPrevPage: mongoosePaginateResult.hasPrevPage,
    hasNextPage: mongoosePaginateResult.hasNextPage,
  };
};

export type PaginationResponseDto<T> = ReturnType<typeof paginate<T>>;
