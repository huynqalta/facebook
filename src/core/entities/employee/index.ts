import ChangeableType from "@entities/changeableType";
import TagEntities from "@entities/tag/tag";

class EmployeeEntities extends ChangeableType {
  userId: string = "";
  userAddress: string = "";
  userCodeActive: string = "";
  userEmail: string = "";
  userFirstName: string = "";
  userLastName: string = "";
  userPhone: string = "";
  userStatus: "Active" | "Block" = "Active";
  userGender: "Male" | "Female" = "Male";
  userImage: string | null = null;
  groupId: string = "";
  modeId: string = "";
  userTagIdsParse: Array<string> = [];
  userTags: Array<TagEntities> = [];
  faceId: string = "";
  cardId: string = "";
  group: Object;
  userImages: Array<string>;
  fingerprintId: string = "";
  TagIdsParse: Array<string> = [];
  userObjectImages: Array<Object>;

  constructor(key?) {
    super();
    if (key) {
      Object.keys(this).forEach((keyItem) => {
        if (key[keyItem]) {
          this[keyItem] = key[keyItem];
        }
        this.TagIdsParse = key[keyItem] || this.userTags.map((x) => x.tagId);
      });
    }
    super.setConvertableKey({
      userGender: {
        Male: 0,
        Female: 1,
      },
      userStatus: {
        Active: 1,
        Block: 0,
      },
    });
    super.setInstance(this.getProperties());
  }

  getProperties() {
    return {
      userId: this.userId,
      userAddress: this.userAddress,
      userCodeActive: this.userCodeActive,
      userEmail: this.userEmail,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userPhone: this.userPhone,
      userStatus: this.userStatus,
      userGender: this.userGender,
      userImages: this.userImages,
      group: this.group,
      groupId: this.groupId,
      faceId: this.faceId,
      cardId: this.cardId,
      fingerprintId: this.fingerprintId,
      userTags: this.userTags,
      TagIdsParse: this.TagIdsParse,
      userImage: this.userImage,
      userObjectImages: this.userObjectImages,
      userTagIdsParse: this.userTagIdsParse,
    };
  }

  setProperties() {}

  createListEmployee(listEmployee) {
    if (!Array.isArray(listEmployee)) return [];

    return listEmployee.map((employee) => {
      return new EmployeeEntities(employee).toEntities();
    });
  }
}
export default EmployeeEntities;
