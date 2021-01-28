import React, { useRef } from "react";
import "./style.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined spin style={{ fontSize: 24 }} />;

interface IProps {
  onClick?: (event) => void;
  classNames?: string;
  icon?: string;
  text?: any;
  disabled?: boolean;
  type?: any;
  refs?: any;
  style?: any;
  iconAnt?: any;
  loading?: boolean;
  typeColor?: string;
  test?: any;
}

const ButtonComponent = (props: IProps) => {
  const myRef = useRef();
  const color = () => {
    switch (props.typeColor) {
      case "red":
        return "button-red";
      case "gray":
        return "button-gray";
      case "green":
        return "button-green";
      case "forestgreen": // color excel;
        return "button-forestgreen";
      default:
        return "button-red";
    }
  };
  return (
    <button
      style={props.style}
      className={`button-component btn align-items-center mx-2 justify-content-center ${props.disabled && "disabled"} ${color()} ${props.classNames}`}
      type={props.type ? props.type : "button"}
      // type="button"
      ref={props.refs || myRef}
      onClick={event => (props.onClick ? props.onClick(event) : undefined)}
      disabled={props.disabled || props.loading}
    >
      {/*indicator={antIcon}*/}
      {props.icon && <i className={` ${props.icon}`} />} {props.iconAnt} {props.text || ""}
      {props.loading && <Spin size="small" indicator={antIcon} className="text-white mr-2" />}
    </button>
  );
};

function areEqual(prevProps, nextProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
  if (prevProps.disabled != nextProps.disabled || prevProps.iconAnt != nextProps.iconAnt || prevProps.text != nextProps.text) {
    return false;
  }
  return true;
}

export default React.memo(ButtonComponent);
