import UserSystem from "@entities/userSystem";
import { ServiceCMS } from "../../apiService";

export default class UserSystemService {
  getListUser: (request) => Promise<any>;
  addUser: (value: UserSystem) => any;
  editUser: (value: UserSystem, userCMSId: UserSystem) => any;
  deleteUser: (userCMSId: UserSystem) => any;
  constructor() {
    this.getListUser = async (requets) => {
      const path = `api/UserCms/showTable`;
      return await ServiceCMS.executeApi({
        path,
        payload: {
          ...requets,
        },
        showError: false,
        showSuccess: false,
        method: "post",
      });
    };
    this.addUser = async (value) => {
      const path = `/api/UserCms/addUserCms`;
      return await ServiceCMS.executeApi({
        path,
        payload: value,
        method: "post"
      })
    }
    this.editUser = async (vaule, userCMSId) => {
      const path = `/api/UserCms/update/${ userCMSId }`;
      return await ServiceCMS.executeApi({
        path,
        payload: vaule,
        method: "put"
      })
    }
    this.deleteUser = async (userCMSId) => {
      const path = `api/UserCms/delete/${ userCMSId }`;
      return await ServiceCMS.executeApi({
        path,
        method: "delete"
      })
    }
  }
}
