import { atom } from "recoil";
export interface TicketPagination {
  data: Array<any>;
}
export const TicketStore = atom<TicketPagination>({
  key: "TicketStore",
  default: {
    data: []
  },
});
