import apiService from "../../apiService";

export default class GroupService {
  getListGroup: () => Promise<any>;
  constructor() {
    this.getListGroup = async () => {
      const path = `/api/Group`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false,
      });
    };
  }
}
