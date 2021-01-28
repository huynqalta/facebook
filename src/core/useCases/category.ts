import CategorysService from "@api/category";

class CategoryInteractor implements CategorysService {
  getList: () => any;
  edit: (category, code) => any;
  getDetail: (categoryId) => any;

  constructor() {
    const service = new CategorysService();
    Object.keys(service).forEach((key) => {
      this[key] = service[key];
    });
  }
}

export default CategoryInteractor;
