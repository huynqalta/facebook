export interface IPaginationInfo {
  pageSize: number;
  current: number;
  total: number;
}

export default class PaginationInfo implements IPaginationInfo {
  pageSize: number = 10;
  current: number = 1;
  total: number = 0;
  constructor(paginationInfo?) {
    Object.keys(this).forEach((key) => {
      if (paginationInfo[key]) {
        this[key] = paginationInfo[key];
      }
    });
  }
}
