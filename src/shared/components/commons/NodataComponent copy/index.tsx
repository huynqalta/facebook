import React from "react";
import { Translate } from "@shared/functions";
import { allKey } from "@shared/TranslateKey/ImportAllKey";
const { commonKey } = allKey;
import { Empty } from "antd";
import "./style.scss";

interface Props {
  message?: string;
  icon?: string;
}

const NoDataComponent: React.FC<Props> = (props: Props) => {
  return (
    <div className="no-data text-center">
      <Empty
        description={props.message || Translate(commonKey.NODATA)}
        image={props.icon || Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );
};

export default NoDataComponent;
