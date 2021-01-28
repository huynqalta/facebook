import { Button, Col, Form, Input, Row, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { TimePicker, DatePicker } from "antd";
import { useTag, useTicket } from "../viewModel";
import { useAsync } from "@hook/useAsync";
import moment from "moment";
import { TicketStore } from "src/core/store/ticket";
import { useRecoilValue } from "recoil";
import DayPickerComponent from "@components/commons/DayPickerComponent";
import useDayPicker from "@components/commons/DayPickerComponent/useDayPicker";
const { option_date } = require("./../constant");
import { convertDateUTC } from "@helper/functions";
import { useTranslate } from "@hook/useTranslate";
import { tagManager } from "@translateKey/index";
import { common } from "@translateKey/index";
const { RangePicker } = DatePicker;

const ModalAddTag = ({ modal, setModal }) => {
  const registerDayPicker = useDayPicker();

  // TRANSLATE
  const {
    TAG_NAME,
    REPEAT_TYPE,
    TICKET_NAME,
    RANGE_DATE,
    RANGE_TAG_TIME,
    TAG_COMMENT,
    TAG_CODE,
  } = useTranslate(tagManager);
  const { EDIT, ADD, CANCEL, SAVE, MUST_TYPE } = useTranslate(common);

  // CALL API
  const { add, edit } = useTag();
  const { getTicket } = useTicket();
  const [ getListTicket, addTag, editTag ] = useAsync(getTicket, add, edit);

  // JUST MODAL
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
  };

  // JUST FORM
  const [ form ] = Form.useForm();

  const onFinish = (value) => {
    if (modal.dataEdit) {
      Object.assign(value, { tagId: modal.dataEdit.tagId });
      editTag
        .execute(value, registerDayPicker, modal.dataEdit.tagId)
        .then(() => {
          setModal({ isVisible: false, dataEdit: null });
          form.resetFields();
        });
    } else {
      addTag.execute(value, registerDayPicker).then(() => {
        setModal({ isVisible: false, dataEdit: null });
        form.resetFields();
      });
    }
  };

  // JUST SELECTED TICKET ID
  const listTicketId = useRecoilValue(TicketStore);

  // TO SET TICKET TO FORM
  useEffect(() => {
    if (modal.isVisible == true) {
      getListTicket.execute();
    }
  }, [ modal.isVisible ]);

  // CHANGE SELECT REPEAT TYPE WILL CHANGE DAY PICKER
  const handleChangeSelect = (event) => {
    switch (event) {
      case null:
      case "None":
      case "Daily": {
        registerDayPicker.disabled();
        break;
      }
      case "Weekly": {
        registerDayPicker.setTypeDayPicker("weekly");
        let addListWeekToForm = modal.dataEdit?.listValue
          ? modal.dataEdit?.listValue
          : [];
        registerDayPicker.setValues(addListWeekToForm);
        break;
      }
      default:
        break;
    }
  };

  //before set value to form, we convert moment correctly
  useEffect(() => {
    if (modal.dataEdit) {
      const timeTag =
        modal.dataEdit.tagTimeStart || modal.dataEdit.tagTimeEnd
          ? [
            moment(modal.dataEdit.tagTimeStart, "HH:mm:ss"),
            moment(modal.dataEdit.tagTimeEnd, "HH:mm:ss"),
          ]
          : "";
      const rangeDate =
        modal.dataEdit.dateStart || modal.dataEdit.dateEnd
          ? [ moment(modal.dataEdit.dateStart), moment(modal.dataEdit.dateEnd) ]
          : "";
      form.setFieldsValue({
        tagName: modal.dataEdit.tagName,
        tagComment: modal.dataEdit.tagComment,
        ticketTypeId: modal.dataEdit.ticketType?.ticketTypeId,
        repeatType: modal.dataEdit.repeatType,
        tagCode: modal.dataEdit.tagCode,
        timeTag,
        rangeDate,
      });
      handleChangeSelect(modal.dataEdit.repeatType);
    }
  }, [ modal.dataEdit ]);

  return (
    <Modal
      title={modal.dataEdit ? `${ EDIT } ${ modal.dataEdit.tagName }` : ADD}
      visible={modal.isVisible}
      onOk={handleOk}
      width={1000}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {CANCEL}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={addTag.status == "loading" || editTag.status == "loading"}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={TAG_NAME}
              name="tagName"
              rules={[ { required: true, message: `${ MUST_TYPE } ${ TAG_NAME }` } ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={TAG_CODE}
              name="tagCode"
              rules={[ { required: true, message: `${ MUST_TYPE } ${ TAG_CODE }` } ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={RANGE_DATE}
              name="rangeDate"
            >
              <RangePicker picker={"date"} className="min-w-full" />
            </Form.Item>
            <Form.Item
              className="w-100"
              label={RANGE_TAG_TIME}
              name="timeTag"
            >
              <RangePicker picker={"time"} className="min-w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={TICKET_NAME}
              name="ticketTypeId"
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {listTicketId.data &&
                  listTicketId.data.map((item, index) => (
                    <Select.Option value={item.ticketTypeId} key={index}>
                      {item.ticketName}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={REPEAT_TYPE}
              name="repeatType"
            >
              <Select onChange={handleChangeSelect}>
                {option_date.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <DayPickerComponent register={registerDayPicker} initType="none" />
            <Form.Item name="tagComment" label={TAG_COMMENT}>
              <Input.TextArea placeholder={TAG_COMMENT} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAddTag;
