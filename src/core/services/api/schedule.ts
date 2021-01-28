
import Schedule from "@entities/schedule";
import apiService from "../apiService"
export default class ScheduleService {

    getListSchedule: (pagination, scheduleType, search?, query?) => any;
    addSchedule: (schedule: Schedule) => any;
    editSchedule: (scheduleValue: Schedule, scheduleId: Schedule) => any;
    removeSchedule: (scheduleId: Schedule) => any;
    constructor() {
        this.getListSchedule = async (scheduleType, pagination, search?, query?) => {
            const path = `api/Cms/Schedules/byScheduleType?ScheduleType=${ scheduleType }&PageSize=${ pagination.pageSize }&PageNumber=${ pagination.current }&OrderByQuery=${ query || " " }&SearchContent=${ search || " " }`
            return await apiService.executeApi({
                showSuccess: false,
                showError: false,
                path,
            })
        }

        this.addSchedule = async (schedule) => {
            return await apiService.executeApi({
                path: `api/Cms/Schedules`,
                method: "post",
                payload: schedule,
            })
        }

        this.editSchedule = async (scheduleValue, scheduleId) => {
            return await apiService.executeApi({
                path: `api/Cms/Schedules/${ scheduleId }`,
                payload: scheduleValue,
                method: "put"
            })
        }

        this.removeSchedule = async (scheduleId) => {
            return await apiService.executeApi({
                path: `api/Cms/Schedules/${ scheduleId }`,
                method: "delete"
            })
        }
    }
}