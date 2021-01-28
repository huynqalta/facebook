import React from "react";
interface Iprops {
  icon?: any;
  title: string;
  className?: string;
  color?: string;
  onClick?: (value) => void;
}
const ButtonComponent = (props: Iprops) => {
  return (
    <a className= {`btn-component ${props.className}`} style={{backgroundColor: `${props.color}`}} onClick={props.onClick}>
      <span className={`btn-component__icon ${props.color}`}>{props.icon}</span>
      {props.title}
    </a>
  );
};

export default ButtonComponent;
