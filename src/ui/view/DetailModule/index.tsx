import { swalAfter } from "@config/swalPulgin";
import ModulePost, { ArticleModuleFE } from "@entities/module/modulePost";
import { Breadcrumb, Button } from "antd";
import React, { Suspense, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { ExpandedRowRenderCommon, rowArticleCommon } from "./common";
import useDetailModule from "./viewModel";
import { PlusOutlined, ImportOutlined } from "@ant-design/icons";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslate } from "@hook/useTranslate";
import { common, home, module, page, article } from "@translateKey/index";
const ModalDetailModule = React.lazy(
  () => import("./components/ModalDetailModule")
);
const DetailModule = ({}) => {
  const { idCategory, idModule, pageCode }: any = useParams();
  const { PAGE } = useTranslate(page);
  const { ACTION, DETAIL, LANGUAGE, DELETE } = useTranslate(common);
  const { MODULE, ADD_MODULE } = useTranslate(module);
  const { HOME } = useTranslate(home);
  const {
    ARTICLE,
    ADD_ARTICLE,
    TAKE_IN_PARENT,
    TAKE_OUT_PARENT,
    TYPE,
  } = useTranslate(article);
  const history = useHistory();
  const {
    asyncGetList,
    asyncGetDetail,
    asyncModulePost,
    asyncDeleteModulePost,
    setShowModal,
    showModal,
    articleTakein,
    asyncTakeoutModulePost,
    setArticleTakein,
  } = useDetailModule();
  const handleUpdateArticleParent = useCallback((item: ModulePost) => {
    asyncTakeoutModulePost.execute(item.modulePostId).then(() => {
      CloseModalEdit("");
      asyncGetList.execute(idModule);
    });
  }, []);
  useEffect(() => {
    asyncGetList.execute(idModule);
    asyncGetDetail.execute(idModule);
  }, []);
  const handleUpdateArticleChild = useCallback((item: ModulePost) => {
    setArticleTakein(item.modulePostId);
    setShowModal({ edit: true, data: {}, type: "add" });
  }, []);
  const handleDetele = useCallback(
    (item: ModulePost) => {
      swalAfter(`Delete ${item.article.articleName}`).then((isOk) => {
        if (isOk) {
          asyncDeleteModulePost.execute(item.modulePostId).then(() => {
            asyncGetList.execute(idModule);
          });
        }
      });
    },
    [idModule, idCategory]
  );
  const CloseModalEdit = (type: "" | "add" | "edit") => {
    setShowModal({ edit: false, data: {}, type: type });
  };
  const HandleAddKey = () => {
    setShowModal({ edit: true, data: {}, type: "add" });
  };

  const handeSubmit = useCallback(
    (values: ArticleModuleFE) => {
      asyncModulePost.execute(values, idModule, articleTakein).then(() => {
        CloseModalEdit("");
        asyncGetList.execute(idModule);
      });
    },
    [articleTakein]
  );
  const rowArticleNameParent = rowArticleCommon(asyncGetList.value);
  const setListArticle = () => {};
  return (
    <div className="detail-module-categories">
      <section className="d-flex align-items-center">
        <Breadcrumb
          className="flex-auto breadcb mb-2"
          separator={<RightOutlined />}
        >
          <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
          {pageCode && (
            <Breadcrumb.Item>
              <Link to={`/page/detail/${pageCode}`}>{pageCode}</Link>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>
            <Link to={`/categories/${idCategory}/modules`}>{MODULE}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcb__last">
            {/* {pageCode} */}
            {asyncGetDetail.value?.moduleName}
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* <BreadCrumbComponent breadCrumbs={breadCrumbs} /> */}
      </section>
      <section className="wrap-component detail-module">
        <div className="mb-6 flex justify-between items-center">
          <h5 className="text-base">
            {TYPE}: <strong>{idCategory}</strong>
          </h5>
          <section className=" flex justify-end">
            <Button
              onClick={HandleAddKey}
              icon={<PlusOutlined />}
              shape="round"
              className="primary mr-2 pr-5 float-right btn-add"
              size="large"
            >
              {ADD_ARTICLE}
            </Button>
          </section>
        </div>
        {ExpandedRowRenderCommon(
          asyncGetList.status == "loading",
          asyncGetList.value,
          rowArticleNameParent,
          idCategory,
          handleUpdateArticleParent,
          handleUpdateArticleChild,
          handleDetele,
          setListArticle,
          [],
          history,
          {
            takein: TAKE_IN_PARENT,
            takeout: TAKE_OUT_PARENT,
            action: ACTION,
            detail: DETAIL,
            delete: DELETE,
          }
        )}
      </section>
      <Suspense fallback={<div></div>}>
        {showModal.edit && (
          <ModalDetailModule
            visible={showModal.edit}
            type={showModal.type}
            categoryCode={idCategory}
            moduleId={idModule}
            onSubmit={handeSubmit}
            loadingSubmit={asyncGetList.status == "loading"}
            closeModal={CloseModalEdit}
            isAddOneArticle={{
              isAdd: articleTakein,
              article: articleTakein,
            }}
          />
          // <ModalKeyLanguage
          //   visible={showEditLang.edit}
          //   type={showEditLang.type}
          //   data={showEditLang.data}
          //   dataKeyLanguage={[]}
          //   dataLanguage={asyncGetListLanguage.value}
          //   closeModal={CloseModalEdit}
          //   onSubmit={handeSubmit}
          //   loadingSubmit={asyncKeyLanguage.status == "loading"}
          // />
        )}
      </Suspense>
      {/* <ModalComponent
    visible={showModal}
    title={
      showModal &&
      (articleTakein
        ? `${ Translate(commonKey.TAKE_IN_ARTICLE_PARENT) }`
        : `${ Translate(commonKey.ADD) } ${ Translate(specificKey.ARTICLES) }`)
    }
    onCancel={handleCloseModal}
    footer={false}
  >
    <LazyLoadComponent
      conFigEndpoint={() => import("./components/AddArticleModule")}
      statusLazy={showModal}
      idCategory={idCategory}
      idModule={idModule}
      closeModal={handleCloseModal}
      addSuccess={useCallback(() => getListArticle(idModule), [ idModule ])}
      isAddOneArticle={{
        isAdd: articleTakein,
        article: articleTakein,
      }}
    />
  </ModalComponent> */}
    </div>
  );
};
export default React.memo(DetailModule);
