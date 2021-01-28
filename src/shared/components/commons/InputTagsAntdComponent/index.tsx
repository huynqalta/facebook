import React, { useState, useEffect } from "react";
import { Input, Tag } from "antd";
import "./styles.scss";

interface Props {
  onChange: ({ listTag, valueInput }) => void;
  value: string;
}

const InpurTagsAntdComponent = (props: Props) => {
  const [listTag, setListTag] = useState([]);
  const [valueInput, setvalueInput] = useState("");

  useEffect(() => {
    if (props.value) {
      const mediatagTemp = props.value.split(",");

      setListTag(mediatagTemp);
    }
  }, [props.value]);
  const handleChange = (event) => {
    const _value = event.target.value;
    setvalueInput(_value);
  };
  const handleChangePress = (event) => {
    if (valueInput) {
      const listTagTemp = listTag;
      const indexTag = listTagTemp.findIndex((i) => i == valueInput);
      if (indexTag != -1) {
        listTagTemp.splice(indexTag, 1);
        listTagTemp.push(valueInput);
      } else {
        listTagTemp.push(valueInput);
      }
      setListTag(listTagTemp);
      props.onChange({ listTag: listTagTemp, valueInput });
      setvalueInput("");
    }
  };
  const handleClose = (valueTag) => {
    const listTagTemp = listTag;
    const indexTag = listTagTemp.findIndex((i) => i == valueTag);
    if (indexTag != -1) {
      listTagTemp.splice(indexTag, 1);
    }
    props.onChange({ listTag: listTagTemp, valueInput });
  };

  return (
    <div className={"input_tags_antd"} style={{}}>
      <Input
        style={{ width: "27vw", height: "40px", borderRadius: "8px" }}
        onChange={handleChange}
        onPressEnter={handleChangePress}
        onBlur={handleChangePress}
        value={valueInput}
        prefix={listTag.map((i) => (
          <Tag
            closable
            onClose={() => handleClose(i)}
            style={{ border: "5px" }}
          >
            {i}
          </Tag>
        ))}
        // tokenSeparators={[","]}
      >
        {/* {children} */}
      </Input>
    </div>
  );
};

export default InpurTagsAntdComponent;
