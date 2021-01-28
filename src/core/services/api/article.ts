import apiService from "../apiService";

class ArticleService {
  getDetailArticle: (articleId) => any;
  getArticleByCategory: (categoryId: string) => any;
  addArticleByCategory: (article) => any;
  editArticleByCategory: (article, articleId) => any;
  getAllArticleByModuleTypeCode: (categoryCode: string) => Promise<any>;
  removeArticle: (articleId) => any;

  constructor() {
    this.getDetailArticle = async (articleId: string) => {
      return apiService.executeApi({
        path: `api/article/showDetailAritcle/${ articleId }`,
        showSuccess: false,
        showError: false,
      });
    };

    this.getArticleByCategory = async (categoryId: string) => {
      return apiService.executeApi({
        path: `api/article/showAllAritcleGroupByModuleTypeCode/${ categoryId }`,
        showSuccess: false,
        showError: false,
      });
    };

    this.removeArticle = async (articleId: string) => {
      return apiService.executeApi({
        path: `api/article/deleteAritcle/${ articleId }`,
        method: "delete",
      });
    };

    this.addArticleByCategory = async (article) => {
      return apiService.executeApi({
        path: `api/article/createArticelLanguage`,
        payload: article,
        method: "post",
      });
    };

    this.editArticleByCategory = async (article, articleId: string) => {
      return apiService.executeApi({
        path: `api/article/editAritcle/${ articleId }`,
        payload: article,
        method: "put",
      });
    };

    this.getAllArticleByModuleTypeCode = async (categoryCode: string) => {
      return apiService.executeApi({
        path: `/api/article/showAllAritcleGroupByModuleTypeCode/${ categoryCode }`,
        method: "get",
        showSuccess: false,
        showError: false,
      });
    };
  }
}

export default ArticleService;
