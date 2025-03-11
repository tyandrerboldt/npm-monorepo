export class Pagination<T> {
  currentPage: number;
  perPage: number;
  total: number;
  items: T[];

  constructor(
    aCurrentPage: number,
    aPerPage: number,
    aTotal: number,
    aItems: T[]
  ) {
    this.currentPage = aCurrentPage;
    this.perPage = aPerPage;
    this.total = aTotal;
    this.items = aItems;
  }

  static from<T>(
    aCurrentPage: number,
    aPerPage: number,
    aTotal: number,
    aItems: T[]
  ) {
    return new Pagination(aCurrentPage, aPerPage, aTotal, aItems);
  }
}
