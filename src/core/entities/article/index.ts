import ArticleLanguage from "./articleLanguage"

class Article {
    articleId: string = ''
    articleName: string = ''
    articleTag: string = ''
    articleIcon: string = ''
    moduleTypeCode: string = ''
    articleDisplayDate: 'display' | 'hide' = 'display'
    articleRelatednewDisplay: 'display' | 'hide' = 'display'
    articleBackground: string = ''
    articleLanguageId: string = ''
    articleLanguage: Array<ArticleLanguage> | ArticleLanguage

    constructor(article?) {
        if (article) {
            Object.keys(this).forEach(key => {
                if (!article[ key ]) return
                switch (key) {
                    case "articleDisplayDate":
                        this[ key ] = this.convertArticleDisplayDate(article[ key ], "entites")
                        break;
                    case "articleRelatednewDisplay":
                        this[ key ] = this.convertArticleRelatednewDisplay(article[ key ], "entites")
                        break;
                    default:
                        this[ key ] = article[ key ]
                        break;
                }
            })
        }
    }

    deleteArticleLanguage() {
        let that = this
        delete that.articleLanguage
        return that
    }

    addListArticleLanguage(listArticleLang) {
        if (!listArticleLang) return this
        this.articleLanguage = listArticleLang.map(item => {
            return new ArticleLanguage(item)
        })
        return this
    }

    addArticleLanguage(articleLanguage) {
        if (!articleLanguage) return this
        this.articleLanguage = new ArticleLanguage(articleLanguage)
        return this
    }

    createListArticle = (listArticle) => {
        if (!listArticle) return []
        return listArticle.map(item => {
            return new Article(item)
        })
    }

    convertArticleDisplayDate(value, type: "entites" | "raw" = "entites"): any {
        if (type == "entites") {
            switch (value) {
                case 0: return "hide"
                default: return "show"
            }
        } else {
            switch (value) {
                case "hide": return 0
                default: return 1
            }
        }
    }

    convertArticleRelatednewDisplay(value, type: "entites" | "raw" = "entites"): any {
        if (type == "entites") {
            switch (value) {
                case 0: return "hide"
                default: return "show"
            }
        } else {
            switch (value) {
                case "hide": return 0
                default: return 1
            }
        }
    }

}

export default Article