import apiService from "src/services/apiService"
import { IPagination } from "../Pagination/interface"

export const getListUsers = async (pagination: IPagination, search?, filter?) => {
    const body = {
        limit: pagination.pageSize,
        page: pagination.current,
        totalRecord: pagination.total,
        search,
        ...filter
    }

    const res = await apiService.post('/api/user/showTable', body)

    return {
        data: res?.data?.data,
        info: {
            pageSize: pagination.pageSize,
            current: res?.data?.info?.page,
            total: res?.data?.info?.totalRecord,
        }
    }
}