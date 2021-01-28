import { debounce } from "@helper/functions";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import React from "react";
import { useRecoilState } from "recoil";
import { TagPagination } from "src/core/store/tag";

const Search = ({ getList, pagination }) => {
  const [data, setData] = useRecoilState<TagPagination>(pagination);

  const handleSearch = debounce(function (e) {
    getList.execute({ ...data.info, current: 1 }, e).then(() => {
      setData((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          current: 1,
        },
        option: {
          search: e,
        },
      }));
    });
  }, 500);
  return <SearchComponent onChange={handleSearch} classNames="w-1/4" />;
};

export default Search;
