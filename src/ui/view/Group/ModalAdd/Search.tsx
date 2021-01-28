import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { useAsync } from "@hook/useAsync";
import React from "react";
import { useRecoilState } from "recoil";
import { GroupPaginationStore } from "src/core/store/groupPaginationStore";
import {useGroup} from './../viewModel'

const Search = () => {
  const { getList } = useGroup();
  const [getListGroup] = useAsync(getList);
  const [data, setData] = useRecoilState(GroupPaginationStore);

  const handleSearch = (e) => {
    getListGroup.execute(data.info, e).then(() => {
      setData((prev) => ({
        ...prev,
        option: {
          search: e,
        },
      }));
    });
  };
  return <SearchComponent onChange={handleSearch} classNames="w-1/4" />;
};

export default Search;
