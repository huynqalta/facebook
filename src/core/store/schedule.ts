import { atom } from "recoil";

export interface SchedulePagination {
  data: Array<any>;
  info: {
    current: number;
    pageSize: number;
    total: number;
  };
  options: {
    search: string | number;
  };
}
export const SchedulePaginationStore = atom<SchedulePagination>({
  key: "PaginationSchedule",
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
