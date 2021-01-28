export interface PageModuleDisplayFE {
  LanguageCode: string;
  moduleLanguageDisplay: "show" | "hidden";
}
export interface PageModuleDisplayBE {
  LanguageCode: string;
  moduleLanguageDisplay: 0 | 1;
}
export interface AddModuleToPageBE {
  ModuleId: string;
  PageId: string;
}
class Page {
  pageCode: string = "";
  pageName: string = "";
  pageModuleTotal: number = 0;
  pageModuleId: string = "";
  pageModuleIndex: number = 0;

  constructor(page?) {
    Object.keys(this).forEach((key) => {
      this[key] = page[key] || this[key];
    });
  }

  createListPage(listPage) {
    if (!Array.isArray(listPage)) return [];
    return listPage.map((listPage) => {
      return new Page(listPage);
    });
  }
}

export default Page;
