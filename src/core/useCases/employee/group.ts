import GroupService from "@api/employee/group";
import GroupEntities from "@entities/employee/group";

class GroupInteractor extends GroupService {
  getListGroupInteractor: () => any;

  constructor() {
    super();
    this.getListGroupInteractor = async () => {
      return await this.getListGroup().then((res) => {
        return new GroupEntities().createListGroup(res?.data?.data?.pagedData);
      });
    };
  }
}

export default GroupInteractor;
