class Language {
  languageCode: string = "";
  languageName: string = "";
  languageSub: string = "";
  languageNameSub: string = "";
  languageOrder: number = 0;
  languageID: string = "";
  languageEnsign: string = "";

  constructor(language?) {
    Object.keys(this).forEach((key) => {
      this[key] = language[key] || this[key];
    });
  }

  createListLanguage(listlanguage) {
    if (!Array.isArray(listlanguage)) return [];

    return listlanguage.map((language) => {
      return new Language(language);
    });
  }
}

export default Language;
