export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
