import { swalAfter } from "@config/swalPulgin";
import EmployeeEntities from "@entities/employee";
import {
  faEdit,
  faFileImage,
  faTimes,
  faTimesCircle,
  prefix,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAsync, useSingleAsync } from "@hook/useAsync";
import EmployeeInteractor from "@useCases/employee";
import { Button, Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";
import { ImageStore } from "src/core/store/imageUser";
import "./styles.scss";

const image = require("@assets/images/image-icon.jpg");

const arrCol = {
  1: {
    0: 24,
    1: 0,
    2: 0,
    3: 0,
  },
  2: {
    0: 12,
    1: 12,
    2: 0,
    3: 0,
  },
};

const ModalMedia = () => {
  const [arr, setArr] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const { type } = useParams();

  const { deleteEmployeeImageInteractor } = new EmployeeInteractor();

  const [asyncDeleteImage] = useAsync([deleteEmployeeImageInteractor]);

  const { visible, dataShowInModal, newImage, imageServer } = useRecoilValue(
    UploadImageStore
  );
  const { getProfileEmployeeInteractor } = new EmployeeInteractor();
  const asyncGetProfile = useSingleAsync<EmployeeEntities>(
    getProfileEmployeeInteractor
  );

  const setStateUploadImage = useSetRecoilState(UploadImageStore);

  const onCancel = () => {
    setStateUploadImage((pre) => ({ ...pre, visible: false }));
  };

  useEffect(() => {
    if (dataShowInModal) {
      const arrNew = dataShowInModal.slice(0, 2).map((item, index) => ({
        file: item?.url,
        col: arrCol[dataShowInModal.slice(0, 2).length][index],
      }));
      setArr(arrNew);
    }
  }, [dataShowInModal, isEdit]);

  useEffect(() => {
    if (arr.length == 0) {
      setIsEdit(false);
    }

    console.log(dataShowInModal?.length);
  }, [arr]);

  const handleCancel = () => {
    isEdit ? setIsEdit(false) : onCancel();
  };

  const handleOk = () => {
    isEdit
      ? console.log("aaa")
      : setStateUploadImage((pre) => ({ ...pre, imageShow: dataShowInModal }));
    isEdit ? setIsEdit(false) : onCancel();
  };

  const handleChange = (media) => {
    let arrayImageUpload = [];
    Array.from(media).map((item) =>
      arrayImageUpload.push({
        url: window.URL.createObjectURL(item),
        binaryFile: item,
      })
    );
    type == "add"
      ? setStateUploadImage((pre) => ({
          ...pre,
          dataShowInModal: [...pre.dataShowInModal, ...arrayImageUpload],
        }))
      : setStateUploadImage((pre) => ({
          ...pre,
          dataShowInModal: [...pre.dataShowInModal, ...arrayImageUpload],
        }));
  };

  const handleDeleteImage = (item) => {
    swalAfter(`${"Are you sure delete image"}`).then((isOkie) => {
      if (isOkie) {
        asyncDeleteImage.execute(item?.idUser, item?.idImage).then((res) =>
          asyncGetProfile.execute(item?.idUser).then((res) => {
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
              // visible: false,
              TagEmployee: res?.TagIdsParse,
            }));
          })
        );
      }
    });
  };

  return (
    <div>
      <Modal
        maskClosable={false}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        className={isEdit ? "modalImageFace" : "modalEditFace"}
        closable={false}
        cancelText={isEdit ? "Back" : "Cancel"}
      >
        {isEdit ? (
          <>
            {dataShowInModal.length == 0 ? (
              <p>"Mất tiêu luôn"</p>
            ) : (
              dataShowInModal.map((item, index) => {
                return (
                  <div className={"editImageFace"}>
                    {item.binaryFile ? (
                      <button
                        onClick={() =>
                          setStateUploadImage((pre) => ({
                            ...pre,
                            dataShowInModal: [
                              ...dataShowInModal.filter(
                                (x) => x?.url !== item?.url
                              ),
                            ],
                          }))
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                      </button>
                    ) : (
                      <button onClick={() => handleDeleteImage(item)}>
                        <FontAwesomeIcon icon={faTimes} size="2x" color="red" />
                      </button>
                    )}
                    <img
                      style={{
                        height: "366px",
                        width: "466px",
                        marginBottom: "8px",
                        objectFit: "cover",
                      }}
                      src={item.url}
                      alt={item.url}
                    />
                  </div>
                );
              })
            )}
          </>
        ) : (
          <>
            <div className="action" style={{ marginBottom: "10px" }}>
              {" "}
              {arr.length > 0 && (
                <Button
                  onClick={() => setIsEdit(true)}
                  style={{ marginRight: "10px" }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ marginRight: "5px" }}
                  />
                  {type == "add" ? "Edit" : "Preview"}
                </Button>
              )}
              <Button
                onClick={() => document.getElementById("input-media2").click()}
              >
                <FontAwesomeIcon
                  icon={faFileImage}
                  style={{ marginRight: "5px" }}
                />{" "}
                Add Photos
              </Button>
            </div>

            {arr?.length == 0 && (
              <div
                className="imageNotFound"
                onClick={() => document.getElementById("input-media2").click()}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#c1c1c1",
                  }}
                >
                  Start by adding a photo
                </p>
              </div>
            )}

            <Row gutter={[15, 15]}>
              {arr.map((item, index) => (
                <Col span={item.col}>
                  <div
                    style={{
                      padding: "0px",
                      // backgroundImage: "radial-gradient(black, transparent)",
                    }}
                  >
                    <img
                      src={item.file}
                      style={
                        index == 1 && dataShowInModal?.length > 2
                          ? {
                              width: "100%",
                              height: "350px",
                              opacity: 0.6,
                              objectFit: "contain",
                            }
                          : {
                              width: "100%",
                              height: "350px",
                              objectFit: "contain",
                            }
                      }
                      onClick={() => {
                        index == 1 &&
                          dataShowInModal?.length > 2 &&
                          setIsEdit(true);
                      }}
                      className={
                        index == 1 && dataShowInModal?.length > 2 && "isClick"
                      }
                    />
                  </div>

                  {dataShowInModal?.length > 2 && index == 1 && (
                    <p
                      style={{
                        position: "absolute",
                        top: "40%",
                        left: "40%",
                        fontSize: "40px",
                        color: "white",
                      }}
                      className="isClick"
                      onClick={() => {
                        setIsEdit(true);
                      }}
                    >
                      +{dataShowInModal.length - 2}
                    </p>
                  )}
                </Col>
              ))}
            </Row>
            <input
              onChange={(e) => {
                handleChange(e.target.files);
              }}
              style={{ position: "absolute", display: "none" }}
              type="file"
              id="input-media2"
              name="input-media"
              multiple
              accept="image/png, image/jpeg"
            />
          </>
        )}
        {/* {PreviewImage()} */}
      </Modal>
    </div>
  );
};

export default ModalMedia;
