const defaultTranslateKeys = {
  keyCode: "",
  languageCode: "",
  translateKeyCode: "",
  translateKeyId: "",
};
class KeyLanguage {
  keyCode: string = "";
  keyDescription: string = "";
  translateKeys?: Array<{
    keyCode?: string;
    languageCode: string;
    translateKeyCode: string;
    translateKeyId?: string;
  }> = [];

  constructor(keyLanguage?) {
    Object.keys(this).forEach((key) => {
      this[key] = keyLanguage[key] || this[key];
    });
  }

  createListKeyLanguage(listKeylanguage) {
    if (!Array.isArray(listKeylanguage)) return [];

    return listKeylanguage.map((keyLanguage) => {
      return new KeyLanguage(keyLanguage);
    });
  }
}

export default KeyLanguage;
