import { Button } from "antd";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";

interface IProps {
  onChange: (files) => any;
  maxSizeUpload?: number;
  numberFiles?: number;
  multiple?: boolean;
  language: string;
  status?: string;
}

const localText = {
  title: {
    USA: "Drop File Here To Upload",
    VNM: "Thả Tập Tin Vào Đây Để Tải Lên",
  },
  or: {
    USA: "Or",
    VNM: "Hoặc",
    // 'CHN': '要么'
  },
  btnName: {
    USA: "Select Files",
    VNM: "Chọn Files",
    // 'CHN': '選擇文件'
  },
  titleDesc: {
    USA: "Maximum Upload File Size",
    VNM: "Kích Thước Files Tối Đa",
    // 'CHN': '最大上傳文件大小'
  },
  selected: {
    USA: "selected",
    VNM: "được chọn",
    // 'CHN':  '已選'
  },
};
const DropZoneComponent = (props: IProps) => {
  // const [resultText, setResultText] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    props.onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop }); //isDragActive

  // set function call from parent component
  // useImperativeHandle(ref, () => ({
  //     destroy() {
  //       alert('reset')
  //     }
  // }));

  return (
    <div className="wrapper-content-dropsoze position-relative">
      <div {...getRootProps()} key={"wrapper"}>
        <input
          {...getInputProps()}
          accept="image/x-png,image/gif,image/jpeg"
          id={"my-drop"}
          multiple={props.multiple ? props.multiple : false}
        />
        <div className={"wrapper-dropzone"} title={"Click or Drop file here"}>
          <h5>{"Drop File Here To Upload"} </h5>
          <p>{"Or"}</p>
          <Button
            loading={props.status == "loading"}
            className="btn bg-theme_I mb-3"
          >
            {"Select Files"}
          </Button>
          {props.numberFiles !== 0 && props.numberFiles ? (
            <p>
              {props.numberFiles} file {localText.selected[props.language]}
            </p>
          ) : (
            ""
          )}
          <p className="text-muted text-small">
            {"Maximum Upload File Size"}: 2GB
          </p>
        </div>
      </div>

      {/*<i className="fas fa-times "/>*/}
    </div>
  );
};
export default DropZoneComponent;
