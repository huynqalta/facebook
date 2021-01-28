import TableComponent from "@components/commons/TableComponent";
import ParameterIntoractor from "@useCases/parameter";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAsync } from "@hook/useAsync";
import useTable from "@components/commons/TableComponent/hook";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import useParameter from "./viewModel";
import FormParameter from "./component/FormParameter";
import "./style.scss";
const {
  addParameters,
  editParameters,
  getDetailParameter,
  getListParameters,
  removeParameter,
} = new ParameterIntoractor();

const Parameter = (props) => {
  const registerTable = useTable();
  const { registerForm } = useParameter();
  const [asyncRemove] = useAsync(removeParameter);
  const [selected, setSelected] = useState(null);

  return (
    <div className="parameter">
      <div className="flex justify-between">
        <SearchComponent
          onChange={(value) =>
            registerTable.fetchData({ option: { search: value } })
          }
        />

        <Button
          onClick={() => registerForm.setVisible(true)}
          shape="round"
          className="primary mr-2 mb-8 pr-5 float-right btn-add"
          icon={<PlusOutlined />}
          size="large"
        >
          Add parameter
        </Button>
      </div>
      <FormParameter
        registerTable={registerTable}
        parameterSelected={selected}
        setParameterSelected={setSelected}
        registerForm={registerForm}
      />
      <TableComponent
        register={registerTable}
        columns={[
          {
            title: "Parameter",
            dataIndex: "parameterName",
            key: "parameterName",
          },
          {
            title: "Key",
            dataIndex: "parameterKey",
            key: "parameterKey",
          },
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record) => {
              return (
                <div className="action">
                  <Tooltip title="Detail" className="mr-4">
                    <EditOutlined
                      onClick={() => {
                        registerForm.setVisible(true);
                        setSelected(record);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      onClick={() =>
                        asyncRemove
                          .execute(record.parameterKey)
                          .then((res) => registerTable.fetchData())
                      }
                    />
                  </Tooltip>
                </div>
              );
            },
          },
        ]}
        apiServices={getListParameters}
      />
    </div>
  );
};

export default Parameter;
