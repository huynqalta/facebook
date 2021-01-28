import React, { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import {searchIcon} from "src/shared/assets/icon/exportIcon";
interface Iprops {
  onChange?: (value) => void;
  onClick?: (value) => void;
  width?: string;
  classNames?: string;
  placeholder?: string;
}

const SearchComponent = (props: Iprops) => {
  const [valueInput, setValueInput] = useState("");
  const {SEARCH} = useTranslate(common)
  return (
    <div
      className={`search-bar search-category  ${props.classNames}`}
      style={{ width: props.width ? props.width : "300px" }}
    >
      <input
        type="text"
        className="form-control w-full"
        onChange={(e) => {
          props.onChange(e.target.value);
          setValueInput(e.target.value);
        }}
        placeholder={props.placeholder || SEARCH + "..."}
      />
      <a className="icon-search">
      <SearchOutlined className="icon-search__ant"/>
      <img src={searchIcon} alt="" className="icon-search__img"  onClick={() => props.onClick(valueInput)} />
      </a>
    </div>
  );
};

export default SearchComponent;
