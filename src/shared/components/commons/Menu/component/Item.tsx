import React, { useContext } from "react";
import { IMenuItem } from "../interface";
import { MenuContext } from "./Menu";

const Item = (props: IMenuItem) => {
  const {
    mode,
    setMenuState,
    setActiveKeys,
    onClick: onClickItem,
  } = useContext(MenuContext);
  const {
    activeKey,
    disabled,
    children,
    isSelected,
    icon,
    parentKeys = [],
    className = "",
    onClick,
  } = props;

  const handleClickItem = () => {
    if (onClickItem) {
      onClickItem({ activeKey, parentKeys, type: "item" });
    }
    if (onClick) {
      onClick();
    }
    setActiveKeys(activeKey, parentKeys, "item");
    if (mode == "horizontal") {
      setMenuState((prev) => ({ ...prev }));
    }
  };

  return (
    <div
      className={`${className || ""} item-menu ${disabled && "disable"} ${
        isSelected && "item-menu-active"
      }`}
      onClick={handleClickItem}
    >
      {parentKeys.map((item) => {
        return <span key={item} className="mr-child"></span>;
      })}
      <span className="item-icon">{icon}</span>
      <div className="content">{children}</div>
    </div>
  );
};

const areEqual = (prev, next) => {
  if (prev.isSelected != next.isSelected || prev.children != next.children) {
    return false;
  }
  return true;
};

export default Item;
