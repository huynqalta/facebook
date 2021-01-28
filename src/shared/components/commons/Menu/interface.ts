import { ReactNode } from "react";

export interface IMenu {
  inlineIndent?: number;
  mode?: "vertical" | "horizontal" | "inline" | string;
  multipleSelection?: boolean;
  inlineCollapsed?: boolean;
  selectable?: boolean;
  subMenuDelay?: number;
  triggerSubMenuAction?: "hover" | "click";
  openKeys?: Array<string>;
  selectedKeys?: Array<string>;
  onOpen?: (activeKey) => void;
  onSelect?: (activeKey) => void;
  children?: ReactNode;
  multipleOpen?: boolean;
  register?: IUseMenu;
  onClick?: (info) => void;
}

export interface IMenuState {
  openActiveKeys: Array<string>;
  selectedActiveKeys: Array<string>;
  inlineCollapsed: boolean;
  mode: "vertical" | "horizontal" | "inline";
}

export interface ISubMenu {
  activeKey?: string;
  icon?: any;
  title?: any;
  disabled?: boolean;
  children?: ReactNode;
  parentKeys?: Array<string>;
  setActiveKeys?: (
    activeKey: string | [],
    parentKeys: Array<any>,
    type: "submenu" | "item",
    status?: "on" | "off"
  ) => void;
  isOpen?: boolean;
  isHasSelected?: boolean;
}

export interface IMenuItem {
  activeKey?: string;
  disabled?: boolean;
  children?: ReactNode;
  parentKeys?: Array<string>;
  setActiveKeys?: (
    activeKey: string | [],
    parentKeys: Array<any>,
    type: "submenu" | "item",
    status?: "on" | "off"
  ) => void;
  icon?: any;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface IUseMenu {
  setOpenKey: (openKey: Array<string> | string, status?: "on" | "off") => void;
  setSelectedKey: (
    selectionKey: Array<string> | string,
    status?: "on" | "off"
  ) => void;
  setInlineCollapsed: (value: boolean) => void;
  setMode: (mode: "vertical" | "horizontal" | "inline") => void;
  getMenuState: () => {
    openActiveKeys: Array<string>;
    selectedActiveKeys: Array<string>;
    inlineCollapsed: boolean;
  };
}
