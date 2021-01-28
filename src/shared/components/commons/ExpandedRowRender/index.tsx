import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { MenuOutlined } from "@ant-design/icons";
import get from "lodash/get";

import { ExpandedRowRenderProps } from "./interface";
import "./styles.scss";
import NoDataComponent from "../NodataComponent";

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const DragableBodyRow = ({ index, className, style, ...restProps }) => {
  return <SortableItem index={restProps["data-row-key"]} {...restProps} />;
};

const ExpandedRowRender = (props: ExpandedRowRenderProps) => {
  const [propetyTable, setPropertyTable] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [columnsState, setColumnsState] = useState([]);
  const [expandRowKeys, setExpandRowKeys] = useState([]);

  useEffect(() => {
    if (props.propetyTable) setPropertyTable(props.propetyTable);
  }, [props.propetyTable]);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      // const dataTemp = props.data;
      const dataSorted = props.data;

      dataSorted.sort((a, b) => {
        return a.menubarOrder - b.menubarOrder;
      });
      setDataSource(dataSorted);
    } else if (props.data && props.data.length == 0) {
      setDataSource([]);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.columns && props.columns.length > 0) {
      const draghandle = {
        title: "",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />,
      };

      const columnsTemp = props.isDragable
        ? [draghandle].concat(props.columns)
        : props.columns;

      setColumnsState(columnsTemp);
    }
  }, [props.columns]);

  const DraggableContainer = (props) => {
    return (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        updateBeforeSortStart={updateBeforeSortStart}
        {...props}
      />
    );
  };
  const updateBeforeSortStart = (item) => {
    // if (expandRowKeys.length > 0) setExpandRowKeys([]);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(dataSource, oldIndex - 1, newIndex - 1)
        .filter((el) => !!el)
        .map((item, index) => {
          item[props.rowKey] = index + 1;
          return item;
        });

      // const indexExpaned = expandeTemp.findIndex(i => i == oldIndex);
      // expandeTemp.splice(indexExpaned, 1);
      // expandeTemp.push(newIndex - 1);
      if (expandRowKeys.length > 0) {
        const expandeTemp = expandRowKeys.map((i) => {
          if (i > oldIndex && i <= newIndex) {
            return i - 1;
          }
          if (i < oldIndex && i >= newIndex) {
            return i + 1;
          }
          if (i == oldIndex) {
            return newIndex;
          }
          return i;
        });
        setExpandRowKeys(expandeTemp);
      }
      setDataSource(newData);

      props.handleSortCallBack && props.handleSortCallBack(newData);
      //send API sort tai đây
    }
  };
  const { parentKey, childrenKey } = get(props.expandable, ["keyExpanded"], {
    parentKey: "",
    childrenKey: "",
  });
  return (
    <div className="w-100 position-relative">
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columnsState}
        rowKey={props.rowKey}
        locale={{
          emptyText: (
            <NoDataComponent
              icon={props.nodata && props.nodata.icon}
              message={props.nodata && props.nodata.message}
            />
          ),
        }}
        components={
          props.isDragable
            ? {
                body: {
                  wrapper: DraggableContainer,
                  row: DragableBodyRow,
                },
              }
            : undefined
        }
        expandedRowKeys={expandRowKeys}
        childrenColumnName="row-key-ne"
        onExpandedRowsChange={(expandedRows) => {
          setExpandRowKeys(expandedRows);
        }}
        rowExpandable={(record) => {
          return record[childrenKey] && record[childrenKey].length > 0;
        }}
        expandedRowRender={(record, index, indent, expanded) => {
          const expandeds =
            (props.expandable && props.expandable["expandable"]) || undefined;

          const columns = get(props.expandable, ["columns"], []);

          return (
            <ExpandedRowRender
              propetyTable={props.expandable.propetyTable}
              data={record[childrenKey]}
              columns={columns}
              rowKey={props.expandable.rowKey}
              expandable={expandeds}
              isDragable={props.expandable.isDragable}
              handleSortCallBack={(dataSorted) => {
                if (props.expandable.handleSortCallBack) {
                  return props.expandable.handleSortCallBack(
                    dataSorted,
                    record[parentKey]
                  );
                }
                return props.handleSortCallBack(dataSorted, record[parentKey]);
              }}
            />
          );
        }}
        {...propetyTable}
      />
    </div>
  );
};
const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.data != nextProps.data ||
    prevProps.columns != nextProps.columns
  ) {
    return false;
  }

  return true;
};
export default React.memo(ExpandedRowRender, areEqual);
