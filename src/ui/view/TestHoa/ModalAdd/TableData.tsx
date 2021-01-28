import { Table } from "antd";
import React from "react";

import { useRecoilValue } from "recoil";
import { option_data } from "../interface";
import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import { LanguageAtom } from "src/core/adapters/recoil/languageProject";
import TableAction from "./TableAction";
const data = require("./../data.json");
const TableData = () => {
  const { ACTION } = useTranslate(common);
  const language = useRecoilValue(LanguageAtom);

  // JUST TABLE
  const columns = [
    {
      title: "tagName",
      dataIndex: "tagName",
    },
    {
      title: "gender",
      dataIndex: "gender",
      render: (text) => option_data[text][language],
    },
    {
      title: "group",
      dataIndex: "group",
    },
    {
      title: ACTION,
      key: "action",
      render: (text, record) => <TableAction record={record} />,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default TableData;
