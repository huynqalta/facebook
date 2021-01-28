import { useAsync } from "@hook/useAsync";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { ScheduleDetailsPaginationStore } from "src/core/store/scheduleDetails";
import useScheduleDetails from "./viewModel";
import { Table, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ScheduleDetails = () => {
  interface InitBrandId {
    scheduleId: string;
  }
  const scheduleId: InitBrandId = useParams();
  const { getListDetails, remove } = useScheduleDetails();
  const [getListDetailsSchedule, deleteScheduleDetails] = useAsync(
    getListDetails,
    remove
  );
  const { data, info } = useRecoilValue(ScheduleDetailsPaginationStore);
  const { total, current, pageSize } = info;

  useEffect(() => {
    getListDetailsSchedule.execute(scheduleId.scheduleId, info);
  }, []);
  const columns = [
    {
      title: "Tên",
      dataIndex: "keyCode",
      key: "keyCode",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <a className="btn-icon">
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete">
            <a className="btn-icon">
              <DeleteOutlined
                onClick={() =>
                  deleteScheduleDetails.execute(record.scheduleDetailId, info)
                }
              />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ total, current, pageSize }}
      ></Table>
    </div>
  );
};
export default ScheduleDetails;
