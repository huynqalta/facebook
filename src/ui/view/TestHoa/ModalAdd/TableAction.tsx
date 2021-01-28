import { Space, Tooltip } from "antd";
import React, { useCallback } from "react";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { ModalStore} from "../interface";
import { useTranslate } from "src/shared/functions";
import { swalAfter } from "@config/swalPulgin";
import { common } from "@translateKey/index";

const TableAction = ({ record }) => {
  const setModal = useSetRecoilState(ModalStore);

  const { DELETE, ACTION, EDIT, DETAIL } = useTranslate(common);
  // JUST DELETE API
  const handleDelete = useCallback((record) => {
    swalAfter(`${DELETE} ${record.tagName} ?`).then((isOk) => {
      if (isOk) {
        // chỗ này gọi api là ok
      }
    });
  }, []);
  return (
    <Space size="middle">
      <Tooltip title={DETAIL}>
        <a className="btn-icon">
          <InfoCircleOutlined />
        </a>
      </Tooltip>
      <Tooltip title={EDIT}>
        <a
          className="btn-icon"
          onClick={() => setModal({ isVisible: true, dataEdit: record })}
        >
          <EditOutlined />
        </a>
      </Tooltip>
      <Tooltip title={DELETE}>
        <a
          className="btn-icon"
          onClick={() => {
            handleDelete(record);
          }}
        >
          <DeleteOutlined />
        </a>
      </Tooltip>
    </Space>
  );
};

export default TableAction;
