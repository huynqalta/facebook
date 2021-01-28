import React from "react";
import { Breadcrumb, Button, Tooltip } from "antd";
import TableComponent from "@components/commons/TableComponent";
import useTable from "@components/commons/TableComponent/hook";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { debounce } from "@helper/functions";
import PageInteractor from "@useCases/page";
import { useHistory } from "react-router";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { page, home, common } from "@translateKey/index";
import { useTranslate } from "@hook/useTranslate";

const Page = () => {
  const { getListPageInteractor } = new PageInteractor();

  const { PAGE, PAGE_NAME, PAGE_TOTAL } = useTranslate(page);
  const { ACTION, DETAIL } = useTranslate(common);
  const { HOME } = useTranslate(home);

  const register = useTable();
  const history = useHistory();
  //   const { CONFIRM_DELETE_MESS } = useTranslate(commonKey);

  const columns = [
    {
      title: PAGE_NAME,
      dataIndex: "pageName",
      key: "pageName",
      width: "70%",
    },

    {
      title: PAGE_TOTAL,
      dataIndex: "pageModuleTotal",
      key: "pageModuleTotal",
      width: "20%",
    },
    {
      title: ACTION,
      dataIndex: "",
      key: "",
      sorter: false,
      sortOrder: "",
      render: (text, record) => (
        <div className="flex">
          <div className="btn-group mr-2">
            {/* <ButtonComponent
              text={Translate(commonKey.EDIT)}
              onClick={() => EditLanguage(record)}
              classNames="cursor-pointer"
            /> */}
            <Tooltip title={DETAIL} className="mr-4">
              <InfoCircleOutlined
                onClick={() => history.push(`/page/detail/${record.pageCode}`)}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const handleSearch = debounce(function (value) {
    register.fetchData({
      option: { search: value.trim() },
      pagination: { current: 1 },
    });
  }, 1000);

  return (
    <>
      <div className="KeyLanguage">
        <Breadcrumb
          className="flex-auto breadcb mb-2"
          separator={<RightOutlined />}
        >
          <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
          <Breadcrumb.Item className="breadcb__last">{PAGE}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex">
          <div className="float-left">
            <SearchComponent
              onChange={handleSearch}
              classNames={"ml-auto border-input"}
              width="500px"
            />
          </div>
          <div className="mx-3 ml-auto flex justify-end"></div>
        </div>
        <br />
        <TableComponent
          columns={columns}
          register={register}
          apiServices={getListPageInteractor}
        />
      </div>
    </>
  );
};

export default React.memo(Page);
