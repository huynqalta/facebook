import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Breadcrumb, Button, Checkbox, Table, Tooltip } from "antd";
import ExpandedRowRender from "@components/commons/ExpandedRowRender";
import useLanguage from "./viewModel";
import Language from "@entities/language/language";
import { swalAfter } from "@config/swalPulgin";
import useDetailModule from "@view/DetailModule/viewModel";
import usePageDetail from "./viewModel";
import { useHistory, useParams } from "react-router";
import ModuleTranslate from "@entities/module/moduleTranslate";
import ItemModulePageLanguage from "./ItemLanguage";
import ModalPageDetail from "./ModalPageDetail";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslate } from "@hook/useTranslate";
import { common, home, page, module } from "@translateKey/index";

const PageDetail = () => {
  const { pageCode }: any = useParams();
  const { PAGE } = useTranslate(page);
  const { ACTION, DETAIL, LANGUAGE, DELETE } = useTranslate(common);
  const { MODULE_NAME, ADD_MODULE } = useTranslate(module);
  const { HOME } = useTranslate(home);
  const history = useHistory();
  const {
    asyncGetListModulePage,
    changeDisplay,
    setShowEditLang,
    showEditLang,
    asyncPageDetail,
    asyncDeleteModulePage,
    changeOrder,
  } = usePageDetail(pageCode);

  const handleChangeDisplay = useCallback((moduleId, e) => {
    changeDisplay(moduleId, e);
  }, []);

  const columns = [
    {
      title: MODULE_NAME,
      dataIndex: "moduleName",
      key: "moduleName",
    },
    {
      title: LANGUAGE,
      dataIndex: "moduleLanguages",
      key: "moduleLanguages",
      render: (moduleLanguage: Array<ModuleTranslate>, record) => {
        return (
          <>
            {moduleLanguage.map((item: ModuleTranslate, index: number) => (
              <ItemModulePageLanguage
                item={item}
                record={record}
                index={index}
                onChange={handleChangeDisplay}
              />
            ))}
          </>
        );
      },
    },
    {
      title: ACTION,
      dataIndex: "",
      width: 100,
      render: (text, record) => (
        <div className="flex">
          <Tooltip title={DETAIL} className="mr-4">
            <InfoCircleOutlined
              onClick={() =>
                history.push(
                  `/detail-module/${record.moduleTypeCode}/${record.moduleId}/${pageCode}`
                )
              }
            />
          </Tooltip>
          <Tooltip title={DELETE}>
            <DeleteOutlined onClick={() => removeModule(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const CloseModalEdit = useCallback((value) => {
    setShowEditLang({ edit: value, data: {}, type: "" });
  }, []);

  const HandleAddNewModule = () => {
    setShowEditLang({ edit: true, data: {}, type: "add" });
  };
  const removeModule = useCallback((record) => {
    swalAfter(`${"Delete"} ${record.moduleName}`).then((isOkie) => {
      if (isOkie) {
        asyncDeleteModulePage.execute(record.pageModuleId).then(() => {
          asyncGetListModulePage.execute(pageCode);
        });
      }
    });
  }, []);
  const handeSubmit = useCallback((values) => {
    asyncPageDetail.execute(pageCode, values.listModule).then(() => {
      CloseModalEdit("");
      asyncGetListModulePage.execute(pageCode);
    });
  }, []);

  useEffect(() => {
    asyncGetListModulePage.execute(pageCode);
  }, []);

  const receiveSort = useCallback((newData, id) => {
    changeOrder(newData);
  }, []);

  return (
    <>
      <div className="ListLanguage">
        <Breadcrumb
          className="flex-auto breadcb mb-2"
          separator={<RightOutlined />}
        >
          <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={"/page"}>{PAGE}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcb__last">
            {pageCode}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex">
          <div className="float-left">
            {/* <SearchComponent onChange={handleSearch} classNames={"ml-auto border-input"} width="500px" /> */}
          </div>
          <div className="mx-3 ml-auto flex justify-end">
            <Button
              onClick={HandleAddNewModule}
              shape="round"
              className="primary pr-5 float-right btn-add"
              icon={<PlusOutlined />}
              size="large"
            >
              {ADD_MODULE}
            </Button>
          </div>
        </div>
        <br />
        <ExpandedRowRender
          propetyTable={{
            // bodered: false,
            showHeader: true,
            loading: asyncGetListModulePage.status == "loading",
            className: "mt-2",
          }}
          columns={columns}
          data={asyncGetListModulePage.value}
          isDragable={true}
          rowKey={"pageModuleIndex"}
          handleSortCallBack={receiveSort}
        />
        <Suspense fallback={<div></div>}>
          {showEditLang.edit && (
            <ModalPageDetail
              visible={showEditLang.edit}
              type={showEditLang.type}
              closeModal={CloseModalEdit}
              onSubmit={handeSubmit}
              loadingSubmit={asyncPageDetail.status == "loading"}
            />
          )}
        </Suspense>
      </div>
    </>
  );
};

export default React.memo(PageDetail);
