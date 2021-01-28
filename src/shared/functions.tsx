import { Route, Switch } from "react-router";
import React, { useContext, useEffect } from "react";
// import { GlobalContext } from "./GlobalContext/GlobalContext";

export const ShowRouter = (
  routers: Array<object>,
  _key?: string
): JSX.Element => {
  const result = routers.map((routers: any, index: number) => {
    const { path, exact, main } = routers;
    return (
      <Route
        key={Math.random() + "_" + index}
        path={path}
        exact={exact}
        component={main}
      />
    );
  });
  return <Switch>{result}</Switch>;
};

export const validURL = (str) => {
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

export const ReadSizeFilesUpload = (files: Array<File>, sizeType) => {
  let size: number = 0;
  files.forEach((item, index) => {
    size += item.size; //GB
  });
  switch (sizeType) {
    case "B": {
      return size;
    }
    case "KB": {
      return size / 1024;
    }
    case "MB": {
      return size / 1024 / 1024;
    }
    case "GB": {
      return size / 1024 / 1024 / 1024;
    }
    default: {
      return size;
    }
  }
  return size;
};

export const debounce = (func, wait) => {
  var timeout;

  return function (value?) {
    var context = this,
      args = arguments;
    var executeFunction = function () {
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
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

export const isValueIncludesArrObject = (arr, key, value) => {
  let isInclude = false;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][key].includes(value)) {
      isInclude = true;
      break;
    }
  }
  return isInclude;
};

export interface IKey {
  VNM: string;
  USA: string;
}

export const Translate = (key: IKey) => {
  const currentLang = "USA";
  if (key) {
    return key[currentLang];
  }
  return "";
};

// export const useTranslate = (objKey) => {
//   // truyền vô file JSON
//   const { currentLang } = useContext(GlobalContext);
//   return Object.keys(objKey).map((key) => {
//     return objKey[ key ][ currentLang ];
//   });
// };

export const useTranslate = (objKey) => {
  const currentLang = "USA";
  const obj: any = {};
  Object.keys(objKey).forEach((key) => {
    obj[key] = objKey[key][currentLang];
  });
  return obj;
};

export const useLog = (state, text = "") => {
  useEffect(() => {}, [state]);
};

export const correctEmail = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const correctLink = (str) => {
  const pattern = new RegExp(
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
