import React, { useContext, useEffect, useState } from "react";
// import ModalComponent from "@shared/components/ModalComponent";
// import InputComponent from "@shared/components/InputComponent/Input.Component";
// import { IFaceNewLang, InitNewLang } from "../ListLanguage/interface";
// import { addLanguage, editLanguage } from "../../service";
// import { contextLangGlobal } from "../ListLanguage/LanguageContextPage";
import { Form, Input, Modal, notification, Select } from "antd";
import Language from "@entities/language/language";
import { useForm } from "antd/lib/form/Form";
import KeyLanguage from "@entities/language/key";
import useKeyLanguage from "../viewModel";
import useDetailModule from "../viewModel";
import ModulePost, { ArticleModuleFE } from "@entities/module/modulePost";
import { useTranslate } from "@hook/useTranslate";
import { article, common } from "@translateKey/index";
import Article from "@entities/article";

const { Option } = Select;
// const { languageKey } = allKey;
interface Iprops {
  visible: boolean;
  type: "edit" | "add" | "";
  closeModal: (value: "edit" | "add" | "") => void;
  onSubmit: (values: ArticleModuleFE) => void;
  loadingSubmit?: boolean;
  categoryCode: string;
  moduleId: string;
  isAddOneArticle: {
    isAdd: string;
    article: string;
  };
}

const ModalDetailModule = (props: Iprops) => {
  // const { convertFormKeyToObject } = useKeyLanguage();
  const {
    ARTICLE,
    ADD_ARTICLE,
    ARTICLE_PARENT,
  } = useTranslate(article);
  const { EDIT } = useTranslate(common);
  const { asyncGetAllArticleModule, asyncGetListParent } = useDetailModule();

  const [ form ] = useForm();
  useEffect(() => {
    if (props.type == "edit") {
      // form.setFieldsValue(convertFormKeyToObject(props.data));
    }
  }, []);
  useEffect(() => {
    asyncGetAllArticleModule.execute(props.categoryCode);
    asyncGetListParent.execute(props.moduleId);
  }, []);

  const handleCancelModal = () => {
    props.closeModal("");
  };

  return (
    <>
      <Modal
        visible={props.visible}
        title={props.type == "add" ? ADD_ARTICLE : EDIT}
        closable={true}
        onCancel={handleCancelModal}
        onOk={form.submit}
        confirmLoading={props.loadingSubmit}
      >
        <Form
          name="basic"
          form={form}
          onFinish={(values: ArticleModuleFE) => props.onSubmit(values)}
        //   onFinishFailed={onFinishFailed}
        >
          {!props.isAddOneArticle.isAdd && (
            <Form.Item
              label={ARTICLE}
              name="listArticles"
              rules={[
                {
                  required: true,
                  // message: Translate(messageKey.MESS_EMPTY_SELECT_ARTICLES),
                  message: "Please choose articles!",
                },
              ]}
            >
              <Select
                mode="multiple"
                showSearch
                // placeholder={Translate(messageKey.MESS_SELECT_ARTICLES)}
                placeholder={"Select article"}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {asyncGetAllArticleModule.value?.map(
                  (item: Article, index) => (
                    <Option
                      key={index.toString(36) + index}
                      value={item.articleId}
                    >
                      {item.articleName}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="parentId"
            // label={`${ Translate(specificKey.ARTICLES_PARENT) }`}
            label={ARTICLE_PARENT}
          >
            <Select
              // placeholder={Translate(messageKey.MESS_SELECT_ARTICLES_PARENT)}
              placeholder={"Select article parent"}
              style={{ width: "100%" }}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {asyncGetListParent.value?.map((item: ModulePost, index) => (
                <Option
                  key={index.toString(36) + index}
                  value={item.modulePostId}
                >
                  {item.article.articleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalDetailModule);
