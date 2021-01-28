import { atom } from "recoil"

export interface UserSystemPagination {
    data: Array<any>,
    info: {
        limit: number,
        page: number,
        totalRecord: number
    }
}
export const UserSystemPaginationStore = atom<UserSystemPagination>({
    key: "PaginationUserSystem",
    default: {
        data: [],
        info: {
            limit: 1,
            page: 10,
            totalRecord: 1
        }
    }
})