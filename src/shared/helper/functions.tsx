import React, { useContext } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import PaginationInfo from "@entities/paginationInfo";
// import { useTranslate } from "@hook/useTranslate";
// import { common } from "@translateKey/index";

export const correctEmail = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const correctLink = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const debounce = (callback, delay) => {
  let timeoutHandler = null;
  return (...args) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      callback(...args);
      timeoutHandler = null;
    }, delay);
  };
};

export const indexOfArrObject = (arr, key, value) => {
  let index = -1;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
};

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ReverseObjectNumber(object) {
  return Object.assign(
    {},
    ...Object.entries(object).map(([a, b]) => ({
      [b]: parseInt(a),
    }))
  );
}
export const hasSameItem = (
  arr1: Array<number | string>,
  arr2: Array<number | string>
) => {
  for (let index = 0; index < arr1.length; index++) {
    const item1 = arr1[index];
    if (arr2.includes(item1)) {
      return true;
    }
  }
  return false;
};
export const converDateTimePicker = (value) => {
  var date = `${value} 00:00:00`;
  const pattern = /^(\d{4})\-(\d{1,2})\-(\d{1,2}) (\d{1,2})\:(\d{1,2})\:(\d{1,2})$/;
  var arrDateStart = date.match(pattern);
  var dstart = new Date(
    `${arrDateStart[1]}-${arrDateStart[2]}-${
      parseInt(arrDateStart[3]) - 1
    } 17:00:00`
  );

  const DateStart = dateFormat(dstart, "yyyy-m-d HH:MM:ss");
  return (date = DateStart);
};

// const {NO_REPEAT, DAILY, WEEKLY, MONTHLY, YEARLY} = useTranslate(common);

export const option_date = [
  {
    key: 0,
    value: "no",
  },
  {
    key: 1,
    value: "daily",
  },
  {
    key: 2,
    value: "weekly",
  },
  {
    key: 3,
    value: "monthly",
  },
  {
    key: 4,
    value: "yearly",
  },
];

export const convertDateUTC = (momentValues, timeStart) => {
  const valueDefault = momentValues
    .utc()
    .format(`YYYY-MM-DD ${timeStart ? "00:00:00" : "23:59:59"}`);

  return moment(valueDefault, "YYYY-MM-DD HH:mm:ss").utc().format();
};



// function will delete the last item in a page and change to previous page 
export const deleteLastItemInPage = (paginationParam: PaginationInfo) => {
  let pagination = paginationParam;
  if (
    pagination.total > pagination.pageSize &&
    pagination.total % pagination.pageSize == 1
  ) {
    pagination = {
      current: pagination.current - 1,
      total: pagination.total,
      pageSize: pagination.pageSize,
    };
  }
  return pagination;
};