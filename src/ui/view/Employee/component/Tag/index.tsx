import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Button, List, Space, Tooltip } from "antd";
import TableComponent from "@components/commons/TableComponent";
import {
  PlusOutlined,
  ImportOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useEmployee from "../../viewModel";
// import EmployeeEdit from "./component/EmployeeEdit";
import EmployeeEntities from "@entities/employee";
import useTable from "@components/commons/TableComponent/hook";
import { swalAfter } from "@config/swalPulgin";
import EmployeeInteractor from "@useCases/employee";
import { useAsync } from "@hook/useAsync";
import { useHistory, useParams } from "react-router";
import TagInteractor from "@useCases/tag";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { debounce } from "@helper/functions";
import Tag from "@entities/tag/tag";
import { useTranslate } from "@hook/useTranslate";
import { common, employee, tagManager } from "@translateKey/index";
import "./styles.scss";
import moment from "moment";
const ModalTagEmployee = React.lazy(() => import("./ModalTagEmployee"));

const TagEmployee = ({ profile }) => {
  const register = useTable();
  const { idEmployee }: any = useParams();

  const { getListEmployeeInteractor, showModal, setShowModal } = useEmployee();
  const { deleteTagEmployeeInteractor } = new EmployeeInteractor();
  const { getListTagEmployee } = new TagInteractor();
  const [asyncDelete, getListTag] = useAsync(
    deleteTagEmployeeInteractor,
    getListTagEmployee
  );

  const [dataTag, setDataTag] = useState(null);
  const history = useHistory();

  const {
    TAG_NAME,
    TAG_COMMENT,
    TAG_TIME_START,
    TAG_TIME_END,
    TAG_FROM,
    ADD_TAG_FOR_EMPLOYEE,
  } = useTranslate(tagManager);
  const { DELETE } = useTranslate(common);
  const { EMPLOYEE } = useTranslate(employee);
  const columns = [
    {
      title: TAG_NAME,
      dataIndex: "tagName",
      key: "tagName",
    },
    {
      title: TAG_COMMENT,
      dataIndex: "tagComment",
      key: "tagComment",
    },
    {
      title: TAG_TIME_START,
      dataIndex: "tagTimeStart",
      key: "tagTimeStart",
    },
    {
      title: TAG_TIME_END,
      dataIndex: "tagTimeEnd",
      key: "tagTimeEnd",
    },
    {
      title: "",
      dataIndex: "",
      width: 120,
      key: "",
      sorter: false,
      sortOrder: "",
      render: (text, record) => (
        <div className="flex">
          <div className="btn-group mr-2">
            {/* <Tooltip title="Edit" className="mr-4">
              <EditOutlined onClick={() => editEmployee(record)} />
            </Tooltip> */}
            <Tooltip title={DELETE} className="btn-icon">
              <DeleteOutlined onClick={() => removeTagEmployee(record)} />
            </Tooltip>
            {/* <Tooltip title="Add Face" className="mr-4">
              <EditOutlined
                onClick={() => console.log("EditLanguage(record)")}
              />
            </Tooltip> */}
            {/* <ButtonComponent
                text={Translate(commonKey.DELETE)}
                onClick={() => DeleteLanguage(record)}
                classNames="cursor-pointer"
                typeColor="gray"
              /> */}
          </div>
        </div>
      ),
    },
  ];

  const editEmployee = (data?: EmployeeEntities) => {
    setShowModal({ edit: true, data: data, type: "edit" });
  };

  const removeTagEmployee = useCallback(
    (record: Tag) => {
      swalAfter(
        `${DELETE} ${record.tagName} ${TAG_FROM} ${profile?.userLastName} ${profile?.userFirstName} ${EMPLOYEE} ?`
      ).then((isOkie) => {
        if (isOkie) {
          asyncDelete.execute(profile?.userId, record.tagId, "3").then(() => {
            register.fetchData();
          });
        }
      });
    },
    [register]
  );

  const closeModal = (type: "" | "add" | "edit") => {
    setShowModal({ edit: false, data: {}, type: type });
  };
  const handleAdd = useCallback(() => {
    setShowModal({ edit: true, data: {}, type: "add" });
  }, []);
  const handleSearch = debounce(function (value) {
    register.fetchData({
      option: { search: value.trim() },
      pagination: { current: 1 },
    });
  }, 1000);

  useEffect(() => {
    const pagination = {};
    const option = {
      data: {
        employeeId: idEmployee,
        modeId: "Face_ID",
      },
    };
    getListTag.execute(pagination, option).then((res) => setDataTag(res.data));
  }, []);

  return (
    <>
      <div className="ListTag">
        <div className="mx-3 ml-auto flex justify-between">
          <div className="d-flex">
            <div className="float-left">
              <SearchComponent
                classNames={"ml-auto border-input"}
                width="400px"
                onChange={handleSearch}
              />
            </div>
          </div>
          <Button
            onClick={handleAdd}
            shape="round"
            className="primary mr-2 mb-8 pr-5 float-right btn-add"
            icon={<PlusOutlined />}
            size="large"
          >
            {ADD_TAG_FOR_EMPLOYEE}
          </Button>
        </div>
        {dataTag && (
          <List
            itemLayout="horizontal"
            pagination={{
              onChange: (page) => {},
              pageSize: 3,
            }}
            dataSource={dataTag}
            renderItem={(item: Tag) => (
              <List.Item>
                <List.Item.Meta
                  title={item?.tagName}
                  description={
                    "" +
                    moment(item?.dateStart).format("DD-MM-YYYY") +
                    " " +
                    item?.tagTimeStart +
                    " - " +
                    "" +
                    moment(item?.dateEnd).format("DD-MM-YYYY") +
                    " " +
                    item?.tagTimeEnd
                  }
                />
              </List.Item>
            )}
          />
        )}
        {/* <TableComponent
          columns={columns}
          register={register}
          defaultOption={{
            data: {
              employeeId: idEmployee,
              modeId: "Face_ID",
            },
          }}
          apiServices={getListTagEmployee}
        /> */}
        <Suspense fallback={<div></div>}>
          {showModal.edit && (
            <ModalTagEmployee
              idEmployee={idEmployee}
              visible={showModal.edit}
              type={showModal.type}
              data={showModal.data}
              closeModal={closeModal}
              onSubmitSuccess={() => register.fetchData()}
            />
          )}
        </Suspense>
      </div>
    </>
  );
};

export default React.memo(TagEmployee);
