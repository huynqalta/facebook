import ScheduleDetailsService from "@api/scheduleDetails";



class ScheduleDetailsInteractor {
    getListScheduleDetails: (scheduleID, pagination, search?, query?) => any;
    removeScheduleDetails: (scheduleDetailId) => any;
    constructor() {
        const service = new ScheduleDetailsService();
        this.getListScheduleDetails = service.getListScheduleDetails;
        this.removeScheduleDetails = service.removeScheduleDetails;
    }
}
export default ScheduleDetailsInteractor