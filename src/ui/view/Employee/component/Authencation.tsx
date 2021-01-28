import EmployeeService from "@api/employee";
import UploadMediaComponent from "@components/commons/UploadMultiMediaComponent";
import { SERVICES } from "@config/index";
import EmployeeEntities from "@entities/employee";
import { useAsync, useSingleAsync } from "@hook/useAsync";
import { useTranslate } from "@hook/useTranslate";
import { employee } from "@translateKey/index";
import EmployeeInteractor from "@useCases/employee";
import { Button, Card, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";

const ImageErr = require("@assets/images/404-error.png");

const AuthencationEmployee = ({ isEmptyImage, arrayMedia }) => {
  const { idEmployee, type }: any = useParams();
  const {
    actionEmployeeInteractor,
    getFaceEmployeeInteractor,
  } = new EmployeeInteractor();

  const history = useHistory();

  const { CANCEL, SAVE } = useTranslate(employee);

  const { getImageAuthenFace } = new EmployeeService();
  const [asyncRegister, asyncFace] = useAsync(
    [actionEmployeeInteractor],
    [getFaceEmployeeInteractor]
  );
  const { getProfileEmployeeInteractor } = new EmployeeInteractor();
  const asyncGetProfile = useSingleAsync<EmployeeEntities>(
    getProfileEmployeeInteractor
  );

  const { dataShowInModal, TagEmployee } = useRecoilValue(UploadImageStore);
  const dataForSend = dataShowInModal.filter(
    (item) => item?.binaryFile != undefined
  );

  const setStateUploadImage = useSetRecoilState(UploadImageStore);

  const [isGetImageSuccess, setIsGetImageSucess] = useState(true);
  const handleAdd = useCallback(() => {
    let data = new FormData();
    dataForSend?.length && data.append("ModeId", "Face_ID");
    TagEmployee?.length &&
      TagEmployee.map((x) => data.append("TagIdsParse", x));
    dataForSend?.length > 0 &&
      dataForSend?.map((x) => data.append("UserImages", x.binaryFile));
    asyncRegister.execute(data, idEmployee).then(() => {
      asyncGetProfile.execute(idEmployee).then((res) => {
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
          TagEmployee: [],
        }));
      });
    });
  }, [dataForSend]);

  // const setDefaultImage = useCallback(() => {
  //   setImageUrl((pre) => ({
  //     ...pre,
  //     url:
  //       type == "add"
  //         ? ""
  //         : isEmptyImage
  //         ? ""
  //         : `${SERVICES.API_URL_BASE}/api/Users/GetFileId/${idEmployee}`,
  //     change: false,
  //   }));
  // }, [isEmptyImage]);

  useEffect(() => {
    // setDefaultImage();
    getImageAuthenFace(idEmployee)
      .then((res) => console.log(res))
      .catch((err) => setIsGetImageSucess(false));
  }, [idEmployee]);

  return (
    <div>
      <UploadMediaComponent
        arrMedia={arrayMedia}
        height={"17.9vw"}
        // onChange={(media) =>
        //   setImageUrl({
        //     url: media,
        //     file: media,
        //     change: true,
        //   })
        // }
      />
      <div key={idEmployee}>
        <Button
          onClick={handleAdd}
          className="primary mr-2 mt-4 pr-5 float-right btn-add"
          loading={asyncRegister.status == "loading"}
          // disabled={!imageUrl.change}
        >
          {SAVE}
        </Button>
        <Button
          onClick={() => history.push("/employee")}
          className="primary mr-2 mt-4 pr-5 float-right btn-add"
          // disabled={!imageUrl.change}
        >
          {CANCEL}
        </Button>
      </div>
    </div>
  );
};
export default React.memo(AuthencationEmployee);
