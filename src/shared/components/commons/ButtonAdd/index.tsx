import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
interface Iprops{
  onClick?: (value) => void;
  className?: string;
  title?: string;
  icon?: any;
  loading?:boolean;
  color?:string;
}

const ButtonAdd = (props: Iprops) => {
  return (
    <Button
      type="primary"
      shape="round"
      icon={props.icon? props.icon : <PlusOutlined />}
      className={`pr-5 btn-add ${props.color} ${props.className}`}
      size="large"
      onClick={props.onClick}
      loading={props.loading}
    >
      {props.title}
    </Button>
  );
};

export default ButtonAdd;
