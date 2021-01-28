import Article from "@entities/article";
import ModuleTranslate from "./moduleTranslate";

export interface ArticleModuleFE {
  listArticles: Array<string>;
  parentId: string;
}
export interface ArticleModuleBE {
  moduleId: string;
  parentId: string;
  postLanguageID: string;
}

class ModulePost {
  article: Article;
  articleId: string = "";
  moduleId: string = "";
  moduleLink: string = "";
  moduleNavigation: number = 0;
  modulePostId: string = "";
  modulePostChild: Array<ModulePost> = [];
  modulePostIndex: number = 0;
  navigationIndex: number = 0;
  parentId: string | null = null;
  moduleTranslates: Array<{
    languageCode: string;
    languageName?: string;
    moduleTranslateId?: string;
    moduleTranslateTitle?: string;
  }> = [];

  constructor(modulePost?) {
    if (!modulePost) return;
    Object.keys(this).forEach((key) => {
      switch (key) {
        case "article":
          this[ key ] = new Article(modulePost[ key ]);
          break;
        case "modulePostChild":
          this[ key ] = this.createListModulePost(modulePost[ key ]);
          break;
        default:
          this[ key ] = modulePost[ key ] || this[ key ];
          break;
      }
    });
  }

  createListModulePost(listModulePost) {
    if (!Array.isArray(listModulePost)) return [];
    return listModulePost.map((modulePost) => {
      return new ModulePost(modulePost);
    });
  }

  addModuleTranslate(listModuleTranslate) {
    this.moduleTranslates = new ModuleTranslate().createListModuleTranslate(
      listModuleTranslate
    );
    return this;
  }

  convertModuleSize(value, type?: "entities"): any {
    if (type == "entities") {
      switch (value) {
        case 0:
          return "small";
        case 1:
          return "default";
        default:
          return "large";
      }
    } else {
      switch (value) {
        case "small":
          return 0;
        case "default":
          return 1;
        default:
          return 2;
      }
    }
  }
}

export default ModulePost;
