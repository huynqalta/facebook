import GroupService from "@api/group";
import PaginationInfo from "@entities/paginationInfo";

export default class GroupInteractor extends GroupService {
  constructor() {
    super();
    const service = new GroupService();

    this.getListGroup = async (pagination, search) => {
      return await service.getListGroup(pagination, search).then((res) => {
        const { pagedData, pageInfo } = res?.data.data;
        return {
          data: pagedData,
          info: new PaginationInfo({
            current: pageInfo.currentPage,
            pageSize: pageInfo.pageSize,
            total: pageInfo.totalCount,
          }),
          options: {
            search: search
          }
        };
      });
    };
    this.addGroup = service.addGroup;
    this.editGroup = service.editGroup;
    this.deleteGroup = service.deleteGroup;
    this.importEmployee = service.importEmployee;
  }
}
