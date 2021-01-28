import ModuleService from "@api/module";
import Module from "@entities/module/module";

export default class ModuleInterator {
  getDetailModule: (moduleId) => any;
  getListModuleByCategory: (categoryId) => any;
  getListModuleAll: () => any;
  addModule: (module: Module) => any;
  editModule: (module: Module) => any;
  removeModule: (moduleId) => any;

  constructor() {
    const service = new ModuleService();

    this.getListModuleByCategory = async (categoryId: string) => {
      return await service.getListModuleByCategory(categoryId).then((res) => {
        let listModule = [];
        res?.data?.data?.forEach((item) => {
          if (item.bookingModules) {
            item.bookingModules.forEach((item) => {
              listModule.push(new Module(item));
            });
          }
        });
        return {
          listModuleTitle: res?.data?.data,
          listModule: listModule,
        };
      });
    };

    this.getListModuleAll = async () => {
      return await service.getListModuleAll().then((res) => {
        let listModule = [];
        res?.data?.data?.forEach((item) => {
          if (item.bookingModules) {
            item.bookingModules.forEach((item) => {
              listModule.push(new Module(item));
            });
          }
        });
        return {
          listModuleTitle: res?.data?.data,
          listModule: listModule,
        };
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

    this.removeModule = service.removeModule;
  }
}
