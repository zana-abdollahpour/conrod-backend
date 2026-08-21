import { IPaginationMeta } from 'querying/interfaces/pagination-meta.interface';

export class PaginationMeta implements IPaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
