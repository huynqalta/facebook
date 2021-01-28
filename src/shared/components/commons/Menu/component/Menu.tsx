import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  editByCodition,
  pushIfNotExit,
  isCoincide,
  convertToArray,
} from "../helper";
import { IMenu, IMenuState } from "../interface";
import Item from "./Item";
import SubMenu from "./SubMenu";
import { isInArray } from "../helper";
import "../style.scss";
import useMenu from "../hook";

export const MenuContext = React.createContext(null);

const Menu = (props: IMenu) => {
  let parentKeysOfAllChild = useRef(null);

  const {
    inlineIndent,
    mode = "vertical",
    inlineCollapsed,
    selectable = true,
    multipleOpen = true,
    multipleSelection = false,
    subMenuDelay,
    triggerSubMenuAction,
    onOpen,
    onSelect,
    openKeys,
    selectedKeys,
    children,
    register,
    onClick,
  } = props;

  const [state, setState] = useState<IMenuState>({
    openActiveKeys: [],
    selectedActiveKeys: [],
    inlineCollapsed: false,
    mode: "inline",
  });

  const stateToUse = useMemo(() => {
    return {
      openActiveKeys: props.openKeys || state.openActiveKeys,
      selectedActiveKeys: props.selectedKeys || state.selectedActiveKeys,
      inlineCollapsed: props.inlineCollapsed || state.inlineCollapsed,
      mode: props.mode || state.mode,
    };
  }, [state, props]);

  useEffect(() => {
    if (stateToUse.mode == "horizontal") {
      setState((prev) => ({
        ...prev,
        openActiveKeys: [],
      }));
    }
  }, [stateToUse.mode]);

  const setActiveKeys = (activeKey, parentKeys, type, status) => {
    if (
      !selectable ||
      (stateToUse.inlineCollapsed && type == "submenu") ||
      (stateToUse.mode == "horizontal" && type == "submenu")
    )
      return;

    let newSelectedKeys = [...stateToUse.selectedActiveKeys];
    let newOpenKeys = [...stateToUse.openActiveKeys];

    let checkInTree = isCoincide(newOpenKeys, parentKeys);

    if (type == "submenu") {
      if (onOpen) {
        onOpen(activeKey);
      }
      newOpenKeys = editByCodition(
        newOpenKeys,
        activeKey,
        multipleOpen,
        status
      );
      checkInTree = isCoincide(newOpenKeys, [...parentKeys, activeKey]);
    }

    if (!multipleOpen && !checkInTree) {
      // Nếu chọn ngoài "dòng họ" => chỉ lấy parentKeys được chọn (bỏ hết những openKeys hiện tại)
      newOpenKeys = parentKeys;
    } else {
      // Nếu chọn trong cùng "dòng họ" => chỉ thêm parentKeys chứ không xóa
      parentKeys.forEach((key) => {
        newOpenKeys = pushIfNotExit(newOpenKeys, key, true);
      });
    }

    if (type == "item") {
      if (onSelect) {
        onSelect(activeKey);
      }
      const _newSelectedKeys = editByCodition(
        stateToUse.selectedActiveKeys,
        activeKey,
        multipleSelection,
        status
      );
      if (_newSelectedKeys.length != 0) {
        newSelectedKeys = _newSelectedKeys;
      }
    }

    if (stateToUse.mode == "horizontal") {
      newOpenKeys = [];
    }

    setState((prev) => ({
      ...prev,
      openActiveKeys: newOpenKeys,
      selectedActiveKeys: newSelectedKeys,
    }));
  };

  const renderChildren = (children) => {
    let _parentKeys = {};
    const dequy = (listChildren, parentKeys) => {
      return listChildren.map((item, index) => {
        _parentKeys[item.props.activeKey] = parentKeys;
        let elm;
        if (item.type.name == "SubMenu") {
          let isHasSelected = false;
          if (parentKeysOfAllChild.current) {
            isHasSelected = stateToUse.selectedActiveKeys.some((key) => {
              return isInArray(
                parentKeysOfAllChild.current[key],
                item.props.activeKey
              );
            });
          }

          elm = React.cloneElement(item, {
            key: item.props.activeKey,
            children: dequy(convertToArray(item.props.children), [
              ...parentKeys,
              item.props.activeKey,
            ]),
            isOpen: isInArray(stateToUse.openActiveKeys, item.props.activeKey),
            isHasSelected,
            parentKeys,
            inlineCollapsed: stateToUse.inlineCollapsed,
          });
        } else {
          elm = React.cloneElement(item, {
            key: item.props.activeKey,
            isSelected: isInArray(
              stateToUse.selectedActiveKeys,
              item.props.activeKey
            ),
            parentKeys,
          });
        }
        return <div key={item.props.activeKey}>{elm}</div>;
      });
    };
    const elm = dequy(convertToArray(children), []);
    parentKeysOfAllChild.current = _parentKeys;
    return elm;
  };

  if (register) {
    register.getMenuState = () => ({
      openActiveKeys: stateToUse.openActiveKeys,
      selectedActiveKeys: stateToUse.selectedActiveKeys,
      inlineCollapsed: stateToUse.inlineCollapsed,
    });
    register.setOpenKey = (activeKey: string, status: "on" | "off") => {
      if (!parentKeysOfAllChild.current[activeKey]) return;
      setActiveKeys(
        activeKey,
        parentKeysOfAllChild.current[activeKey],
        "submenu",
        status
      );
    };
    register.setSelectedKey = (activeKey: string, status: "on" | "off") => {
      if (!parentKeysOfAllChild.current[activeKey]) return;
      setActiveKeys(
        activeKey,
        parentKeysOfAllChild.current[activeKey],
        "item",
        status
      );
    };
    register.setMode = (mode: "vertical" | "horizontal" | "inline") => {
      setState((prev) => ({ ...prev, mode }));
    };
    register.setInlineCollapsed = (value) => {
      setState((prev) => ({
        ...prev,
        inlineCollapsed: value,
      }));
    };
  }

  return (
    <MenuContext.Provider
      value={{ setMenuState: setState, mode, onClick, setActiveKeys }}
    >
      <div
        className={`alta-menu ${
          stateToUse.inlineCollapsed ? "inline-collapsed" : stateToUse.mode
        }`}
      >
        {renderChildren(children)}
      </div>
    </MenuContext.Provider>
  );
};

Menu.useMenu = useMenu;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
export default Menu;
