import React, { useEffect, useState } from "react";
import {
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import useDayPicker from "@components/commons/DayPickerComponent/useDayPicker";
import DayPickerComponent from "@components/commons/DayPickerComponent";
import { useAsync } from "@hook/useAsync";
import { useRecoilValue } from "recoil";
import { SchedulePaginationStore } from "src/core/store/schedule";
import useSchedule from "../../viewModel";
import KeyInterator from "@useCases/key";
import Schedule from "@entities/schedule";
const { Option } = Select;
const { RangePicker: RangerDatePicker } = DatePicker;
const { RangePicker: RangerTimePicker } = TimePicker;
const option_date = [
  {
    key: 0,
    value: "none",
  },
  {
    key: 1,
    value: "norepeat",
  },
  {
    key: 2,
    value: "weekly",
  },
  {
    key: 3,
    value: "monthly",
  },
  {
    key: 4,
    value: "yearly",
  },
];
const dateFormat = require("dateformat");
interface Iprops {
  visible: boolean;
  type: "edit" | "add" | "";
  data: Schedule;
  loadingSubmit?: boolean;
  closeModal: (value: "edit" | "add" | "") => void;
  scheduleType: 1 | 2 | "";
}
const { TextArea } = Input;

const ModalAddNewSchedule = (props: Iprops) => {
  const [listAddKey, setListAddKey] = useState({ listkey: [] });
  const [form] = Form.useForm();
  const registerDayPicker = useDayPicker();
  const { add, edit } = useSchedule();
  const [addSchedule, editSchedule] = useAsync(
    [add, { showError: true }],
    edit
  );
  const { info } = useRecoilValue(SchedulePaginationStore);
  const { getListKey } = new KeyInterator();

  const [listkey] = useAsync(getListKey);

  useEffect(() => {
    listkey.execute({
      limit: 10,
      page: -1,
    });
  }, []);
  const handleOk = () => {
    form.submit();
  };
  const param = {
    FormDate: "",
    ToDate: "",
    FormTime: "",
    ToTime: "",
  };
  const handleChangeDatePicker = (value1, value2) => {
    param["FormDate"] = `${value2[0]} 00:00:00`;
    param["ToDate"] = `${value2[1]} 00:00:00`;
    const pattern = /^(\d{4})\-(\d{1,2})\-(\d{1,2}) (\d{1,2})\:(\d{1,2})\:(\d{1,2})$/;
    var arrDateStart = param["FormDate"].match(pattern);
    var dstart = new Date(
      `${arrDateStart[1]}-${arrDateStart[2]}-${arrDateStart[3]} GMT+1400`
    );
    const DateStart = dateFormat(dstart, "yyyy-m-d HH:MM:ss");
    param["FormDate"] = DateStart;

    var arrDateEnd = param["ToDate"].match(pattern);
    var dEnd = new Date(
      `${arrDateEnd[1]}-${arrDateEnd[2]}-${arrDateEnd[3]} GMT+1400`
    );
    const DateEnd = dateFormat(dEnd, "yyyy-m-d HH:MM:ss");
    param["FormDate"] = DateEnd;
  };
  const handleChangeTimePicker = (value1, value2) => {
    param["FormTime"] = value2[0];
    param["ToTime"] = value2[1];
  };

  const handleCancel = () => {
    props.closeModal("");
    form.resetFields();
  };
  useEffect(() => {
    if (props.type == "edit") {
      const repeatType = props.data.repeatType;

      form.setFieldsValue({
        ...props.data,
        keyvalue: props.data.keyCode.map((item) => item.keyCode),
      });
      registerDayPicker.setTypeDayPicker(repeatType);
      registerDayPicker.setValues(props.data.scheduleValues);
    }
  }, []);
  const onFinish = (values) => {
    if (props.type == "add") {
      let newrepeatType = new Schedule().convertRepeatType(values.repeatType);

      addSchedule
        .execute(
          {
            scheduleName: values.scheduleName,
            scheduleDescription: values.scheduleDescription,
            scheduleDateStart: param.FormDate,
            scheduleDateEnd: param.ToDate,
            scheduleTimeStart: param.FormTime,
            scheduleTimeEnd: param.ToTime,
            scheduleValues: registerDayPicker.getValues().values,
            scheduleType: props.scheduleType,
            repeatType: newrepeatType,
            keyCode: listAddKey.listkey,
            schedulePriority: values.schedulePriority,
          },
          info
        )
        .then((res) => {
          props.closeModal("");
        });
    } else {
      let newrepeatTypeedit = new Schedule().convertRepeatType(
        values.repeatType
      );
      let scheduleType = new Schedule().convertScheduleType(
        values.scheduleType
      );
      editSchedule
        .execute(
          {
            scheduleName: values.scheduleName,
            scheduleDescription: values.scheduleDescription,
            scheduleDateStart: param.FormDate,
            scheduleDateEnd: param.ToDate,
            scheduleTimeStart: param.FormTime,
            scheduleTimeEnd: param.ToTime,
            scheduleValues: registerDayPicker.getValues().values,
            scheduleType: scheduleType,
            repeatType: newrepeatTypeedit,
            keyCode: listAddKey.listkey,
            schedulePriority: values.schedulePriority,
          },
          props.data.scheduleId,
          info
        )
        .then((res) => {
          props.closeModal("");
        });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  const handleChange = (value) => {
    value === "none" || value === "norepeat"
      ? registerDayPicker.disabled()
      : registerDayPicker.setTypeDayPicker(value);
  };
  const handerChangeListKey = (value) => {
    setListAddKey({ ...listAddKey, listkey: value });
  };

  return (
    <div>
      <Modal
        title={
          props.type == "add" ? (
            "Thêm bộ"
          ) : (
            <>Sửa-{props.data && props.data.scheduleName}</>
          )
        }
        closable={true}
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="w-1/2"
        confirmLoading={
          props.type == "add"
            ? addSchedule.status == "loading"
            : editSchedule.status == "loading"
        }
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex justify-between">
            <div className="w-1/2 mr-3">
              <Form.Item
                label="Name"
                name="scheduleName"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="scheduleDescription">
                <Input.TextArea value={"scheduleDescription"} />
              </Form.Item>
              <Form.Item
                label="Lặp lại theo lịch"
                name="repeatType"
                initialValue={option_date[0].value}
              >
                <Select onChange={handleChange}>
                  {option_date.map((item, index) => {
                    return (
                      <Option value={item.value} key={index}>
                        {item.value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Danh sach key"
                initialValue={[]}
                name="keyvalue"
              >
                <Select
                  mode="multiple"
                  placeholder="Please select"
                  style={{ width: "100%" }}
                  onChange={handerChangeListKey}
                >
                  {listkey.value?.data.map((item) => {
                    return (
                      <Option
                        key={item.parameterName}
                        value={item.parameterName}
                      >
                        {item.parameterName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Độ ưu tiên"
                name="schedulePriority"
                initialValue={1}
              >
                <InputNumber min={1} max={21} />
              </Form.Item>
              <Form.Item
                label="Ngày bắt đầu và ngày kết thúc"
                name="test1"
                rules={[
                  {
                    required: true,
                    message: "Please insert datetime!",
                  },
                ]}
              >
                <RangerDatePicker />
              </Form.Item>
              <Form.Item
                label="Giờ bắt đầu giờ kết thúc"
                name="test2"
                rules={[
                  {
                    required: true,
                    message: "Please insert time!",
                  },
                ]}
              >
                <RangerTimePicker onChange={handleChangeTimePicker} />
              </Form.Item>
            </div>
            <div className=" w-2/4">
              <DayPickerComponent register={registerDayPicker} />
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default React.memo(ModalAddNewSchedule);
