import { useAsync } from "@hook/useAsync";
import { useTranslate } from "@hook/useTranslate";
import { common, group } from "@translateKey/index";
import { Button, Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useGroup } from "../viewModel";

const ModalAdd = ({ modal, setModal }) => {
  // JUST API
  const { add, edit } = useGroup();
  const [addGroup, editGroup] = useAsync(add, edit);

  // JUST MODAL
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
  };

  // JUST FORM
  const [form] = Form.useForm();
  const onFinish = (value) => {
    if (modal.dataEdit) {
      const data = {
        groupName: value.groupName,
        groupCode: modal.dataEdit.groupCode,
        groupId: modal.dataEdit.groupId,
      };
      editGroup.execute(data).then(() => {
        setModal({ isVisible: false, dataEdit: null });
        form.resetFields();
      });
    } else {
      const data = {
        groupName: value.groupName,
        groupCode: value.groupCode,
      };
      addGroup.execute(data).then(() => {
        setModal({ isVisible: false, dataEdit: null });
        form.resetFields();
      });
    }
  };

  const onFinishFailed = (errorInfo) => {};

  // give data to form
  useEffect(() => {
    if (modal.dataEdit) {
      form.setFieldsValue({
        groupName: modal.dataEdit.groupName,
        groupCode: modal.dataEdit.groupCode,
      });
    }
  }, [modal.dataEdit]);

  // TRANSLATE
  const { EDIT, ADD, MUST_TYPE, CANCEL, SAVE } = useTranslate(common);
  const { GROUP_NAME, GROUP_CODE } = useTranslate(group);
  return (
    <Modal
      title={modal.dataEdit ? `${EDIT} ${modal.dataEdit.groupName}` : ADD}
      visible={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {CANCEL}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={
            addGroup.status == "loading" || editGroup.status == "loading"
          }
          onClick={handleOk}
        >
          {SAVE}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={GROUP_NAME}
          name="groupName"
          rules={[{ required: true, message: `${MUST_TYPE} ${GROUP_NAME}` }]}
        >
          <Input />
        </Form.Item>
        {!modal.dataEdit && (
          <Form.Item
            label={GROUP_CODE}
            name="groupCode"
            rules={[{ required: true, message: `${MUST_TYPE} ${GROUP_CODE}` }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalAdd;
