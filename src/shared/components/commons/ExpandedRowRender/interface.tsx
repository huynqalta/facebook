export interface ExpandedRowRenderProps {
  columns: Array<any>;
  data: Array<any>;
  expandable?: Expanded;
  rowKey: string;
  isDragable?: boolean;
  propetyTable?: object;
  nodata?: {
    icon?: any;
    message?: any;
  };
  handleSortCallBack?: (dataSorted, parentId?) => void;
}
export interface Expanded {
  columns: Array<any>;
  rowKey: string;
  keyExpanded: keyExpanded;
  expandable?: Expanded;
  isDragable?: boolean;
  propetyTable?: object;
  handleSortCallBack?: (dataSorted, parentId) => void;
}
export interface keyExpanded {
  parentKey: string;
  childrenKey: string;
}
