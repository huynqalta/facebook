import KeyLanguage from "@entities/language/key";
import Language from "@entities/language/language";
import PaginationInfo from "@entities/paginationInfo";
import apiService from "../../apiService";

export default class KeyLanguageService {
  getListKeyService: (request) => Promise<any>;
  changeOrderService: (listLanguage: Array<Language>) => Promise<any>;
  addKeyLanguageService: (keyLanguage: KeyLanguage) => Promise<any>;
  editKeyLanguageService: (
    keyLanguage: {
      keyCode: string;
      keyDescription: string;
    },
    keyCode: string | null
  ) => Promise<any>;
  editKeyTranslatesKeyLanguageService: (
    translateKey: Array<{
      languageCode: string;
      translateKeyCode: string;
    }>,
    keyCode: string
  ) => Promise<any>;
  deleteKeyLanguageService: (keyCode: string) => Promise<any>;
  importKeyLanguageService: (listKeyLanguage) => Promise<any>;
  exportKeyLanguageService: () => Promise<any>;
  //   edit: (category) => any;
  //   getDetail: (categoryId) => any;

  constructor() {
    this.getListKeyService = async (request) => {
      const path = `/api/key/showAll`;
      return await apiService.executeApi({
        payload: {
          ...request,
        },
        path,
        method: "post",
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
    this.addKeyLanguageService = async (keyLanguage: KeyLanguage) => {
      const path = `/api/key/store`;
      return await apiService.executeApi({
        path,
        payload: keyLanguage,
        method: "post",
      });
    };
    this.editKeyLanguageService = async (keyLanguage, keyCode: string) => {
      const path = `/api/key/update/${ keyCode }`;
      return await apiService.executeApi({
        path,
        payload: keyLanguage,
        method: "put",
      });
    };
    this.editKeyTranslatesKeyLanguageService = async (
      translatesKeyLanguage,
      keyCode: string
    ) => {
      const path = `/api/translateKey/updateMany/${ keyCode }`;
      return await apiService.executeApi({
        path,
        payload: translatesKeyLanguage,
        method: "put",
      });
    };
    this.deleteKeyLanguageService = async (keyCode) => {
      const path = `/api/key/delete/${ keyCode }`;
      return await apiService.executeApi({
        path,
        method: "delete",
      });
    };
    this.importKeyLanguageService = async (listKeyLanguage) => {
      const path = `/api/translateKey/import`;
      return await apiService.executeApi({
        path,
        payload: listKeyLanguage,
        method: "post",
      });
    };
    this.exportKeyLanguageService = async () => {
      const path = `/api/key/export`;
      return await apiService.executeApi({
        path,
        method: "get",
      });
    };
  }
}
