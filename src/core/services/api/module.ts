import Module from "@entities/module/module";
import apiService from "../apiService";

export default class ModuleService {
  getDetailModule: (moduleId) => any;
  getListModuleByCategory: (categoryId) => any;
  getListModuleAll: () => Promise<any>;
  addModule: (module) => any;
  editModule: (module) => any;
  removeModule: (moduleId) => any;

  constructor() {
    this.getListModuleByCategory = async (categoryId) => {
      return await apiService.executeApi({
        path: `api/BookingModule/showAllModuleTitleAndModuleGroupByModuleType/${ categoryId }`,
        showSuccess: false,
        showError: false,
      });
    };

    this.getListModuleAll = async () => {
      return await apiService.executeApi({
        path: `/api/bookingModule/showAllModule`,
        showSuccess: false,
        showError: false,
      });
    };

    this.getDetailModule = async (moduleId) => {
      return await apiService.executeApi({
        path: `api/BookingModule/showDetail/${ moduleId }`,
        showSuccess: false,
        showError: false,
      });
    };

    this.addModule = async (module) => {
      return await apiService.executeApi({
        path: `api/bookingModule/stored`,
        method: "post",
        payload: module,
      });
    };

    this.editModule = async (module) => {
      return await apiService.executeApi({
        path: `api/BookingModule/editbookingmodule/${ module.moduleId }`,
        method: "put",
        payload: module,
      });
    };

    this.removeModule = async (moduleId) => {
      return await apiService.executeApi({
        path: `api/BookingModule/DeleteBookingModule/${ moduleId }`,
        method: "delete",
      });
    };
  }
}
