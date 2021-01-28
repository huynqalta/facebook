import Language from "@entities/language/language";
import apiService from "../../apiService";

export default class LanguageService {
  getListService: () => Promise<any>;
  changeOrderService: (listLanguage: Array<Language>) => Promise<any>;
  addLanguageService: (language: Language) => Promise<any>;
  editLanguageService: (
    language: Language,
    idLanguage: string | null
  ) => Promise<any>;
  deleteLanguageService: (idLanguage: string) => Promise<any>;
  //   edit: (category) => any;
  //   getDetail: (categoryId) => any;

  constructor() {
    this.getListService = async () => {
      const path = `/api/language/getAll`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
    this.changeOrderService = async (listLanguage) => {
      const path = `/api/language/updateMany`;
      return await apiService.executeApi({
        path,
        payload: listLanguage,
        method: "put",
      });
    };
    this.addLanguageService = async (language) => {
      const path = `/api/language/store`;
      return await apiService.executeApi({
        path,
        payload: language,
        method: "post",
      });
    };
    this.editLanguageService = async (language, idLanguage) => {
      const path = `/api/language/update/${ idLanguage }`;
      return await apiService.executeApi({
        path,
        payload: language,
        method: "put",
      });
    };
    this.deleteLanguageService = async (idLanguage) => {
      const path = `/api/language/delete/${ idLanguage }`;
      return await apiService.executeApi({
        path,
        method: "delete",
      });
    };
    // this.getDetail = async (moduleId) => {
    //   const path = `/api/BookingModule/showDetail/${moduleId}`;
    //   return await apiService.executeApi({
    //     path,
    //     customRes: (res) => {
    //       return new Category(res);
    //     },
    //   });
    // };

    // this.edit = async (moduleTypeName) => {
    //   return await apiService.executeApi({
    //     path: "/api/BookingModule/EditModuleType/BuyService",
    //     payload: { moduleTypeName },
    //     method: "put",
    //   });
    // };
  }
}
