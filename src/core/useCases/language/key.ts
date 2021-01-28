import KeyLanguageService from "@api/language/key";
import KeyLanguage from "@entities/language/key";
import Language from "@entities/language/language";
import PaginationInfo from "@entities/paginationInfo";

class KeyLanguageInteractor {
  getListKeyInteractor: (
    pagination: PaginationInfo,
    search?: string,
    sorter?
  ) => any;
  changeOrderLanguageInteractor: (listLanguage: Array<Language>) => void;
  languageInteractor: (
    keyLanguage: KeyLanguage,
    idLanguage: string | null
  ) => void;
  deleteKeyLanguageInteractor: (keyCode: string) => void;
  importKeyLanguageInteractor: (listKeyLanguage) => void;
  exportKeyLanguageInteractor: () => void;

  constructor() {
    const service = new KeyLanguageService();
    Object.keys(service).forEach((key) => {
      this[ key ] = service[ key ];
    });
    this.getListKeyInteractor = async (pagination, search, sorter) => {
      let request = {
        limit: pagination.pageSize,
        total: pagination.total,
        page: pagination.current,
        sortOrder: sorter.sortOrder || "",
        sortField: sorter.sortField || "",
        search: search || "",
      };
      return await service.getListKeyService(request).then((res) => {
        const pagination: PaginationInfo = {
          pageSize: res?.data?.data?.info.limit,
          total: res?.data?.data?.info.totalRecord,
          current: res?.data?.data?.info.page,
        };
        return {
          data: new KeyLanguage({}).createListKeyLanguage(
            res?.data?.data?.data
          ),
          info: new PaginationInfo(pagination),
        };
      });
    };
    this.changeOrderLanguageInteractor = async (listLanguage) => {
      return await service.changeOrderService(listLanguage).then((res) => {
        return new Language({}).createListLanguage(res?.data?.data);
      });
    };
    this.languageInteractor = async (
      keyLanguage: KeyLanguage,
      keyCode: string
    ) => {
      if (keyCode) {
        const dataKeyCode = {
          keyCode: keyLanguage.keyCode,
          keyDescription: keyLanguage.keyDescription,
        };
        return await service
          .editKeyLanguageService(dataKeyCode, keyCode)
          .then(async () => {
            return await service
              .editKeyTranslatesKeyLanguageService(
                keyLanguage.translateKeys,
                keyCode
              )
              .then((res) => {
                return res?.data?.data;
              });
          });
      }
      return await service.addKeyLanguageService(keyLanguage).then((res) => {
        return new KeyLanguage(res?.data?.data);
      });
    };
    this.deleteKeyLanguageInteractor = async (keyCode: string) => {
      return await service.deleteKeyLanguageService(keyCode).then((res) => {
        return new KeyLanguage(res?.data?.data);
      });
    };
    this.importKeyLanguageInteractor = async (listKey) => {
      return await service.importKeyLanguageService(listKey).then((res) => {
        return res?.data?.data;
        //   return new KeyLanguage(res?.data?.data);
      });
    };
    this.exportKeyLanguageInteractor = async () => {
      return await service.exportKeyLanguageService().then((res) => {
        return res?.data?.data;
      });
    };
  }
}

export default KeyLanguageInteractor;
