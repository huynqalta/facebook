class ArticleLanguage {
    articleId: string = ''
    articleIdLink: string = ''
    articleIdLinkName: string = ''
    articleLanguageContent: string = ''
    articleLanguageContent2: string = ''
    articleLanguageContent3: string = ''
    articleLanguageCreatedAt: string = ''
    articleLanguageCurrentcy: string = ''
    articleLanguageDeparture: string = ''
    articleLanguageDepartureName: string = ''
    articleLanguageDescription: string = ''
    articleLanguageDestination: string = ''
    articleLanguageDestinationName: string = ''
    articleLanguageFromDay: string = ''
    articleLanguageId: string = ''
    articleLanguageImage: string = ''
    articleLanguageLink: string = ''
    articleLanguageLinkInternal: string = ''
    articleLanguageMoney: string = ''
    articleLanguageRouteType: string = ''
    articleLanguageSortIndex: string = ''
    articleLanguageSpecitalCharacter: string = ''
    articleLanguageTag: string = ''
    articleLanguageThumbnail: string = ''
    articleLanguageTitle: string = ''
    articleLanguageToDay: string = ''
    languageCode: string = ''
    linkStatus: 'on' | 'off'

    constructor(articleLanguage?) {
        if (articleLanguage) {
            Object.keys(this).forEach(key => {
                if (articleLanguage[ key ]) {
                    this[ key ] = articleLanguage[ key ]
                }
            })
        }
    }

    convertArticleLanguageLinkInternal(value, type: "entites" | "raw" = "entites") {
        if (type == "entites") {
            switch (value) {
                case 0: return "out"
                default: return "in"
            }
        } else {
            switch (value) {
                case "out": return 0
                default: return 1
            }
        }
    }

    convertLinkStatus(value, type: "entites" | "raw" = "entites") {
        if (type == "entites") {
            switch (value) {
                case 0: return "off"
                default: return "on"
            }
        } else {
            switch (value) {
                case "off": return 0
                default: return 1
            }
        }
    }
}

export default ArticleLanguage