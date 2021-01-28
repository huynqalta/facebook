class GroupEntities {
  groupId: string = "";
  groupName: string = "";
  groupCode: string = "";

  constructor(group?) {
    if (group) {
      Object.keys(this).forEach((keyItem) => {
        if (group[keyItem]) {
          this[keyItem] = group[keyItem];
        }
      });
    }
  }
  createListGroup(listGroup) {
    if (!Array.isArray(listGroup)) return [];

    return listGroup.map((group: GroupEntities) => {
      return new GroupEntities(group);
    });
  }
}
export default GroupEntities;
