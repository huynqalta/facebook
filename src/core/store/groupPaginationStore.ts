import { atom } from "recoil";
export interface GroupType {
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
export const GroupPaginationStore = atom<GroupType>({
  key: "GroupPaginationStore",
  default: {
    data: [],
    info: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
    options: {
      search: "",
    },
  },
});
