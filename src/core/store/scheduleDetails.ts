import { atom } from 'recoil'

export interface ScheduleDetailsPagination {
    data: Array<any>,
    info: {
        current: number,
        pageSize: number,
        total: number,
    }
}
export const ScheduleDetailsPaginationStore = atom<ScheduleDetailsPagination>({
    key: "PaginationScheduleDetails",
    default: {
        data: [],
        info: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    }
})