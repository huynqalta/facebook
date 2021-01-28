import DayPickerComponent from "@components/commons/DayPickerComponent";
import useDayPicker from "@components/commons/DayPickerComponent/useDayPicker";
import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { option_date, option_data, IModal, ModalStore } from "../interface";
import FormSelect from "./FormSelect";
const ModalAdd = () => {
  const registerDayPicker = useDayPicker();

  // TRANSLATE
  const { CANCEL, SAVE, EDIT, ADD, MUST_TYPE } = useTranslate(common);

  // JUST MODAL
  const [modal, setModal] = useRecoilState<IModal>(ModalStore);
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
      //sau đó gửi form data nếu thành công thì mới làm việc dưới đây
    } else {
      //sau đó gửi form data nếu thành công thì mới làm việc dưới đây
    }
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
  };
  const [listDate, setListDate] = useState({
    weekly: null,
    monthly: null,
    yearly: null,
  });
  // set data to form
  useEffect(() => {
    if (modal.dataEdit) {
      form.setFieldsValue({
        gender: modal.dataEdit.gender,
        group: modal.dataEdit.group,
        tagName: modal.dataEdit.tagName,
        repeatType: modal.dataEdit?.repeatType,
      });
      let dateValue: string = option_date[modal.dataEdit?.repeatType].value
        .toString()
        .toLowerCase();
      registerDayPicker.setTypeDayPicker(dateValue);
      registerDayPicker.setValues(modal.dataEdit?.listValue);
      handleSetDate(modal.dataEdit?.repeatType, modal.dataEdit?.listValue);
    }
  }, [modal.dataEdit]);
  // DATE PICKER
  const handleSetDate = (repeatType, listValue) => {
    switch (repeatType) {
      case null:
      case 0:
      case 1: {
        break;
      }
      case 2: {
        setListDate((prev) => ({
          ...prev,
          weekly: listValue,
        }));
        break;
      }
      case 3: {
        setListDate((prev) => ({
          ...prev,
          monthly: listValue,
        }));
        break;
      }
      case 4: {
        setListDate((prev) => ({
          ...prev,
          yearly: listValue,
        }));
        break;
      }
      default:
        break;
    }
  };
  // DATE PICKER
  const handleChangeSelect = (event) => {
    switch (event) {
      case null:
      case 0:
      case 1: {
        registerDayPicker.disabled();
        break;
      }
      case 2: {
        registerDayPicker.setTypeDayPicker("weekly");
        break;
      }
      case 3: {
        registerDayPicker.setTypeDayPicker("monthly");
        break;
      }
      case 4: {
        registerDayPicker.setTypeDayPicker("yearly");
        break;
      }
      default:
        break;
    }
  };

  return (
    <Modal
      title={modal.dataEdit ? `${EDIT} ${modal.dataEdit.tagName}` : ADD}
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
          // loading={addTag.status == "loading" || editTag.status == "loading"}
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
      >
        <Form.Item
          label="Tag name"
          name="tagName"
          rules={[{ required: true, message: "Please input tag name!" }]}
        >
          <Input />
        </Form.Item>
        <FormSelect formName="gender" dataMap={option_data} />
        <Form.Item
          name="repeatType"
          label="repeat type"
          rules={[{ required: true, message: `${MUST_TYPE} repeat type` }]}
        >
          <Select placeholder="Select" allowClear onChange={handleChangeSelect}>
            {option_date.map((item) => (
              <Select.Option value={item.key} key={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <DayPickerComponent register={registerDayPicker} initType="none" />
        <Form.Item name="group" label="group">
          <Input.TextArea placeholder="Leave a comment" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
