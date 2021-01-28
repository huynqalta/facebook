class ScheduleDetails {
    keyCode: Array<string>
    scheduleDetailId: string = ""

    constructor(scheduleDetails?) {
        if (scheduleDetails) {
            Object.keys(this).forEach((key) => {
                switch (key) {
                    default:
                        this[ key ] = scheduleDetails[ key ];
                        break;
                }
            });
        }
    }

    createListScheduleDetails(listScheduleDetails) {
        if (!Array.isArray(listScheduleDetails)) return [];
        return listScheduleDetails.map(scheduleDetails => {
            return new ScheduleDetails(scheduleDetails);
        })
    }
}
export default ScheduleDetails;