import { useRecoilState } from "recoil";
import { GroupPaginationStore } from "src/core/store/groupPaginationStore";
import GroupInteractor from "@useCases/group";
import { deleteLastItemInPage } from "@helper/functions";

export const useGroup = () => {
  const [paginationGroup, setPaginationGroup] = useRecoilState(
    GroupPaginationStore
  );
  const {
    getListGroup,
    addGroup,
    editGroup,
    deleteGroup,
    importEmployee,
  } = new GroupInteractor();
  const getList = async (pagination = paginationGroup.info, search=paginationGroup.options.search) => {
    return await getListGroup(pagination, search).then((res) => {
      setPaginationGroup(res)
    });
  };
  const add = async (data) => {
    return await addGroup(data).then(async (res) => {
      return await getList();
    });
  };
  const edit = async (data) => {
    return await editGroup(data).then(async (res) => {
      return await getList();
    });
  };
  const del = async (data, pag) => {
    return await deleteGroup(data).then(async (res) => {
      let pagination = deleteLastItemInPage(pag);
      return await getList(pagination);
    });
  };

  return {
    getList,
    add,
    edit,
    del,
    importEmployee,
  };
};
