import EmployeeEntities from "@entities/employee";
import apiService from "../../apiService";

export interface IRequestDeleteTag {
  userId: string;
  tagId: string;
  modeId: string;
}

export default class EmployeeService {
  getListEmployee: (request) => Promise<any>;
  addEmployee: (request) => Promise<any>;
  editEmployee: (request, userId) => Promise<any>;
  deleteEmployee: (employeeId: string) => Promise<any>;
  registerFaceEmployee: (formData, userId: string) => Promise<any>;
  profileEmployee: (employeeId: string) => Promise<any>;
  profileFileEmployee: (employeeId: string) => Promise<any>;
  deleteTagEmployee: (request: IRequestDeleteTag) => Promise<any>;
  getListEmployeeWithGroup: (request, id) => Promise<any>;
  getListEmployeeWithTag: (request, id) => Promise<any>;
  getDetailGroup: (id) => Promise<any>;
  getDetailTag: (id) => Promise<any>;
  getImageAuthenFace: (userId) => Promise<any>;
  deleteEmployeeImage: (employeeId, imageId) => Promise<any>;
  constructor() {
    this.getListEmployee = async (request) => {
      const path = `/api/Users?PageSize=${request.limit}&PageNumber=${request.page}&SearchContent=${request.search}`;
      return await apiService.executeApi({
        path,
        // payload: {
        //   ...request,
        // },
        showSuccess: false,
        showError: false,
      });
    };
    this.getListEmployeeWithGroup = async (request, id) => {
      const path = `/api/Users/ByGroup/${id}?PageSize=${request.limit}&PageNumber=${request.page}&SearchContent=${request.search}`;
      return await apiService.executeApi({
        path,
        // payload: {
        //   ...request,
        // },
        showSuccess: false,
        showError: false,
      });
    };
    this.getListEmployeeWithTag = async (request, id) => {
      const path = `api/Users/ShowByTag?TagId=${id}&PageSize=${request.limit}&PageNumber=${request.page}&SearchContent=${request.search}`;
      return await apiService.executeApi({
        path,
        // payload: {
        //   ...request,
        // },
        showSuccess: false,
        showError: false,
      });
    };
    this.getDetailGroup = async (id) => {
      const path = `/api/Group/${id}`;
      return await apiService.executeApi({
        path,
        method: "get",
        showSuccess: false,
        showError: false,
      });
    };
    this.getDetailTag = async (id) => {
      const path = `/api/Tag/${id}`;
      return await apiService.executeApi({
        path,
        method: "get",
        showSuccess: false,
        showError: false,
      });
    };
    this.addEmployee = async (request: EmployeeEntities) => {
      const path = `/api/Users/v2`;
      return await apiService.executeApi({
        path,
        method: "post",
        payload: request,
        showSuccess: true,
        showError: true,
      });
    };
    this.editEmployee = async (request: EmployeeEntities, userId) => {
      const path = `/api/Users/v2/${userId}`;
      return await apiService.executeApi({
        path,
        method: "put",
        payload: request,
        showSuccess: true,
        showError: true,
      });
    };
    this.deleteEmployee = async (employeeId: string) => {
      const path = `/api/Users/${employeeId}`;
      return await apiService.executeApi({
        path,
        method: "delete",
        showSuccess: true,
        showError: true,
      });
    };
    this.deleteEmployeeImage = async (employeeId: string, imageId: string) => {
      const path = `/api/Users/FaceImage/${employeeId}/${imageId}`;
      return await apiService.executeApi({
        path,
        method: "delete",
        showSuccess: true,
        showError: true,
      });
    };
    this.registerFaceEmployee = async (formData, userId) => {
      const path = `/api/Users/registerFaceEmployee/${userId}`;
      return await apiService.executeApi({
        path,
        payload: formData,
        method: "post",
        showSuccess: true,
        showError: true,
        config: {
          isFormData: true,
        },
      });
    };
    this.getImageAuthenFace = async (userId) => {
      const path = `/api/Users/GetFileId/${userId}`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.profileEmployee = async (employeeId: string) => {
      const path = `/api/Users/${employeeId}`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: true,
      });
    };
    this.profileFileEmployee = async (employeeId: string) => {
      const path = `/api/Users/GetFileId/${employeeId}`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: true,
      });
    };
    this.deleteTagEmployee = async (request) => {
      const path = `/api/Users/DeleteTagMode`;
      return await apiService.executeApi({
        path,
        method: "post",
        payload: request,
        showSuccess: true,
        showError: true,
      });
    };
  }
}
