import React, { useEffect, useState } from "react"
import {
  Table,
  Space,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonAdd from "@components/commons/ButtonAdd";
import { useRecoilValue } from "recoil";
import { SchedulePaginationStore } from "src/core/store/schedule";
import { useAsync } from "@hook/useAsync";
import useSchedule from "@view/Schedule/viewModel";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { debounce } from "@helper/functions";
import ModalAddNewSchedule from "@view/Schedule/Modal/ModalAddNewSchedule";
const ScheduleWeather = (props) => {
  const { getList, remove, showEditSchedule,
    setShowEditSchedule } = useSchedule();
  const [ getListSchedule, deleteSchedule ] = useAsync(getList, remove);
  const { data, info } = useRecoilValue(SchedulePaginationStore);
  const { total, current, pageSize } = info;
  useEffect(() => {
    getListSchedule.execute(props.scheduleType, info);
  }, [ props.scheduleType ]);
  const columns = [
    {
      title: "Tên",
      dataIndex: "scheduleName",
      key: "scheduleName",
    },
    {
      title: "Ngày tạo",
      key: "scheduleDateStart",
      render: (text, record) => {
        // var pattern = /^(\d{1,2})\-(\d{1,2})\-(\d{4}) (\d{1,2})\:(\d{1,2})\:(\d{1,2})$/;
        // var arr = record.scheduleDateStart.match(pattern);
        // var dt = new Date(`${ arr[ 3 ] }-${ arr[ 2 ] }-${ arr[ 1 ] } ${ arr[ 4 ] }:${ arr[ 5 ] }:${ arr[ 6 ] } GMT-0000`);
        // var test2 = dateFormat(dt, 'd-m-yyyy HH:MM:ss');
        return (
          <Space size="middle">
            <span>{record.scheduleDateStart}</span>
          </Space>
        );
      },
    },
    ,
    {
      title: "Ngày kết thúc",
      dataIndex: "scheduleDateEnd",
      key: "scheduleDateEnd",
    },
    ,
    {
      title: "Giờ tạo",
      dataIndex: "scheduleTimeStart",
      key: "scheduleTimeStart",
    },
    ,
    {
      title: "Giờ kết thúc",
      dataIndex: "scheduleTimeEnd",
      key: "scheduleTimeEnd",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        < Space size="middle" >
          <Tooltip title="Edit">
            <a className="btn-icon">
              <EditOutlined onClick={() => { EditSchedule(record) }} />
            </a>
          </Tooltip>
          <Tooltip title="Delete">
            <a className="btn-icon">
              <DeleteOutlined
                onClick={() => deleteSchedule.execute(record, info)
                }
              />
            </a>
          </Tooltip>
        </Space >
      ),
    },
  ];
  const handleOnChange = (pagiantion) => {
    getListSchedule.execute(props.scheduleType, pagiantion);
  }
  const handleSearch = debounce(function (value) {
    getListSchedule.execute(props.scheduleType, {
      ...info,
      current: 1
    }, value);
  }, 1000);
  const EditSchedule = (data?: any) => {
    setShowEditSchedule({ edit: true, data: data, type: "edit" })
  }
  const CloseModalEdit = (type: "" | "add" | "edit") => {
    setShowEditSchedule({ edit: false, data: {}, type: type });
  }
  const showModal=()=>{
    setShowEditSchedule({edit:true,type:"add",scheduleType:2})
  }
  return (
    <div className="style_table_hd_bank">
      <ButtonAdd onClick={showModal} title="thêm bộ" className="mb-3 float-right" />
      {showEditSchedule.edit && (
        <ModalAddNewSchedule
          visible={showEditSchedule.edit}
          data={showEditSchedule.data}
          type={showEditSchedule.type}
          scheduleType={showEditSchedule.scheduleType}
          closeModal={CloseModalEdit}
        />)}
      <div className="d-flex ">
        <div className="float-left">
          <SearchComponent
            onChange={handleSearch}
            classNames={"ml-auto border-input mb-3"}
            width="500px"
          />
        </div>
      </div>
      <div>
        <Table
          loading={getListSchedule.status == "loading"}
          columns={columns}
          dataSource={data}
          onChange={handleOnChange}
          pagination={{ total, current, pageSize }}
          rowKey={(record) => record.uid}
        />
      </div>
    </div>
  )
}

export default ScheduleWeather