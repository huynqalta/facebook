import React, { useEffect } from "react";
import { Form, Modal, Select } from "antd";
import useDetailPage from "./viewModel";
import { useForm } from "antd/lib/form/Form";
import { useTranslate } from "@hook/useTranslate";
import { common, module, page } from "@translateKey/index";

const { Option } = Select;
// const { languageKey } = allKey;
interface Iprops {
  visible: boolean;
  type: "edit" | "add" | "";
  // dataModule: Array<Module>;
  closeModal: (value: "edit" | "add" | "") => void;
  onSubmit: (values: Array<string>) => void;
  loadingSubmit?: boolean;
}

const ModalPageDetail = (props: Iprops) => {
  const { MODULE, ADD_MODULE } = useTranslate(module);
  const { asyncGetListModuleAll } = useDetailPage();
  const [form] = useForm();

  const handleCancelModal = () => {
    props.closeModal("");
  };

  useEffect(() => {
    asyncGetListModuleAll.execute();
  }, []);

  return (
    <>
      <Modal
        visible={props.visible}
        title={ADD_MODULE}
        closable={true}
        onCancel={handleCancelModal}
        onOk={form.submit}
        confirmLoading={props.loadingSubmit}
      >
        <Form
          name="basic"
          form={form}
          onFinish={(values: Array<string>) => props.onSubmit(values)}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={MODULE}
            name="listModule"
            rules={[{ required: true, message: "Please choose modules!" }]}
          >
            <Select showSearch placeholder="Select modules" mode="multiple">
              {asyncGetListModuleAll.value?.listModuleTitle.map((item) => (
                <Option value={item.moduleId}>{item.moduleName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalPageDetail);
