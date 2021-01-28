import ScheduleService from "@api/schedule";
import PaginationInfo from "@entities/paginationInfo";
import Schedule from "@entities/schedule";

class ScheduleInteractor {
  addSchedule: (schedule: Schedule) => any;
  getListSchedule: (pagination, scheduleType, search?, query?) => any;
  removeSchedule: (scheduleId: Schedule) => any;
  editSchedule: (scheduleValue: Schedule, scheduleId: Schedule) => any;
  constructor() {
    const service = new ScheduleService();

    this.addSchedule = service.addSchedule;
    this.getListSchedule = async (
      scheduleType,
      pagination,
      search?,
      query?
    ) => {
      const _scheduleType = new Schedule().convertScheduleType(scheduleType);

      return await service
        .getListSchedule(_scheduleType, pagination, search, query)
        .then((res) => {
          const { pagedData, pageInfo } = res?.data?.data;
          const newList = pagedData.map(item => ({ ...item, scheduleName: item.scheduleNameId }));
          return {
            data: new Schedule().createListSchedule(pagedData),
            info: new PaginationInfo({
              current: pageInfo.currentPage,
              pageSize: pageInfo.pageSize,
              total: pageInfo.totalCount,
            }),
            options: {
              search: search,
            },
          };
        });
    };
    this.editSchedule = service.editSchedule;
    this.removeSchedule = service.removeSchedule;
  }
}

export default ScheduleInteractor;
