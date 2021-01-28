import KeyLanguageService from "@api/language/key";
import PageService from "@api/page";
import KeyLanguage from "@entities/language/key";
import Language from "@entities/language/language";
import Module from "@entities/module/module";
import ModuleTranslate from "@entities/module/moduleTranslate";
import Page, { AddModuleToPageBE } from "@entities/page";
import PaginationInfo from "@entities/paginationInfo";
import { PageModuleDisplayFE } from "@entities/page";

class PageInteractor {
  getListPageInteractor: (
    pagination: PaginationInfo,
    search?: string,
    sorter?
  ) => any;
  getListModulePageInteractor: (pageCode: string) => void;
  changeDisplayInteractor: (
    moduleId: string,
    data: Array<PageModuleDisplayFE>
  ) => void;
  addModuleToPageInteractor: (pageId: string, data: Array<string>) => void;
  deleteModulePageInteractor: (pageModuleId: string) => void;
  changeOrderModulePageInteractor: (data: Array<Page>) => void;

  constructor() {
    const service = new PageService();
    Object.keys(service).forEach((key) => {
      this[key] = service[key];
    });
    this.getListPageInteractor = async (pagination, search, sorter) => {
      let request = {
        limit: pagination.pageSize,
        total: pagination.total,
        page: pagination.current,
        sortOrder: sorter.sortOrder || "",
        sortField: sorter.sortField || "",
        search: search || "",
      };
      return await service.getListPage(request).then((res) => {
        const pagination: PaginationInfo = {
          pageSize: res?.data?.data?.info.limit,
          total: res?.data?.data?.info.totalRecord,
          current: res?.data?.data?.info.page,
        };
        return {
          data: new Page({}).createListPage(res?.data?.data?.data),
          info: new PaginationInfo(pagination),
        };
      });
    };
    this.getListModulePageInteractor = async (pageCode: string) => {
      return await service.getListModulePage(pageCode).then((res) => {
        const listPage = new Page({}).createListPage(res?.data?.data);
        return listPage.map((item: Page, index: number) => ({
          ...item,
          ...new Module(res?.data?.data[index]),
          moduleLanguages: new ModuleTranslate({}).createListModuleTranslate(
            res?.data?.data[index]?.moduleLanguages
          ),
        }));
      });
    };
    this.changeOrderModulePageInteractor = async (data) => {
      return await service.changeOrderModulePageService(data).then((res) => {
        return res?.data?.data;
      });
    };
    this.changeDisplayInteractor = async (moduleId, data) => {
      const newModuleTranslate = new ModuleTranslate({});
      const dataBE = data.map((item: PageModuleDisplayFE) => ({
        ...item,
        moduleLanguageDisplay: newModuleTranslate.convertModuleLanguageDisplay(
          item.moduleLanguageDisplay
        ),
      }));
      return await service
        .changeDisplayService(moduleId, dataBE)
        .then((res) => {
          return new ModuleTranslate({}).createListModuleTranslate(
            res?.data?.data
          );
        });
    };
    this.addModuleToPageInteractor = async (
      pageId: string,
      data: Array<string>
    ) => {
      const dataAddModuleToPageBE: Array<AddModuleToPageBE> = data.map(
        (item: string) => ({
          ModuleId: item,
          PageId: pageId,
        })
      );
      return await service
        .addModuleToPage(dataAddModuleToPageBE)
        .then((res) => {
          return new Page(res?.data?.data);
        });
    };
    this.deleteModulePageInteractor = async (pageModuleId: string) => {
      return await service.deleteModulePageService(pageModuleId).then((res) => {
        return res?.data?.data;
      });
    };
  }
}

export default PageInteractor;
