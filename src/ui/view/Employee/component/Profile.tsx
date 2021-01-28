import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
} from "antd";
import AuthencationEmployee from "./Authencation";
import TagEmployee from "./Tag";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import EmployeeInteractor from "@useCases/employee";
import { useAsync, useSingleAsync } from "@hook/useAsync";
import { RightOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
import EmployeeEntities from "@entities/employee";
import { Link } from "react-router-dom";
import useEmployee from "../viewModel";
import { useTranslate } from "@hook/useTranslate";
import { common, employee } from "@translateKey/index";
import GroupInteractor from "@useCases/employee/group";
import GroupEntities from "@entities/employee/group";
import TagInteractor from "@useCases/tag";
import TagEntities from "@entities/tag/tag";
import EmployeeEdit from "./EmployeeEdit";
import { useSetRecoilState } from "recoil";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";

const Information = ({ title, children }) => {
  return (
    <div className="flex text-sm mb-4">
      <span style={{ fontSize: "17px" }} className=" w-3/12 block">
        {title}:{" "}
      </span>
      <strong style={{ fontSize: "16px" }}>{children}</strong>
    </div>
  );
};

const Profile = () => {
  const [arrImageEmployee, setArrImageEmployee] = useState([]);
  const { type, idEmployee }: any = useParams();
  const [form] = Form.useForm();
  const { getProfileEmployeeInteractor } = new EmployeeInteractor();
  const asyncGetProfile = useSingleAsync<EmployeeEntities>(
    getProfileEmployeeInteractor
  );

  const history = useHistory();

  const {
    PHONE,
    ADDRESS,
    GENDER,
    EDIT_EMPLOYEE,
    ADD_EMPLOYEE,
    EMPLOYEE,
    DETAIL_EMPLOYEE,
    NAME,
    EDIT,
    MODE,
    GROUP_NAME,
    FACE,
    TAG,
  } = useTranslate(employee);
  const setStateUploadImage = useSetRecoilState(UploadImageStore);
  // useEffect(() => {
  //   // idEmployee && asyncGetProfile.execute(idEmployee);
  //   asyncGetListGroup.execute();
  //   asyncGetListTag.execute();
  // }, []);

  // const editEmployee = (data?: EmployeeEntities) => {
  //   setShowModal({ edit: true, data: data, type: "edit" });
  // };
  // const closeModal = (type: "" | "add" | "edit") => {
  //   setShowModal({ edit: false, data: {}, type: type });
  // };

  // const onFinish = (values: EmployeeEntities) => {
  //   console.log(values);
  //   // asyncActionEmployee.execute(values, idEmployee).then((res) => {
  //   //   history.push(`/profile/${"detail"}/${res?.userId}`);
  //   //   // closeModal("");
  //   // });
  // };

  useEffect(() => {
    if (type == "detail") {
      asyncGetProfile.execute(idEmployee).then((res) => {
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
  }, [type, idEmployee]);

  const profile = useMemo(() => {
    return idEmployee && asyncGetProfile.value;
  }, [asyncGetProfile.value]);

  // TRANSLATE
  const { HOME } = useTranslate(common);

  return (
    <div>
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/employee">{EMPLOYEE}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">
          {DETAIL_EMPLOYEE}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16} className="mt-5">
        <Col span={type == "add" ? 24 : 15}>
          {type == "detail" ? (
            <>
              <h2 style={{ fontSize: "20px", marginTop: "10px" }}>
                {DETAIL_EMPLOYEE}
              </h2>
              <Card
                style={{ marginTop: "24px", padding: "30px 24px" }}
                className="cardCatogery rounded-xl mb-5"
              >
                <div>
                  <Information title={NAME}>
                    {profile?.userLastName} {profile?.userFirstName}
                  </Information>
                  <Information title={GENDER}>
                    {profile?.userGender}
                  </Information>
                  <Information title="Email">{profile?.userEmail}</Information>
                  <Information title={PHONE}>{profile?.userPhone}</Information>
                  <Information title={ADDRESS}>
                    {profile?.userAddress}
                  </Information>
                  <Information title={GROUP_NAME}>
                    {profile?.group?.groupName}
                  </Information>
                  <Information title={TAG}>
                    <div>
                      {profile?.userTags.map((x) => (
                        <Tag color="red">{x.tagName}</Tag>
                      ))}
                    </div>
                  </Information>
                </div>
                <div
                  className="editEmployeeInProfile"
                  style={{ width: "100%", textAlign: "end" }}
                >
                  <Button
                    onClick={() =>
                      history.push(`/profile/${"edit"}/${idEmployee}`)
                    }
                  >
                    {EDIT}
                  </Button>
                </div>
              </Card>
              {/* <Card className="article rounded-xl mt-4">
                  <TagEmployee profile={profile} />
                </Card> */}
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "20px", marginTop: "10px" }}>
                {type == "edit" ? EDIT_EMPLOYEE : ADD_EMPLOYEE}
              </h2>
              <Card style={{ borderRadius: "11px", marginTop: "24px" }}>
                <EmployeeEdit />
              </Card>
              {/* <Card className="article rounded-xl mt-4">
                <TagEmployee profile={profile} />
              </Card> */}
            </>
          )}
        </Col>
        {type != "add" && (
          <Col span={8}>
            <div className=" text-xl mb-4 flex items-center justify-between">
              <h6 style={{ width: "100px", textAlign: "center" }}> {MODE}:</h6>
              <Select className=" w-4/5 ml-3" defaultValue="face">
                <Select.Option value="face">{FACE}</Select.Option>
              </Select>
            </div>
            <Card className="cardCatogery rounded-xl mt-6">
              <AuthencationEmployee
                isEmptyImage={profile?.userImage}
                arrayMedia={arrImageEmployee}
              />
            </Card>
          </Col>
        )}
      </Row>
      {/* <Suspense fallback={<div></div>}>
        {showModal.edit && (
          <EmployeeEdit
            visible={showModal.edit}
            type={showModal.type}
            data={showModal.data}
            closeModal={closeModal}
            onSubmitSuccess={() => asyncGetProfile.execute(idEmployee)}
          />
        )}
      </Suspense> */}
    </div>
  );
};
export default React.memo(Profile);
