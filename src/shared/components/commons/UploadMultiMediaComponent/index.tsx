import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./UploadMediaComponent.scss";
import LazyLoadImage from "@components/commons/LazyLoadImage/LazyLoadImage";
import ModalMedia from "./ModalMedia";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ImageStore } from "src/core/store/imageUser";
import { Col, Row } from "antd";
import { useParams } from "react-router";
import { UploadImageStore } from "src/core/store/ImageUploadEmployee";
import { url } from "inspector";
const imageBackground = require("@assets/images/imageBackGround.jpg");

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

const UploadMediaComponent = (props) => {
  const { type } = useParams();
  const media = useRecoilValue(ImageStore);

  const [arrayUrl, setArrayUrl] = useState([]);

  const setStateUploadImage = useSetRecoilState(UploadImageStore);
  const { imageShow, imageServer, dataShowInModal, visible } = useRecoilValue(
    UploadImageStore
  );
  const [arr, setArr] = useState([]);

  // useEffect(() => {
  //   setStateUploadImage((pre) => ({ ...pre, imageShow: [] }));
  //   setArr([]);
  //   console.log(type);
  // }, [type]);

  useEffect(() => {
    if (imageShow?.length > 0) {
      const arrNew = imageShow.slice(0, 2).map((item, index) => ({
        file: item?.url,
        col: arrCol[imageShow.slice(0, 2).length][index],
      }));
      setArr(arrNew);
    } else {
      if (imageServer?.length > 0) {
        const arrNew = imageServer.slice(0, 2).map((item, index) => ({
          file: item?.url,
          col: arrCol[imageServer.slice(0, 2).length][index],
        }));
        setArr(arrNew);
        setArrayUrl(imageServer.map((item) => ({ url: item })));
      }
    }
  }, [imageShow, imageServer, type]);

  const handleChange = (e) => {
    setStateUploadImage((pre) => ({ ...pre, visible: true }));
    let arrayImageBinaryUpload = [];
    Array.from(e?.target?.files).map((item) =>
      arrayImageBinaryUpload.push({
        url: window.URL.createObjectURL(item),
        binaryFile: item,
      })
    );

    arrayImageBinaryUpload.length > 0 &&
      setStateUploadImage((pre) => ({
        ...pre,
        dataShowInModal: arrayImageBinaryUpload,
        visible: true,
      }));
  };

  return (
    <div className="upload-component w-100">
      <label
        htmlFor={arr?.length == 0 && "input-media"}
        onClick={() => {
          arr?.length > 0 &&
            setStateUploadImage((pre) => ({ ...pre, visible: true }));
        }}
        className="w-100"
      >
        <div className="wrap-open-modal w-100 h-100">
          <div
            className="wrap-image d-flex"
            style={{
              height: arr?.length > 0 ? "auto" : "300px",
              justifyContent: "center",
            }}
          >
            {
              <Row gutter={[15, 15]}>
                {arr.map((item, index) => (
                  <Col span={item.col}>
                    <div
                      style={{
                        height: "auto",
                      }}
                    >
                      <img
                        src={item.file}
                        style={
                          (index == 1 && imageShow?.length > 2) ||
                          (index == 1 && imageServer?.length > 2)
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
                      />
                    </div>

                    {(imageShow?.length > 2 && index == 1) ||
                    (imageServer?.length > 2 && index == 1) ? (
                      <p
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "40%",
                          fontSize: "40px",
                          color: "white",
                        }}
                      >
                        +
                        {imageShow.length > 0
                          ? imageShow?.length - 2
                          : imageServer?.length - 2}
                      </p>
                    ) : (
                      ""
                    )}
                  </Col>
                ))}
              </Row>
            }
            <div className="open-modal">
              <PlusOutlined />
            </div>
          </div>
        </div>
      </label>
      <input
        onChange={handleChange}
        type="file"
        id="input-media"
        name="input-media"
        multiple
        accept="image/png, image/jpeg"
      />
      <ModalMedia />
    </div>
  );
};

export default UploadMediaComponent;
