import { Breadcrumb } from "antd";
import React from "react";
import {
  RightOutlined
} from "@ant-design/icons";
import ButtonAdd from "@components/commons/ButtonAdd";
import ModalAdd from "./ModalAdd/ModalAdd";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { useSetRecoilState } from "recoil";
import { ModalStore } from "./interface";
import TableData from "./ModalAdd/TableData";
import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";

const TestHoa = () => {
  const setModal = useSetRecoilState(ModalStore);
  const {HOME} = useTranslate(common);
  return (
    <div>
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>{HOME}</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">Group</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex">
        <div className="flex-auto">
          {/* làm ô search khi đã xong các cái khác hết rùi  */}
          {/* <Search getList={getListTag} pagination={TagPaginationStore} /> */}

          {/* Ô search này để tượng trưng  */}
          <SearchComponent />
        </div>
        <ButtonAdd
          onClick={() => setModal((prev) => ({ ...prev, isVisible: true }))}
          title="Add tag"
          className="mb-3"
        />
      </div>
      <ModalAdd/>
      <TableData/>
    </div>
  );
};

export default TestHoa;
