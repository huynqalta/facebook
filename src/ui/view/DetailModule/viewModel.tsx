import KeyLanguage from "@entities/language/key";
import Language from "@entities/language/language";
import Module from "@entities/module/module";
import { useAsync } from "@hook/useAsync";
import ArticleInteractor from "@useCases/article";
import ModuleInterator from "@useCases/module";
import ModulePostInteractor from "@useCases/modulePost";
import { useState } from "react";

interface IEditLang {
  edit: boolean;
  data?: any;
  type: "edit" | "add" | "";
}

const useDetailModule = () => {
  const {
    getListModulePostInteractor,
    getListModulePostParentInteractor,
    addArticleToModuleInteractor,
    removeArticleToModuleInteractor,
    deleteModulePostInteractor,
  } = new ModulePostInteractor();
  const { getDetailModule } = new ModuleInterator();
  const { getAllArticleByModuleTypeCode } = new ArticleInteractor();
  const [
    asyncGetList,
    asyncGetDetail,
    asyncGetListParent,
    asyncGetAllArticleModule,
    asyncModulePost,
    asyncTakeoutModulePost,
    asyncDeleteModulePost,
  ] = useAsync(
    [getListModulePostInteractor],
    [getDetailModule],
    [getListModulePostParentInteractor],
    [getAllArticleByModuleTypeCode],
    [addArticleToModuleInteractor, { showSuccess: true, showError: true }],
    [removeArticleToModuleInteractor, { showSuccess: true, showError: true }],
    [deleteModulePostInteractor, { showSuccess: true, showError: true }]
  );
  const [dataLanguage, setDataLanguage] = useState<Array<Language>>([]);
  const [showModal, setShowModal] = useState<IEditLang>({
    edit: false,
    data: {},
    type: "",
  });
  const [articleTakein, setArticleTakein] = useState<any>(null);

  const convertFormKey = (keyLanguage) => {
    const newKey = {
      keyCode: "",
      keyDescription: "",
      translateKeys: [],
    };
    Object.keys(keyLanguage).map((key: string) => {
      if (key == "keyCode" || key == "keyDescription")
        newKey[key] = keyLanguage[key];
      else {
        if (keyLanguage[key]) {
          newKey["translateKeys"] = [
            ...newKey["translateKeys"],
            {
              languageCode: key,
              translateKeyCode: keyLanguage[key] || "",
            },
          ];
        }
      }
    });
    return new KeyLanguage(newKey);
  };

  const convertFormKeyToObject = (keyLanguage: KeyLanguage) => {
    const newKey = {};
    keyLanguage.translateKeys.map((item) => {
      newKey[item.languageCode] = item.translateKeyCode;
    });
    const dataNew = {
      ...keyLanguage,
      ...newKey,
    };
    return dataNew;
  };

  return {
    asyncGetList,
    asyncGetAllArticleModule,
    asyncGetDetail,
    asyncGetListParent,
    asyncModulePost,
    asyncTakeoutModulePost,
    asyncDeleteModulePost,
    setShowModal,
    showModal,
    articleTakein,
    setArticleTakein,
    convertFormKey,
    convertFormKeyToObject,
  };
};

export default useDetailModule;
