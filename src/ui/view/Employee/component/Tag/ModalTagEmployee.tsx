import EmployeeEntities from "@entities/employee";
import GroupEntities from "@entities/employee/group";
import Tag from "@entities/tag/tag";
import { useAsync } from "@hook/useAsync";
import { useTranslate } from "@hook/useTranslate";
import { tagManager } from "@translateKey/index";
import EmployeeInteractor from "@useCases/employee";
import GroupInteractor from "@useCases/employee/group";
import TagInteractor from "@useCases/tag";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

interface Iprops {
  idEmployee: string;
  visible: boolean;
  type: "edit" | "add" | "";
  data: EmployeeEntities;
  closeModal: (value: "edit" | "add" | "") => void;
  onSubmitSuccess: () => void;
  loadingSubmit?: boolean;
}

const ModalTagEmployee = ({
  visible,
  idEmployee,
  type,
  data,
  closeModal,
  onSubmitSuccess,
}: Iprops) => {
  const [form] = Form.useForm();
  const { getListTagAll } = new TagInteractor();
  const { registerFaceEmployeeInteractor } = new EmployeeInteractor();
  const [asyncGetListTag, asyncAddTagEmployee] = useAsync(
    [getListTagAll],
    [registerFaceEmployeeInteractor]
  );

  useEffect(() => {
    asyncGetListTag.execute();
    if (type == "edit") {
      form.setFieldsValue(data);
    }
  }, []);
  const onFinish = (values) => {
    asyncAddTagEmployee.execute(idEmployee, null, values.listTag).then(() => {
      closeModal("");
      onSubmitSuccess();
    });
  };
  const { ADD_TAG_FOR_EMPLOYEE } = useTranslate(tagManager);
  return (
    <div>
      <Modal
        title={ADD_TAG_FOR_EMPLOYEE}
        closable={true}
        visible={visible}
        onOk={form.submit}
        onCancel={() => closeModal("")}
        className=""
        confirmLoading={asyncAddTagEmployee.status == "loading"}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <div className="flex justify-between">
            <div className="w-full mr-3">
              <div className="flex">
                <Form.Item
                  label="Tag"
                  name="listTag"
                  className="w-full ml-4"
                  rules={[
                    {
                      required: true,
                      message: "Please choose tag!",
                    },
                  ]}
                >
                  <Select mode="multiple">
                    {asyncGetListTag.value?.map((item: Tag, index: number) => (
                      <Select.Option value={item.tagId} key={index}>
                        {item.tagName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default React.memo(ModalTagEmployee);
