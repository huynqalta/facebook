import ModuleTranslate from "./moduleTranslate";

class Module {
  moduleId: string = "";
  moduleName: string = "";
  moduleSize: "small" | "default" | "large" = "default";
  moduleTitleCode: string = "";
  moduleTypeCode: string = "";
  moduleTranslates: Array<{
    languageCode: string;
    languageName?: string;
    moduleTranslateId?: string;
    moduleTranslateTitle?: string;
  }> = [];
  availableLanguage: Array<string> = [];
  moduleCreatedAt: string = "";

  constructor(module?) {
    if (!module) return;
    Object.keys(this).forEach((key) => {
      switch (key) {
        case "moduleSize": {
          this[key] = this.convertModuleSize(module.moduleSize, "entities");
          break;
        }
        default:
          if (module[key]) {
            this[key] = module[key];
          }
          break;
      }
    });
  }

  createListModule(listModule) {
    if (!Array.isArray(listModule)) return [];
    return listModule.map((module) => {
      return new Module(module);
    });
  }

  addModuleTranslate(listModuleTranslate) {
    this.moduleTranslates = new ModuleTranslate().createListModuleTranslate(
      listModuleTranslate
    );
    return this;
  }

  convertModuleSize(value, type?: "entities"): any {
    if (type == "entities") {
      switch (value) {
        case 0:
          return "small";
        case 1:
          return "default";
        default:
          return "large";
      }
    } else {
      switch (value) {
        case "small":
          return 0;
        case "default":
          return 1;
        default:
          return 2;
      }
    }
  }
}

export default Module;
