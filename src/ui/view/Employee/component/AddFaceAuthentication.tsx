import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const AddFaceAuthentication = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [url, setUrl] = useState("");
  const [isTextNotif, setIsTextNotif] = useState("");

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    onCancel();
  };

  const onFinishFailed = () => {
    onCancel();
  };

  const onFinish = (values) => {};

  const handleChange = (e) => {
    let data = new FormData();
    data.append("mediaFiles", e.target.files[0]);
    const file = document.getElementById("file");
    const fileSize = file?.files[0].size / 1024;
    if (fileSize > 1000) {
      setIsTextNotif("file lớn hơn 1MB");
      setUrl("");
    } else {
      setUrl(window.URL.createObjectURL(file?.files[0]));
      setIsTextNotif("");
    }
  };

  return (
    <div>
      <Modal
        title={null}
        closable={true}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="w-1/4"
        // confirmLoading={
        //   props.type == "add"
        //     ? addSchedule.status == "loading"
        //     : editSchedule.status == "loading"
        // }
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex justify-between">
            <div className="w-full mr-3">
              <Form.Item
                label={<p>huy</p>}
                name="employeeFaceId"
                htmlFor="file"
                rules={[
                  {
                    required: true,
                    message: "Please select your image!",
                  },
                ]}
              >
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
        {isTextNotif && <p>{isTextNotif}</p>}
        {url && <img src={url} alt="img" />}
      </Modal>
    </div>
  );
};

export default AddFaceAuthentication;
