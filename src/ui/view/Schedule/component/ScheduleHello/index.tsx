import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, Button, Tooltip, Input } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalAddNewSchedule from "@view/Schedule/Modal/ModalAddNewSchedule";
import { useRecoilValue } from "recoil";
import { SchedulePaginationStore } from "src/core/store/schedule";
import { useAsync } from "@hook/useAsync";
import useSchedule from "@view/Schedule/viewModel";
import { useHistory } from "react-router";
import ButtonAdd from "@components/commons/ButtonAdd";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { debounce } from "@helper/functions";

import { swalAfter } from "@config/swalPulgin";
const ScheduleHello = (props) => {
  const history = useHistory();
  const { getList,
    remove,
    showEditSchedule,
    setShowEditSchedule } = useSchedule();
  const [ getListSchedule, deleteSchedule ] = useAsync([ getList, { showSuccess: true } ], [ remove, { showSuccess: true, showError: true } ]);
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
      sorter: (a, b) => a.scheduleName.length - b.scheduleName.length,
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
      title: "Danh sách key",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="none__background"
            onClick={() =>
              history.push(`/scheduleDetails/${ record.scheduleId }`)
            }
          >
            Danh sách key
              </Button>
        </Space>
      ),
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
                onClick={() => removeSchedule(record)}
              />
            </a>
          </Tooltip>
        </Space >
      ),
    },
  ];
  const removeSchedule = useCallback(
    (record) => {
      swalAfter(`${ "Xóa" } ${ record.scheduleName }`).then((isOkie) => {
        if (isOkie) {
          deleteSchedule.execute(record, info)
        }
      });
    },
    []
  );
  const showModal = () => {
    setShowEditSchedule({ edit: true, type: "add", scheduleType: "1" })
  };
  const handleOnChange = (pagiantion) => {
    getListSchedule.execute(props.scheduleType, pagiantion);
  }
  const EditSchedule = (data?: any) => {
    setShowEditSchedule({ edit: true, data: data, type: "edit" })
  }
  const CloseModalEdit = (type: "" | "add" | "edit") => {
    setShowEditSchedule({ edit: false, data: {}, type: type });
  }
  // const handleSearch = debounce(function (value) {
  //   console.log(value,"valuevalue");

  //   register.fetchData({
  //     option: { search: value.trim() },
  //     pagination: { current: 1 },
  //   });
  // }, 1000);

  const handleSearch = debounce(function (value) {
    getListSchedule.execute(props.scheduleType, {
      ...info,
      current: 1
    }, value);
  }, 1000);
  return (
    <div className="style_table_hd_bank">
      <ButtonAdd onClick={showModal} title="Thêm bộss" className="mb-3 float-right" />
      {showEditSchedule.edit && (
        <ModalAddNewSchedule
          visible={showEditSchedule.edit}
          data={showEditSchedule.data}
          scheduleType={showEditSchedule.scheduleType}
          type={showEditSchedule.type}
          closeModal={CloseModalEdit}
        />)}
      <div className="d-flex">
        <div className="float-left">
          <SearchComponent
            onChange={handleSearch}
            classNames={"ml-auto border-input"}
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

export default ScheduleHello;
