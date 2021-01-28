import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Space, Tooltip } from "antd";
import TableComponent from "@components/commons/TableComponent";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import useEmployee from "./viewModel";
import EmployeeEntities from "@entities/employee";
import useTable from "@components/commons/TableComponent/hook";
import { swalAfter } from "@config/swalPulgin";
import EmployeeInteractor from "@useCases/employee";
import { useAsync } from "@hook/useAsync";
import { RightOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { debounce } from "@helper/functions";
import { useTranslate } from "@hook/useTranslate";
import { Link } from "react-router-dom";
import { common, employee, group } from "@translateKey/index";
import ModalImportFile from "./component/ModalImportCode";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";
import { useSetRecoilState } from "recoil";
import IconImage from "@components/commons/iconImage";
import { PROJECT } from "@config/index";

const Employee = (props) => {
  const register = useTable();
  const params = useParams();
  let paramsTagId = null;
  let paramsGroupId = null;
  params.from == "tag"
    ? (paramsTagId = params?.Id)
    : (paramsGroupId = params?.Id);
  console.log(params);
  const [dataFormImport, setDataFormImport] = useState({
    visible: false,
    idGroup: null,
  });

  const [groupName, setGroupName] = useState(null);
  const [tagName, setTagName] = useState(null);

  const {
    NAME,
    EMAIL,
    PHONE,
    ADDRESS,
    GENDER,
    STATUS,
    ADD_EMPLOYEE,
    GROUP_NAME,
    EDIT,
    DELETE,
    PROFILE,
    LIST_EMPLOYEE,
    EMPLOYEE,
  } = useTranslate(employee);
  const {
    IMPORT_EMPLOYEE,
    IMPORT_EMPLOYEE_FAIL,
    CANCEL,
    SUBMIT,
    GROUP,
  } = useTranslate(group);
  const { HOME } = useTranslate(common);

  const {
    getListEmployeeInteractor,
    showModal,
    setShowModal,
    getDetailTagInteractor,
    getListEmployeeWithGroupInteractor,
    getListEmployeeWithTagInteractor,
    getDetailGroupInteractor,
  } = useEmployee();
  const setStateUploadImage = useSetRecoilState(UploadImageStore);

  const { deleteEmployeeInteractor } = new EmployeeInteractor();
  const [asyncDelete, getDetailGroup, getDetailTag] = useAsync(
    deleteEmployeeInteractor,
    getDetailGroupInteractor,
    getDetailTagInteractor
  );
  const history = useHistory();

  useEffect(() => {
    paramsGroupId &&
      getDetailGroup
        .execute(paramsGroupId)
        .then((res) => setGroupName(res?.groupName));
    paramsTagId &&
      getDetailTag.execute(paramsTagId).then((res) => setTagName(res?.tagName));
    setStateUploadImage((pre) => ({ ...pre, imageShow: [], imageServer: [] }));
  }, []);

  const columns = [
    {
      title: NAME,
      dataIndex: "",
      key: "employeeId",
      render: (text, record: EmployeeEntities) => (
        <span>
          {record.userLastName} {record.userFirstName}
        </span>
      ),
    },
    {
      title: EMAIL,
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: PHONE,
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: ADDRESS,
      dataIndex: "userAddress",
      key: "userAddress",
    },
    {
      title: GENDER,
      dataIndex: "userGender",
      key: "userGender",
    },
    paramsGroupId
      ? {}
      : {
          title: GROUP_NAME,
          dataIndex: "group",
          key: "group",
          render: (text, record) => text?.groupName,
        },
    {
      title: STATUS,
      dataIndex: "userStatus",
      key: "userStatus",
      render: (text, record) => {
        return (
          <span className={`${record.userStatus && "Active"} active__status`}>
            {record.userStatus}
          </span>
        );
      },
    },

    // {
    //   title: "",
    //   dataIndex: "userId",
    //   key: "userId",
    //   render: (item) => (
    //     <Space size="middle">
    //       <Button
    //         className="none__background"
    //         onClick={() => history.push(`/employee/profile/${item}`)}
    //       >
    //         Profile
    //       </Button>
    //     </Space>
    //   ),
    // },
    paramsGroupId || paramsTagId
      ? {}
      : {
          title: "",
          dataIndex: "userId",
          width: 200,
          key: "userId",
          sorter: false,
          sortOrder: "",
          render: (item, record) => (
            <Space size="middle" className="">
              <Button
                className="none__background"
                onClick={() => history.push(`/profile/${"detail"}/${item}`)}
              >
                {PROFILE}
              </Button>
              <Tooltip title={EDIT} className="">
                <a onClick={() => history.push(`/profile/${"edit"}/${item}`)}>
                  <IconImage title="edit" />
                </a>
              </Tooltip>
              <Tooltip title={DELETE}>
                <a onClick={() => removeEmployee(record)}>
                  <IconImage title="delete" />
                </a>
              </Tooltip>
            </Space>
          ),
        },
  ];

  const removeEmployee = useCallback(
    (record: EmployeeEntities) => {
      swalAfter(
        `${"Delete"} ${record.userLastName} ${record.userFirstName}`
      ).then((isOkie) => {
        if (isOkie) {
          asyncDelete.execute(record.userId).then(() => {
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
  const onCancel = () => {
    setDataFormImport((pre) => ({ ...pre, visible: false }));
  };

  // console.log(
  //   getDetailGroup.execute(paramsGroupId).then((res) => console.log(res))
  // );

  return (
    <>
      <div className="Table">
        <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
          <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
          <Breadcrumb.Item
            className={paramsGroupId || paramsTagId ? "" : "breadcb__last"}
          >
            {paramsGroupId ? (
              <Link to="/group">{GROUP}</Link>
            ) : paramsTagId ? (
              <Link to="/tag-manager">{"Tag"}</Link>
            ) : (
              EMPLOYEE
            )}
          </Breadcrumb.Item>
          {paramsGroupId ? (
            <Breadcrumb.Item className="breadcb__last">
              {LIST_EMPLOYEE} - {groupName}
            </Breadcrumb.Item>
          ) : (
            paramsTagId && (
              <Breadcrumb.Item className="breadcb__last">
                ListEmployee {`- ${tagName}`}
              </Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
        <div className="mx-3 ml-auto flex justify-between">
          <div className="d-flex">
            <div className="float-left" style={{ marginBottom: "10px" }}>
              <SearchComponent
                classNames={"ml-auto border-input"}
                width="500px"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div>
            {paramsGroupId || paramsTagId ? (
              <></>
            ) : (
              <>
                <Button
                  onClick={() =>
                    setDataFormImport((pre) => ({
                      ...pre,
                      visible: true,
                    }))
                  }
                  shape="round"
                  className="primary mr-2 pr-5 float-right btn-add"
                  icon={<ImportOutlined />}
                  size="large"
                >
                  {IMPORT_EMPLOYEE}
                </Button>
                <Button
                  onClick={() => history.push(`/profile/${"add"}`)}
                  shape="round"
                  className="primary mr-2 pr-5 float-right btn-add"
                  icon={<PlusOutlined />}
                  size="large"
                >
                  {ADD_EMPLOYEE}
                </Button>
              </>
            )}
          </div>
        </div>
        <TableComponent
          columns={columns}
          register={register}
          defaultOption={{
            data: {
              groupId: paramsGroupId ? paramsGroupId : "",
              tagId: paramsTagId ? paramsTagId : "",
            },
          }}
          apiServices={
            paramsGroupId
              ? getListEmployeeWithGroupInteractor
              : paramsTagId
              ? getListEmployeeWithTagInteractor
              : getListEmployeeInteractor
          }
        />
        {/* <Suspense fallback={<div></div>}>
          {showModal.edit && (
            <EmployeeEdit
              visible={showModal.edit}
              type={showModal.type}
              data={showModal.data}
              closeModal={closeModal}
              onSubmitSuccess={() => register.fetchData()}
            />
          )}
        </Suspense> */}
        <ModalImportFile
          visible={dataFormImport?.visible}
          onCancel={onCancel}
        />
      </div>
    </>
  );
};

export default React.memo(Employee);
