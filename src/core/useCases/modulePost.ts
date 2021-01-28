import ModulePostService from "@api/module/modulePost";
import Module from "@entities/module/module";
import ModulePost, {
  ArticleModuleBE,
  ArticleModuleFE,
} from "@entities/module/modulePost";

export default class ModulePostInterator {
  getDetailModule: (moduleId) => any;
  getListModulePostInteractor: (moduleId: string) => any;
  getListModulePostParentInteractor: (moduleId: string) => any;
  addArticleToModuleInteractor: (
    data: ArticleModuleFE,
    moduleId: string,
    articleTakein: string | null
  ) => any;
  removeArticleToModuleInteractor: (modulePostId: string) => any;
  addModule: (module: Module) => any;
  editModule: (module: Module) => any;
  deleteModulePostInteractor: (modulePostId) => any;

  constructor() {
    const service = new ModulePostService();

    this.getListModulePostInteractor = async (moduleId: string) => {
      return await service.getListModulePost(moduleId).then((res) => {
        return new ModulePost({}).createListModulePost(res?.data?.data);
      });
    };

    this.getListModulePostParentInteractor = async (moduleId: string) => {
      return await service.getListModulePostParent(moduleId).then((res) => {
        return new ModulePost({}).createListModulePost(res?.data?.data);
      });
    };

    this.addArticleToModuleInteractor = async (
      data: ArticleModuleFE,
      moduleId: string,
      articleTakein: string
    ) => {
      if (articleTakein) {
        return await service
          .takeinArticle(articleTakein, data.parentId)
          .then((res) => {
            return new ModulePost(res?.data?.data);
          });
      }
      const request: Array<ArticleModuleBE> = data.listArticles.map(
        (item: string) => ({
          moduleId,
          postLanguageID: item,
          parentId: data.parentId || "",
        })
      );
      return await service.addArticleToModule(request).then((res) => {
        return new ModulePost({}).createListModulePost(res?.data?.data);
      });
    };

    this.removeArticleToModuleInteractor = async (modulePostId: string) => {
      return await service.takeoutArticle(modulePostId).then((res) => {
        return new ModulePost(res?.data?.data);
      });
    };

    this.getDetailModule = async (moduleId: string) => {
      return await service.getDetailModule(moduleId).then((res) => {
        const { data } = res?.data;

        return new Module({
          ...data,
          availableLanguage: data.moduleLanguages.map(
            (item) => item.languageCode
          ),
          moduleTitleCode: data.moduleTitle.moduleTitleCode,
        }).addModuleTranslate(data.moduleTranslates);
      });
    };

    this.addModule = async (module: Module) => {
      return await service.addModule({
        ModuleName: module.moduleName,
        languageCodes: module.availableLanguage,
        moduleSize: module.convertModuleSize(module.moduleSize),
        moduleTitleCode: module.moduleTitleCode,
        moduleTranslates: module.moduleTranslates.map((item) => ({
          LanguageCode: item.languageCode,
          ModuleTranslateTitle: item.moduleTranslateTitle,
        })),
      });
    };

    this.editModule = async (module: Module) => {
      return await service.editModule({
        moduleId: module.moduleId,
        moduleName: module.moduleName,
        languageCodes: module.availableLanguage,
        moduleSize: module.convertModuleSize(module.moduleSize),
        moduleTitleCode: module.moduleTitleCode,
        moduleTranslates: module.moduleTranslates.map((item) => ({
          LanguageCode: item.languageCode,
          ModuleTranslateTitle: item.moduleTranslateTitle,
        })),
      });
    };

    this.editModule = async (module: Module) => {
      return await service.editModule({
        moduleId: module.moduleId,
        moduleName: module.moduleName,
        languageCodes: module.availableLanguage,
        moduleSize: module.convertModuleSize(module.moduleSize),
        moduleTitleCode: module.moduleTitleCode,
        moduleTranslates: module.moduleTranslates.map((item) => ({
          LanguageCode: item.languageCode,
          ModuleTranslateTitle: item.moduleTranslateTitle,
        })),
      });
    };

    this.deleteModulePostInteractor = async (modulePostId: string) => {
      return await service.deleteModulePost(modulePostId).then((res) => {
        return new ModulePost(res?.data?.data);
      });
    };
  }
}
