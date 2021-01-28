class Category {
  moduleTypeCode: string = "";
  moduleTypeDisplayArticle: number;
  moduleTypeName: string = "";

  constructor(category?) {
    Object.keys(this).forEach((key) => {
      this[key] = category[key];
    });
  }

  createListCategory(listCategory) {
    if (!Array.isArray(listCategory)) return [];

    return listCategory.map((category) => {
      return new Category(category);
    });
  }
}

export default Category;
