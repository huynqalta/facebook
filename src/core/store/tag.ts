import { atom } from "recoil";
export interface TagPagination {
  data: Array<any>;
  info: {
    current: number;
    pageSize: number;
    total: number;
  };
  options: {
    search: string ;
  };
}
export const TagPaginationStore = atom<TagPagination>({
  key: "TagPaginationStore",
  default: {
    data: [],
    info: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    options: {
      search: "",
    },
  },
});
