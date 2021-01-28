import Schedule from "@entities/schedule"
import ScheduleInteractor from "@useCases/schedule"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { SchedulePaginationStore } from "../../../core/store/schedule"
interface IEditSchedule {
    edit: boolean;
    data?: any;
    type: "edit" | "add" | "";
    scheduleType?: any;
}
const useSchedule = () => {
    const setPaginationSchedule = useSetRecoilState(SchedulePaginationStore)
    const { getListSchedule, removeSchedule, addSchedule, editSchedule } = new ScheduleInteractor();
    const [ showEditSchedule, setShowEditSchedule ] = useState<IEditSchedule>({
        edit: false,
        data: {},
        type: "",
    })

    const getList = async (scheduleType, info, search = '') => {
        return await getListSchedule(scheduleType, info, search).then(res => {
            setPaginationSchedule(res);
        })
    }
    const add = async (sechedule, info) => {
        return await addSchedule(sechedule).then(async res => {
            return await getList(sechedule.scheduleType, info);
        })
    }
    const edit = async (scheduleValue, scheduleId, info) => {
        return await editSchedule(scheduleValue, scheduleId).then(async res => {
            return await getList(res.data.data.scheduleType, info);
        })
    }
    const remove = async (sechedule, info) => {
        return await removeSchedule(sechedule.scheduleId).then(async res => {
            return await getList(sechedule.scheduleType, info);
        })
    }
    return {
        getList,
        remove,
        add,
        showEditSchedule,
        setShowEditSchedule,
        edit,
    }
}
export default useSchedule