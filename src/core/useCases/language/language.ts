import LanguageService from "@api/language/language";
import Language from "@entities/language/language";

class LanguageInteractor {
  getListLanguageInteractor: () => any;
  changeOrderLanguageInteractor: (listLanguage: Array<Language>) => void;
  languageInteractor: (language: Language, idLanguage: string | null) => void;
  deletelanguageInteractor: (idLanguage: string) => void;

  constructor() {
    const service = new LanguageService();
    Object.keys(service).forEach((key) => {
      this[key] = service[key];
    });
    this.getListLanguageInteractor = async () => {
      return await service.getListService().then((res) => {
        return new Language({}).createListLanguage(res?.data?.data);
      });
    };
    this.changeOrderLanguageInteractor = async (listLanguage) => {
      return await service.changeOrderService(listLanguage).then((res) => {
        return new Language({}).createListLanguage(res?.data?.data);
      });
    };
    this.languageInteractor = async (language, idLanguage) => {
      if (idLanguage) {
        return await service
          .editLanguageService(language, idLanguage)
          .then((res) => {
            return new Language(res?.data?.data);
          });
      }
      return await service.addLanguageService(language).then((res) => {
        return new Language(res?.data?.data);
      });
    };
    this.deletelanguageInteractor = async (idLanguage) => {
      return await service.deleteLanguageService(idLanguage).then((res) => {
        return new Language(res?.data?.data);
      });
    };
  }
}

export default LanguageInteractor;
