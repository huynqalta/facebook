import PaginationInfo from "@entities/paginationInfo";
import Tag from "@entities/tag/tag";
import apiService from "./../../apiService";

export default class TagSerVice {
  getListTag: (pagination: PaginationInfo, search: string) => any;
  getListTagAll: () => Promise<any>;
  getListTagEmployeeFace: (request) => any;
  addTag: (tag) => any;
  deleteTag: (id: string) => any;
  editTag: (tag) => any;
  constructor() {
    this.getListTag = async (
      pagination = { pageSize: 10, current: 1, total: 0 },
      search = ""
    ) => {
      const path = `/api/Tag?PageSize=${pagination.pageSize}&PageNumber=${pagination.current}&OrderByQuery=&SearchContent=${search}`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.getListTagAll = async () => {
      const path = `/api/Tag`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.getListTagEmployeeFace = async (request) => {
      const path = `/api/Users/GetUserTagMode`;
      return await apiService.executeApi({
        path,
        payload: {
          params: request,
        },
        showSuccess: false,
        showError: false,
      });
    };
    this.addTag = async (tag) => {
      return await apiService.executeApi({
        path: `api/Tag`,
        method: "post",
        payload: tag,
      });
    };
    this.deleteTag = async (id) => {
      return await apiService.executeApi({
        path: `api/Tag/${id}`,
        method: "delete",
      });
    };
    this.editTag = async (tag) => {
      return await apiService.executeApi({
        path: `api/Tag/${tag.tagId}`,
        method: "put",
        payload: tag,
      });
    };
  }
}
