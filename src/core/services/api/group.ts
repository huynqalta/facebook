import PaginationInfo from "@entities/paginationInfo";
import apiService from "../apiService";

export default class GroupService {
  getListGroup: (pagination: PaginationInfo, search: string) => any;
  addGroup: (data) => any;
  editGroup: (data) => any;
  deleteGroup: (id: string) => any;
  importEmployee: (data) => any;
  constructor() {
    this.getListGroup = async (
      pagination = { pageSize: 10, current: 1, total: 0 },
      search = ""
    ) => {
      const path = `api/Group?PageSize=${pagination.pageSize}&PageNumber=${pagination.current}&SearchContent=${search}`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.addGroup = async (data) => {
      return await apiService.executeApi({
        path: `api/Group/`,
        method: "post",
        payload: data,
      });
    };
    this.editGroup = async (data) => {
      return await apiService.executeApi({
        path: `api/Group/${data.groupId}`,
        method: "put",
        payload: data,
      });
    };
    this.deleteGroup = async (id) => {
      return await apiService.executeApi({
        path: `api/Group/${id}`,
        method: "delete",
      });
    };
    this.importEmployee = async (data) => {
      return await apiService.executeApi({
        path: `api/Users/ImportEmployeesSync`,
        method: "post",
        payload: data,
        showSuccess: false,
        showError: true,
      });
    };
  }
}
