import Language from "@entities/language/language";
import Page from "@entities/page";
import { useAsync } from "@hook/useAsync";
import LanguageInteractor from "@useCases/language/language";
import ModuleInterator from "@useCases/module";
import PageInteractor from "@useCases/page";
import { useEffect, useState } from "react";

interface IEditLang {
  edit: boolean;
  data?: any;
  type: "edit" | "add" | "";
}

const usePageDetail = (pageCode?: string) => {
  const {
    getListModulePageInteractor,
    changeDisplayInteractor,
    addModuleToPageInteractor,
    deleteModulePageInteractor,
    changeOrderModulePageInteractor,
  } = new PageInteractor();
  const { getListModuleAll } = new ModuleInterator();
  const [
    asyncGetListModulePage,
    asyncGetListModuleAll,
    asyncChangeDisplay,
    asyncPageDetail,
    asyncDeleteModulePage,
    asyncChangeOrder,
  ] = useAsync(
    [getListModulePageInteractor],
    [getListModuleAll],
    [changeDisplayInteractor, { showSuccess: true }],
    [addModuleToPageInteractor, { showSuccess: true }],
    [deleteModulePageInteractor, { showSuccess: true }],
    [changeOrderModulePageInteractor, { showSuccess: true }]
  );
  const [showEditLang, setShowEditLang] = useState<IEditLang>({
    edit: false,
    data: {},
    type: "",
  });

  //   useEffect(() => {
  //     if (asyncGetListLanguage.value) {
  //       setDataLanguage(asyncGetListLanguage.value);
  //     }
  //   }, [asyncGetListLanguage.value]);

  const changeOrder = (data: Array<Page>) => {
    asyncChangeOrder.execute(data);
  };

  const changeDisplay = (moduleId: string, e) => {
    const body = [
      {
        LanguageCode: e.target.name,
        moduleLanguageDisplay: e.target.checked ? "show" : "hidden",
      },
    ];
    asyncChangeDisplay.execute(moduleId, body).then(() => {
      asyncGetListModulePage.execute(pageCode);
    });
  };

  return {
    asyncGetListModulePage,
    asyncGetListModuleAll,
    changeDisplay,
    changeOrder,
    showEditLang,
    setShowEditLang,
    asyncPageDetail,
    asyncDeleteModulePage,
  };
};

export default usePageDetail;
