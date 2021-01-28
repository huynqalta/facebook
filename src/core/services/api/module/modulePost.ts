import Module from "@entities/module/module";
import apiService from "../../apiService";

export default class ModulePostService {
  getDetailModule: (moduleId) => any;
  getListModulePost: (moduleId) => Promise<any>;
  getListModulePostParent: (moduleId) => Promise<any>;
  addArticleToModule: (list) => Promise<any>;
  takeinArticle: (idArticle: string, idParent: string | null) => Promise<any>;
  takeoutArticle: (modulePostId: string) => Promise<any>;
  addModule: (module) => any;
  editModule: (module) => any;
  deleteModulePost: (modulePostId) => Promise<any>;

  constructor() {
    this.getListModulePost = async (moduleId) => {
      return await apiService.executeApi({
        path: `/api/ModuleMapPost/showAllModulKeyFE/${ moduleId }`,
        showSuccess: false,
        showError: false,
      });
    };

    this.getListModulePostParent = async (moduleId) => {
      return await apiService.executeApi({
        path: `/api/ModuleMapPost/showAllParent/${ moduleId }`,
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

    this.addArticleToModule = async (data) => {
      return await apiService.executeApi({
        path: `/api/ModuleMapPost`,
        method: "post",
        payload: data,
      });
    };

    this.takeinArticle = async (idArticle: string, parentId: string | null) => {
      return await apiService.executeApi({
        path: `/api/moduleMapPost/updateParentIdToNull/${ idArticle }`,
        method: "post",
        payload: {
          parentId,
        },
      });
    };

    this.takeoutArticle = async (idArticle: string) => {
      return await apiService.executeApi({
        path: `/api/moduleMapPost/updateParentIdToNull/${ idArticle }`,
        method: "post",
        payload: {
          parentId: null,
        },
      });
    };

    this.deleteModulePost = async (modulePostId: string) => {
      return await apiService.executeApi({
        path: `/api/moduleMapPost/deleteModulePost/${ modulePostId }`,
        method: "delete",
      });
    };
  }
}
