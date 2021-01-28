import Checkbox from "antd/lib/checkbox/Checkbox";
import React from "react";
const ItemModulePageLanguage = ({ item, record, index, onChange }) => {
  return (
    <Checkbox
      name={item.languageCode}
      checked={item.moduleLanguageDisplay == "show"}
      key={index}
      onChange={(e) => onChange(record.moduleId, e)}
    >
      {item.languageCode}
    </Checkbox>
  );
};
export default React.memo(ItemModulePageLanguage);
