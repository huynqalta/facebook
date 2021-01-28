import KeyLanguage from "@entities/language/key";
import Language from "@entities/language/language";
import Page, { AddModuleToPageBE, PageModuleDisplayFE } from "@entities/page";
import PaginationInfo from "@entities/paginationInfo";
import apiService from "../apiService";

export default class PageService {
  getListPage: (request) => Promise<any>;
  getListModulePage: (pageCode: string) => Promise<any>;
  changeDisplayService: (
    moduleId: string,
    data: Array<PageModuleDisplayFE>
  ) => Promise<any>;
  addModuleToPage: (data: Array<AddModuleToPageBE>) => Promise<any>;
  deleteModulePageService: (pageModuleId: string) => Promise<any>;
  changeOrderModulePageService: (data: Array<Page>) => Promise<any>;
  //   edit: (category) => any;
  //   getDetail: (categoryId) => any;

  constructor() {
    this.getListPage = async (request) => {
      const path = `/api/page/showAll`;
      return await apiService.executeApi({
        payload: {
          ...request,
        },
        path,
        showSuccess: false,
        showError: false,
        method: "post",
      });
    };
    this.getListModulePage = async (pageCode: string) => {
      const path = `/api/pagemodule/pageGroup/${ pageCode }`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.changeDisplayService = async (moduleId, data) => {
      const path = `/api/BookingModule/editModuleLanguage/${ moduleId }`;
      return await apiService.executeApi({
        path,
        payload: data,
        method: "post",
      });
    };
    this.addModuleToPage = async (data) => {
      const path = `/api/pageModule`;
      return await apiService.executeApi({
        path,
        payload: data,
        method: "post",
      });
    };
    this.deleteModulePageService = async (pageModuleId) => {
      const path = `/api/pagemodule/${ pageModuleId }`;
      return await apiService.executeApi({
        path,
        method: "delete",
      });
    };
    this.changeOrderModulePageService = async (data) => {
      const path = `/api/pageModule`;
      return await apiService.executeApi({
        path,
        payload: data,
        method: "put",
      });
    };
  }
}
