import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import PremisionsInterrator from "@useCases/premisions";
import { useAsync } from "@hook/useAsync";
import useUserSystem from "../viewModel";
import { useRecoilValue } from "recoil";
import { UserSystemPaginationStore } from "src/core/store/userSystem/userSystem";
import UserSystem from "@entities/userSystem/index";
import { usersystem } from "@translateKey/index";
import { useTranslate } from "@hook/useTranslate";
const { Option } = Select;
interface Iprops {
  visible: boolean;
  type: "" | "add" | "edit";
  data: UserSystem;
  loadingSubmit?: boolean;
  closeModal: (value: "edit" | "add" | "") => void;
}
const ModalAddNewUserSystem = (props: Iprops) => {
  const {
    Name,
    Edit,
    Please_input_your_Email,
    Please_input_your_username,
    Home,
    TAG_CODE,
    add_User,
    userEmail,
    REPEAT_TYPE,
    TAG_MANAGER,
  } = useTranslate(usersystem);
  const { getListPremisions } = new PremisionsInterrator();
  const [listPremisions] = useAsync([
    getListPremisions,
    { showSuccess: false, showError: false },
  ]);
  const [form] = Form.useForm();
  const { add, edit } = useUserSystem();
  const [addUser, editUser] = useAsync(add, edit);
  const { info } = useRecoilValue(UserSystemPaginationStore);
  useEffect(() => {
    listPremisions.execute();
  }, []);
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.closeModal("");
    form.resetFields();
  };

  useEffect(() => {
    if (props.type == "edit") {
      form.setFieldsValue({
        ...props.data,
      });
    }
  }, []);
  const onFinish = (value) => {
    if (props.type == "add") {
      addUser.execute(value, info).then((res) => {
        props.closeModal("");
      });
    } else {
      editUser.execute(value, props.data.userCMSId, info).then((res) => {
        props.closeModal("");
      });
    }
  };
  const onFinishFailed = () => {};

  return (
    <Modal
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={
        props.type == "add" ? (
          add_User
        ) : (
          <>
            {Edit} {props?.data && props?.data.userName}
          </>
        )
      }
      confirmLoading={
        props.type == "add"
          ? addUser.status == "loading"
          : editUser.status == "loading"
      }
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={Name}
          name="userName"
          rules={[
            {
              required: true,
              message: Please_input_your_username,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userEmail"
          label={userEmail}
          rules={[
            { type: "email" },
            {
              required: true,
              message: Please_input_your_Email,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddNewUserSystem;
