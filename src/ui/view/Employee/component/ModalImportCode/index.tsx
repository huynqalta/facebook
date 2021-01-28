import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table, Tag } from "antd";
import { notification } from "antd/es";
import Modal from "antd/lib/modal/Modal";

import "./styles.scss";
import { useAsync } from "@hook/useAsync";
import { useGroup } from "@view/Group/viewModel";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { useTranslate } from "@hook/useTranslate";
import { group } from "@translateKey/index";
// import { employee } from "@translateKey/";

const imgUpload = require("@assets/images/upload-clound-a0824c90.png");

const ModalImportFile = (props) => {
  const {
    IMPORT_EMPLOYEE,
    IMPORT_EMPLOYEE_FAIL,
    CANCEL,
    SUBMIT,
  } = useTranslate(group);
  const [nameFileEmployee, setNameFileEmployee] = useState(null);
  const [dataEmployeeFail, setDataEmployeeFail] = useState(null);
  const { importEmployee } = useGroup();
  const [importEmployeeFromGroup] = useAsync(importEmployee);
  const [form] = Form.useForm();
  const handleChange = (e) => {
    setNameFileEmployee(e.target.files[0]);
  };

  const handleOk = () => {
    form.submit();
  };
  const onFinish = () => {
    let data = new FormData();
    data.append("FileZip", nameFileEmployee);
    importEmployeeFromGroup.execute(data).then((res) => {
      setDataEmployeeFail(
        res.data.data.filter((employee) => employee?.isImportSuccess == false)
      );
      res.data.data.filter((employee) => employee?.isImportSuccess == false) ==
        0 && props.onCancel();
    });
  };

  const handdleCancel = () => {
    setNameFileEmployee(null);
    setDataEmployeeFail(null);
    form.resetFields();
    props.onCancel();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (text, row, index) => index,
    },
    {
      title: "Name",
      dataIndex: "age",
      key: "age",
      render: (text, record) => {
        return record.userLastName + " " + record.userFirstName;
      },
    },
    {
      title: "Error",
      dataIndex: "errorImport",
      key: "errorImport",
      render: (itemError) => {
        return (
          <>
            {itemError.map((error, index) => (
              <>
                <span className="text-red-700">{error}</span>
                {index != itemError.length - 1 && (
                  <span className="mr-2 ml-2 text-black">|</span>
                )}
              </>
            ))}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Modal
          className="upload-file"
          width={750}
          // footer={false}
          okText={SUBMIT}
          cancelText={CANCEL}
          title={
            <div>
              <h3>
                <b>{IMPORT_EMPLOYEE}</b>
              </h3>
              <p className="text-center color-theme">
                {props?.data?.groupCodeName}
              </p>
            </div>
          }
          confirmLoading={importEmployeeFromGroup.status == "loading"}
          maskClosable={false}
          onCancel={handdleCancel}
          onOk={handleOk}
          visible={props.visible}
        >
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              htmlFor="importFile"
              label={<img src={imgUpload} alt="imgUpload" />}
              name="zipEmployee"
            >
              <input
                type="file"
                id="importFile"
                style={{ display: "none" }}
                onChange={handleChange}
                accept=".zip,.rar,.7zip"
              ></input>
            </Form.Item>
            {nameFileEmployee && (
              <p
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "gray",
                  fontSize: "15px",
                }}
              >
                {nameFileEmployee?.name}
              </p>
            )}
            {dataEmployeeFail && (
              <>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                    margin: "15px 0px",
                  }}
                >
                  {IMPORT_EMPLOYEE_FAIL}
                </p>
                <Table columns={columns} dataSource={dataEmployeeFail} />
              </>
            )}
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ModalImportFile;
