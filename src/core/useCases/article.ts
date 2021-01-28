import ArticleService from "@api/article"
import Article from "@entities/article"

class ArticleInteractor extends ArticleService {
  constructor() {
    super()
    const service = new ArticleService()

    this.getDetailArticle = async (articleId: string) => {
      return service.getDetailArticle(articleId).then((res) => {
        return new Article(res?.data?.data).addListArticleLanguage(res?.data?.data?.articleLanguages)
      })
    }

    this.getArticleByCategory = async (categoryId: string) => {
      return await service.getArticleByCategory(categoryId).then((res) => {
        return new Article().createListArticle(res?.data?.data) || []
      })
    }

    this.removeArticle = service.removeArticle

    this.addArticleByCategory = async (article: Article) => {
      return await service.addArticleByCategory(new Article(article))
    }

    this.editArticleByCategory = async (article: Article, articleId) => {
      return await service.editArticleByCategory(new Article(article), articleId)
    }

    this.getAllArticleByModuleTypeCode = async (categoryCode: string) => {
      return await service
        .getAllArticleByModuleTypeCode(categoryCode)
        .then((res) => {
          return new Article().createListArticle(res?.data?.data) || []
        })
    }
  }
}

export default ArticleInteractor
