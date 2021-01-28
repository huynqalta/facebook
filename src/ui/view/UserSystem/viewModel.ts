import { getListUsers } from "@components/commons/TableComponent/services"
import UserSystemInterrator from "@useCases/userSystem/userSystem"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { UserSystemPaginationStore } from "src/core/store/userSystem/userSystem"
interface IEditUser {
    edit: boolean;
    data?: any;
    type: "edit" | "add" | "";
}

const useUserSystem = () => {
    const setPaginationUserSystem = useSetRecoilState(UserSystemPaginationStore)
    const { getlistUsetSystem, addUser, editUser, deleteUser } = new UserSystemInterrator();
    const [ showEditUser, setShowEditUser ] = useState<IEditUser>({
        edit: false,
        data: {},
        type: "",
    })
    const getList = async (value) => {
        let requet = {
            limit: value.limit,
            page: value.page,
            sortField: value?.sortField,
            sortOrder: value?.sortOrder,
            search: value?.search,
        };
        return await getlistUsetSystem(requet).then((res) => {
            setPaginationUserSystem(res)
        })
    }
    const add = async (value, info) => {
        return await addUser(value).then(async res => {
            return await getList(info);
        })
    }
    const edit = async (value, userCMSId, info) => {
        return await editUser(value, userCMSId).then(async res => {
            return await getList(info);
        })
    }
    const remove = async (userCMSId, info) => {
        let infonew = info;
        if (info.totalRecord > info.limit && info.totalRecord % info.limit == 1) {
            infonew = {
                limit: info.limit,
                page: info.page - 1,
                totalRecord: info.totalRecord
            }
        }
        return await deleteUser(userCMSId).then(async res => {
            return await getList(infonew);
        })
    }
    return {
        getList, add, edit, remove, showEditUser, setShowEditUser
    }
}
export default useUserSystem