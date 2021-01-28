class ModuleTranslate {
  languageCode: string = "";
  languageName: string = "";
  moduleTranslateId: string = "";
  moduleTranslateTitle: string = "";
  bookingModuleId: string = "";
  moduleLanguageDisplay: "hidden" | "show" = "show";

  constructor(moduleTranslate?) {
    if (!moduleTranslate) return;
    Object.keys(this).forEach((key) => {
      if (moduleTranslate[key]) {
        this[key] = moduleTranslate[key];
      }
      if (key == "moduleLanguageDisplay") {
        this[key] = this.convertModuleLanguageDisplay(
          moduleTranslate[key],
          "entities"
        );
      }
    });
  }

  createListModuleTranslate(listModuleTranslate) {
    if (!Array.isArray(listModuleTranslate)) return [];

    return listModuleTranslate.map((moduleTranslate) => {
      return new ModuleTranslate(moduleTranslate);
    });
  }

  convertModuleLanguageDisplay(value, type?: "entities"): any {
    if (type == "entities") {
      switch (value) {
        case 0:
          return "hidden";
        default:
          return "show";
      }
    } else {
      switch (value) {
        case "hidden":
          return 0;
        default:
          return 1;
      }
    }
  }
}

export default ModuleTranslate;
