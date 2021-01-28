import React from "react";
import "./style.scss";
const Showing = ({ info, data }) => {
  let limit = info.limit ? info.limit : info.pageSize;
  let page = info.page ? info.page : info.current;
  let totalRecord = info.totalRecord ? info.totalRecord : info.total;

  return (
    <div className={`${totalRecord > 10 ? "active" : ""} Showing`}>
      <span>
        Showing {limit * (page - 1) + 1}-{limit * (page - 1) + data?.length} of{" "}
        {totalRecord} items{" "}
      </span>
    </div>
  );
};
export default Showing;
