import Category from "@entities/category";
import apiService from "../apiService";

export default class CategorysService {
  getList: () => any;
  edit: (category, code) => any;
  getDetail: (categoryId) => any;

  constructor() {
    this.getList = async () => {
      const path = `api/BookingModule/ShowAllModuleType`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
        customRes: (res) => {
          return new Category({}).createListCategory(res?.data?.data);
        },
      });
    };

    this.getDetail = async (moduleId) => {
      const path = `/api/BookingModule/showDetail/${ moduleId }`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
        customRes: (res) => {
          return new Category(res);
        },
      });
    };

    this.edit = async (moduleTypeName, moduleTypeCode) => {
      return await apiService.executeApi({
        path: `/api/BookingModule/EditModuleType/${ moduleTypeCode }`,
        payload: { moduleTypeName },
        method: "put",
      });
    };
  }
}
