import EmployeeEntities from "@entities/employee";
import GroupEntities from "@entities/employee/group";
import { useAsync, useSingleAsync } from "@hook/useAsync";
import { useTranslate } from "@hook/useTranslate";
import { employee } from "@translateKey/index";
import EmployeeInteractor from "@useCases/employee";
import GroupInteractor from "@useCases/employee/group";
import TagInteractor from "@useCases/tag";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import TagEntities from "@entities/tag/tag";
import "./styles.scss";
import UploadMediaComponent from "@components/commons/UploadMediaComponent";
import UploadMultiMediaComponent from "@components/commons/UploadMultiMediaComponent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ImageStore } from "src/core/store/imageUser";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";

interface Iprops {
  idEmployee: string;
}

const EmployeeEdit = () => {
  //declared
  const [form] = Form.useForm();
  const history = useHistory();
  const [arrImageEmployee, setArrImageEmployee] = useState([]);
  //atom
  //params
  const { idEmployee, type } = useParams();
  //api
  const { getListGroupInteractor } = new GroupInteractor();
  const { actionEmployeeInteractor } = new EmployeeInteractor();
  const { getListTagAll } = new TagInteractor();
  const [asyncGetListTag] = useAsync(getListTagAll);
  const [asyncGetListGroup, asyncActionEmployee] = useAsync(
    [getListGroupInteractor],
    [actionEmployeeInteractor]
  );
  const { getProfileEmployeeInteractor } = new EmployeeInteractor();
  const asyncGetProfile = useSingleAsync<EmployeeEntities>(
    getProfileEmployeeInteractor
  );
  const setStateUploadImage = useSetRecoilState(UploadImageStore);
  const { dataShowInModal } = useRecoilValue(UploadImageStore);
  const dataForSend = dataShowInModal.filter(
    (item) => item?.binaryFile != undefined
  );
  const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE,
    ADDRESS,
    GENDER,
    GROUP_NAME,
    MALE,
    CANCEL,
    SAVE,
    FEMALE,
    PLEASE_INPUT,
    CORRECT,
    PLEASE_CHOOSE,
    MODE,
    TAG,
    FACE,
  } = useTranslate(employee);

  useEffect(() => {
    asyncGetListGroup.execute();
    asyncGetListTag.execute();
  }, []);

  console.log(dataShowInModal);

  useEffect(() => {
    if (type == "detail") {
      asyncGetProfile.execute(idEmployee).then((res) => {
        setArrImageEmployee(res?.userImages);
      });
    } else {
      if (type == "edit") {
        asyncGetProfile.execute(idEmployee).then((res) => {
          form.setFieldsValue(res);
          setArrImageEmployee(res?.userImages);
          setStateUploadImage((pre) => ({
            ...pre,
            dataShowInModal: res?.userObjectImages.map((item) => ({
              url: item?.userModeImage,
              idImage: item?.userModeKeyCode,
              idUser: item?.userId,
            })),
            imageServer: res?.userObjectImages.map((item) => ({
              url: item?.userModeImage,
              idImage: item?.userModeKeyCode,
              idUser: item?.userId,
            })),
            visible: false,
            TagEmployee: res?.TagIdsParse,
          }));
        });
      }
    }
  }, [type, idEmployee]);

  const onFinish = (values: EmployeeEntities) => {
    let data = new FormData();
    values.userFirstName && data.append("UserFirstName", values.userFirstName);
    values.userLastName && data.append("UserLastName", values.userLastName);
    values.userPhone && data.append("UserPhone", values.userPhone);
    values.userEmail && data.append("UserEmail", values.userEmail);
    values.userAddress && data.append("UserAddress", values.userAddress);
    values.userGender &&
      data.append("UserGender", values.userGender == "Male" ? 0 : 1);
    data.append("GroupId", values.groupId);
    dataForSend?.length && data.append("ModeId", "Face_ID");
    dataForSend?.length > 0 &&
      dataForSend?.map((x) => data.append("UserImages", x.binaryFile));
    values.userTagIdsParse.length > 0
      ? values.userTagIdsParse?.map((x) => data.append("TagIdsParse", x))
      : data.append("TagIdsParse", "");
    asyncActionEmployee.execute(data, idEmployee).then((res) => {
      history.push(`/profile/${"detail"}/${res?.userId}`);
    });
  };

  const handleReset = () => {};

  const isPhoneNumber = (value) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value);
  };

  const classFormItem = type == "add" ? "w-2/4 mt-4 mr-6" : "w-2/4 mr-4";
  const classFormItemRight = type == "add" ? "w-2/4 mt-4" : "w-2/4";

  return (
    <div>
      <Form
        name="basic"
        className="formEmployee"
        form={form}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <div className="flex justify-between">
          <div className="w-full mr-3">
            <div className="flex">
              <div className={type == "add" ? "w-2/3" : "w-full"}>
                <div className="flex">
                  <Form.Item
                    label={FIRST_NAME}
                    name="userFirstName"
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_INPUT} ${FIRST_NAME}`,
                      },
                    ]}
                    className={classFormItem}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={LAST_NAME}
                    name="userLastName"
                    rules={[
                      {
                        required: true,
                        message: `${LAST_NAME} ${PLEASE_INPUT} `,
                      },
                    ]}
                    className={classFormItemRight}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="flex">
                  <Form.Item
                    label={EMAIL}
                    name="userEmail"
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_INPUT} ${EMAIL}`,
                      },
                      {
                        type: "email",
                        message: `${PLEASE_INPUT} ${CORRECT} ${EMAIL}`,
                      },
                    ]}
                    className={classFormItem}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={PHONE}
                    name="userPhone"
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_INPUT} ${PHONE}`,
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || isPhoneNumber(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            `${PLEASE_INPUT} ${CORRECT} ${PHONE}`
                          );
                        },
                      }),
                    ]}
                    className={classFormItemRight}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="flex">
                  <Form.Item
                    label={ADDRESS}
                    name="userAddress"
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_INPUT} ${ADDRESS}`,
                      },
                    ]}
                    className={classFormItem}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={GENDER}
                    name="userGender"
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_CHOOSE} ${GENDER}`,
                      },
                    ]}
                    className={classFormItemRight}
                  >
                    <Select>
                      {/* <Select.Option value="SelectGender">Male</Select.Option> */}
                      <Select.Option value="Male">{MALE}</Select.Option>
                      <Select.Option value="Female">{FEMALE}</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex">
                  <Form.Item
                    label={GROUP_NAME}
                    name="groupId"
                    className={classFormItem}
                    rules={[
                      {
                        required: true,
                        message: `${PLEASE_CHOOSE} ${GROUP_NAME}`,
                      },
                    ]}
                  >
                    <Select>
                      {asyncGetListGroup.value?.map(
                        (item: GroupEntities, index: number) => (
                          <Select.Option value={item.groupId} key={index}>
                            {item.groupName}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={TAG}
                    name="userTagIdsParse"
                    className={classFormItemRight}
                    rules={[
                      {
                        required: true,
                        message: "Please choose tag!",
                      },
                    ]}
                  >
                    <Select mode="multiple">
                      {asyncGetListTag.value?.map(
                        (item: TagEntities, index: number) => (
                          <Select.Option value={item.tagId} key={index}>
                            {item.tagName}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              {type == "add" && (
                <div className="w-1/3 ml-6">
                  <Form.Item label={MODE} name="modeId" className="mt-4 mb-10">
                    <Select className=" w-full" defaultValue="face">
                      <Select.Option value="face">{FACE}</Select.Option>
                    </Select>
                  </Form.Item>

                  {/* <UploadMediaComponent
                    media={imageUpload.url}
                    onChange={handleChange}
                    height="260px"
                  /> */}
                  <UploadMultiMediaComponent
                    arrMedia={arrImageEmployee}
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>

            <Form.Item className="text-right mt-4">
              <Button
                onClick={() => {
                  type == "add"
                    ? history.push(`/employee`)
                    : history.push(`/profile/${"detail"}/${idEmployee}`);
                }}
                style={{ marginRight: "8px" }}
              >
                {CANCEL}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
                loading={asyncActionEmployee.status == "loading"}
              >
                {SAVE}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default React.memo(EmployeeEdit);
