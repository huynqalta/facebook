import { Tooltip } from "antd";
import React from "react";

interface Iprop {
  title: "string";
  onClick?: () => any;
  icon: JSX.Element;
}

const TooltipComponent = (props: Iprop) => {
  return (
    <div>
      <Tooltip title={props?.title}>
        <a className="btn-icon" onClick={() => props.onClick}>
          {props?.icon}
        </a>
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
