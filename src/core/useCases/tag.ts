import TagSerVice from "@api/tag/tag";
import PaginationInfo from "@entities/paginationInfo";
import TagEntities from "@entities/tag/tag";
import Tag from "@entities/tag/tag";
export default class TagInteractor extends TagSerVice {
  getListTagAll: () => any;
  getListTagEmployee: (pagination, option) => any;
  constructor() {
    super();
    const service = new TagSerVice();

    this.getListTag = async (pagination, search) => {
      return await service.getListTag(pagination, search).then((res) => {
        const { pagedData, pageInfo } = res?.data?.data;
        const newTag = new TagEntities().createListTag(pagedData);
        return {
          data: newTag,
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

    this.getListTagAll = async () => {
      return await service.getListTagAll().then((res) => {
        const { pagedData } = res?.data?.data;
        return new Tag().createListTag(pagedData);
      });
    };

    this.getListTagEmployee = async (pagination, option) => {
      const request = {
        UserId: option.data.employeeId,
        ModeId: option.data.modeId,
        PageNumber: pagination.current,
        PageSize: pagination.pageSize,
        SearchContent: option.search || "",
      };
      return await service.getListTagEmployeeFace(request).then((res) => {
        const { pagedData, pageInfo } = res?.data?.data;
        return {
          data: new Tag().createListTag(pagedData),
          info: new PaginationInfo({
            current: pageInfo.currentPage,
            pageSize: pageInfo.pageSize,
            total: pageInfo.totalCount,
          }),
        };
      });
    };

    this.addTag = service.addTag;
    this.deleteTag = service.deleteTag;
    this.editTag = service.editTag;
  }
}
