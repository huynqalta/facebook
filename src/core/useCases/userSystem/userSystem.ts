import UserSystemService from "@api/userSystem/userSystem";
import UserSystem from "@entities/userSystem";
import PaginationInfo from "@entities/userSystem/paginationinfo"
class UserSystemInterrator {
    getlistUsetSystem: (requet) => any;
    addUser: (value: UserSystem) => any;
    editUser: (value: UserSystem, userCMSId: UserSystem) => any;
    deleteUser: (userCMSId: UserSystem) => any;

    constructor() {
        const service = new UserSystemService();
        this.getlistUsetSystem = async (requet) => {
            return await service.getListUser(requet).then((res) => {
                const data = res?.data?.data?.data;
                const info = res?.data?.data?.info;
                return {
                    data: new UserSystem({}).createListUser(data),
                    info: new PaginationInfo({
                        limit: info.limit,
                        page: info.page,
                        totalRecord: info.totalRecord,
                    })
                }
            })
        }
        this.addUser = async (value) => {
            return await service.addUser(value).then((res) => {
            })
        }
        this.editUser = async (value, userCMSId) => {
            return await service.editUser(value, userCMSId).then(() => {

            })
        }
        this.deleteUser = async (userCMSId) => {
            return await service.deleteUser(userCMSId).then((res) => {
            })
        }
    }

}
export default UserSystemInterrator