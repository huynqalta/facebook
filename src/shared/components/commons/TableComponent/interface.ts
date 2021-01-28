export interface IBEPaginationTable {
  apiServices: Function;
  columns: Array<any>;
  defaultOption?: any;
  register?: any;
}

export interface IOption {
  search?: string;
  filter?: Object;
  sorter?: {
    sortField: string;
    sortOrder: string;
  };
}

export const InitOption: IOption = {
  search: "",
  filter: {},
  sorter: {
    sortField: "",
    sortOrder: "",
  },
};

export interface IPagination {
  pageSize?: number;
  total?: number;
  current?: number;
}

export const InitPagination: IPagination = {
  pageSize: 10,
  total: 0,
  current: 1,
};
