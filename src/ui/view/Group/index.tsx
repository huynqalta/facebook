import { Breadcrumb, Button, Space, Table, Tag, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import ButtonAdd from "@components/commons/ButtonAdd";
import ModalAdd from "./ModalAdd";
import { IModal } from "./interface";
import { swalAfter } from "@config/swalPulgin";
import { useGroup } from "./viewModel";
import { useAsync } from "@hook/useAsync";
import { useRecoilState } from "recoil";
import { GroupPaginationStore } from "src/core/store/groupPaginationStore";
import { useHistory } from "react-router";
import ModalImportFile from "./ModalImportCode";
import Search from "src/ui/view/TagManager/Component/Search";
import { useTranslate } from "@hook/useTranslate";
import { common, group } from "@translateKey/index";
import Showing from "@components/commons/Showing";
import IconImage from "@components/commons/iconImage";

const Group = () => {
  // TRANSLATE
  const {
    GROUP_NAME,
    GROUP_CODE,
    IMPORT_EMPLOYEE,
    LIST_EMPLOYEE,
    IMPORT_EMPLOYEE_FAIL,
    GROUP,
  } = useTranslate(group);
  const { HOME, ADD, ACTION, DELETE, EDIT } = useTranslate(common);

  const history = useHistory();
  const [dataFormImport, setDataFormImport] = useState({
    visible: false,
    idGroup: null,
  });
  // JUST API
  const { getList, del } = useGroup();
  const [getListGroup, deleteGroup] = useAsync(getList, del);
  const [data, setData] = useRecoilState(GroupPaginationStore);

  // CALL API
  useEffect(() => {
    getListGroup.execute();
  }, []);
  const handleDelete = useCallback((record, pagi) => {
    swalAfter(`Xóa ${record.groupName} ?`).then((isOk) => {
      if (isOk) {
        deleteGroup.execute(record.groupId, pagi);
      }
    });
  }, []);
  const onCancel = () => {
    setDataFormImport((pre) => ({ ...pre, visible: false }));
  };

  // JUST MODAL
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
  });
  const renderButton = (record) => {
    return (
      <Space size="middle">
        <Button
          className="none__background"
          onClick={() => {
            history.push(`/employee/${"group"}/${record?.groupId}`);
          }}
        >
          {LIST_EMPLOYEE}
        </Button>
        <Tooltip title={EDIT}>
          <a
            aria-disabled={true}
            className="btn-icon"
            onClick={() => {
              setModal({ isVisible: true, dataEdit: record });
            }}
          >
            <IconImage title="edit" />
          </a>
        </Tooltip>
        <Tooltip title={DELETE}>
          <a
            aria-disabled={true}
            className="btn-icon"
            onClick={() => {
              handleDelete(record, data.info);
            }}
          >
            <IconImage title="delete" />
          </a>
        </Tooltip>
      </Space>
    );
  };
  const columns = [
    {
      title: GROUP_NAME,
      dataIndex: "groupName",
    },
    {
      title: GROUP_CODE,
      dataIndex: "groupCode",
    },
    {
      title: ACTION,
      width: 500,
      render: (text, record) => renderButton(record),
    },
  ];
  const handleChange = (pagination) => {
    getListGroup.execute(pagination);
  };

  return (
    <div>
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">{GROUP}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex w-full">
        <div className="flex-auto">
          <Search getList={getListGroup} pagination={GroupPaginationStore} />
        </div>
        <ButtonAdd
          onClick={() => setModal((prev) => ({ ...prev, isVisible: true }))}
          title={`${ADD} ${GROUP}`}
        />
      </div>
      <ModalAdd modal={modal} setModal={setModal} />
      <Table
        columns={columns}
        dataSource={data.data}
        pagination={{
          total: data.info.total,
          current: data.info.current,
          pageSize: data.info.pageSize,
          hideOnSinglePage: true,
        }}
        onChange={handleChange}
        loading={
          getListGroup.status == "loading" || deleteGroup.status == "loading"
        }
      />
      <Showing info={data.info} data={data.data} />
      <ModalImportFile
        idGroup={dataFormImport?.idGroup}
        visible={dataFormImport?.visible}
        onCancel={onCancel}
      />
    </div>
  );
};

export default Group;
