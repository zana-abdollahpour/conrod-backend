import { Injectable } from '@nestjs/common';
import { IPaginationMeta } from 'querying/interfaces/pagination-meta.interface';

@Injectable()
export class PaginationService {
  calculateOffset(limit: number, page: number) {
    return (page - 1) * limit;
  }

  createMeta(limit: number, page: number, count: number): IPaginationMeta {
    const totalPages = Math.ceil(count / limit);

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      itemsPerPage: limit,
      totalItems: count,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
