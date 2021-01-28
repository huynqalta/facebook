import {
  Breadcrumb,
  Button,
  Pagination,
  Radio,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
const { TabPane } = Tabs;

import React, { useCallback, useEffect, useState } from "react";
import { tagName } from "./constant";
import { RightOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonAdd from "@components/commons/ButtonAdd";
import ModalAddTag from "./Component/ModalAddTag";
import { IModal } from "./interface";
import { useTag } from "./viewModel";
import { useAsync } from "@hook/useAsync";
import { useRecoilState, useRecoilValue } from "recoil";
import { TagPaginationStore } from "src/core/store/tag";
import moment from "moment";
import { useTranslate } from "@hook/useTranslate";
import { common, employee, group, tagManager } from "@translateKey/index";
import { swalAfter } from "@config/swalPulgin";
import Search from "./Component/Search";
import { useHistory } from "react-router";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Showing from "@components/commons/Showing";
import IconImage from "@components/commons/iconImage";

const TagManager = () => {
  // JUST API
  const { getList, del } = useTag();
  const [ getListTag, deleteTag ] = useAsync(getList, del);
  const [ data, setData ] = useRecoilState(TagPaginationStore);
  const history = useHistory();

  useEffect(() => {
    getListTag.execute(data.info);
  }, []);

  // JUST MODAL
  const [ modal, setModal ] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
  });

  // TRANSLATE
  const {
    TAG_NAME,
    TAG_TIME_START,
    TAG_TIME_END,
    TAG_CODE,
    ADD_TAG,
    TICKET_NAME,
    REPEAT_TYPE,
    TAG_MANAGER,
  } = useTranslate(tagManager);
  const { DELETE, EDIT, HOME, ACTION } = useTranslate(common);
  const { LIST_EMPLOYEE } = useTranslate(employee);

  // JUST TABLE
  const handleDeleteTag = useCallback((record, pagination) => {
    swalAfter(`${ DELETE } ${ record.tagName } ?`).then((isOk) => {
      if (isOk) {
        deleteTag.execute(record.tagId, pagination);
      }
    });
  }, []);
  const columns = [
    {
      title: TAG_NAME,
      dataIndex: tagName,
    },
    {
      title: TAG_CODE,
      dataIndex: "tagCode",
    },
    {
      title: TICKET_NAME,
      dataIndex: "ticketType",
      render: (text, record) => record?.ticketType?.ticketName,
    },
    {
      title: REPEAT_TYPE,
      dataIndex: "repeatType",
    },
    {
      title: TAG_TIME_START,
      dataIndex: "tagTimeStart",
      render: (text, record) =>
        text ? `${ moment(record.dateStart).format("DD/MM/YYYY") } ${ text }` : "",
    },
    {
      title: TAG_TIME_END,
      dataIndex: "tagTimeEnd",
      render: (text, record) =>
        text ? `${ moment(record.dateEnd).format("DD/MM/YYYY") } ${ text }` : "",
    },
    {
      title: ACTION,
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="none__background"
            onClick={() => history.push(`/employee/${ "tag" }/${ record?.tagId }`)}
          >
            {LIST_EMPLOYEE}
          </Button>
          <Tooltip title={EDIT}>
            <a
              className="btn-icon"
              onClick={() => setModal({ isVisible: true, dataEdit: record })}
            >
              <IconImage title="edit" />
              {/* <EditOutlined /> */}
            </a>
          </Tooltip>
          <Tooltip title={DELETE}>
            <a
              className="btn-icon"
              onClick={() => {
                handleDeleteTag(record, data.info);
              }}
            >
              <IconImage title="delete" />
              {/* <DeleteOutlined /> */}
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const handleChange = (pagination) => {
    getListTag.execute(pagination).then(() => {
      setData((prev) => ({
        ...prev,
        info: {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        },
      }));
    });
  };
  return (
    <div>
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">
          {TAG_MANAGER}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* <Tabs defaultActiveKey="1" className="tabs-large">
        <TabPane tab="hello" key="1">
          <p>Hello world</p>
        </TabPane>
        <TabPane tab="hi" key="2">
        <p>Hello hoa</p>
        </TabPane>
      </Tabs> */}
      {/* <Checkbox >Checkbox</Checkbox> */}

      <div className="flex">
        <div className="flex-auto">
          <Search getList={getListTag} pagination={TagPaginationStore} />
        </div>
        <ButtonAdd
          onClick={() => setModal((prev) => ({ ...prev, isVisible: true }))}
          title={ADD_TAG}
          className="mb-3"
        />
      </div>
      <ModalAddTag modal={modal} setModal={setModal} />
      <Table
        columns={columns}
        dataSource={data.data}
        loading={
          getListTag.status == "loading" || deleteTag.status == "loading"
        }
        pagination={{ total: data.info.total, current: data.info.current, pageSize: data.info.pageSize, hideOnSinglePage: true }}
        onChange={handleChange}
      />
      <Showing info={data.info} data={data.data} />
    </div>
  );
};

export default TagManager;
